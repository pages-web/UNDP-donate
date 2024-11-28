import { getClient } from "../../sdk/ssClient";
import { queries } from "../graphql/products";
import { IProduct } from "../../types/product.types";
import {
  GetCategories,
  IProductDetail,
  IGetParent,
  ICategory,
} from "../../types/products.types";
import type { LinkProps } from "next/link";
import { cache } from "react";
import { CommonParams } from "../../types";

export const getCategories: GetCategories = cache(async (params) => {
  const { data, error } = await getClient().query({
    query: queries.productCategories,
    variables: params?.variables,
  });
  const { poscProductCategories: categories } = data || {};

  const getParent: IGetParent = (parentId: string) =>
    categories.find((c: ICategory) => c._id === parentId);

  const primaryCategories = (categories || []).filter(
    (category: ICategory) => !getParent(category.parentId)
  );
  return {
    categories:
      primaryCategories.length === 1
        ? categories.filter(
            (cat: ICategory) => cat._id !== primaryCategories[0]._id
          )
        : categories,
    error_msg: error?.message,
    primaryCategories:
      primaryCategories.length === 1
        ? categories.filter(
            (cat: ICategory) => cat.parentId === primaryCategories[0]._id
          )
        : primaryCategories,
    getParent,
  };
});

type GetProducts = (params?: CommonParams) => Promise<{
  products: IProduct[];
  count: number;
  error_msg: string | undefined;
}>;

type GetProductsMeta = (params?: CommonParams) => Promise<{
  products: { _id: string; modifiedAt: string }[];
  error_msg: string | undefined;
}>;

export const getProducts: GetProducts = cache(async (params) => {
  const { perPage, page, sortField, sortDirection, ...variables } =
    params?.variables || {};
  const { data, error } = await getClient().query({
    query: queries.products,
    variables: params?.variables,
  });
  const count = await getClient().query({
    query: queries.productsCount,
    variables: variables,
  });
  const { poscProducts: products } = data || {};
  return {
    products,
    count: count?.data?.poscProductsTotalCount,
    error_msg: error?.message,
  };
});

export const getProductsMeta: GetProductsMeta = async (params) => {
  const { data, error } = await getClient().query({
    query: queries.productsMeta,
    variables: params?.variables,
  });

  const { poscProducts: products } = data || {};

  return { products, error_msg: error?.message };
};

type GetProductDetail = (params?: CommonParams) => Promise<{
  product: IProductDetail;
  error_msg: string | undefined;
}>;

export const getProductDetail: GetProductDetail = cache(async (params) => {
  const { data, error } = await getClient().query({
    query: queries.productDetail,
    variables: params?.variables,
  });
  const { poscProductDetail: product } = data || {};
  return { product, error_msg: error?.message };
});

type GetProductReview = (params?: CommonParams) => Promise<{
  review: { average: number; length: number; productId: string };
  error_msg: string | undefined;
}>;

export const getProductReview: GetProductReview = cache(async (params) => {
  const { data, error } = await getClient().query({
    query: queries.productReview,
    variables: params?.variables,
  });
  const { productreview: review } = data || {};
  return { review, error_msg: error?.message };
});
