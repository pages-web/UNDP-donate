import { CommonParams } from "@/types";
import { cache } from "react";
import { IArticle, IKBCategoryDetail } from "@/types/kb.types";
import { getClient } from "../ssClient";
import { queries } from "../graphql/kb";
import { getConfig } from "./auth";

export type GetKbArticleDetail = (params?: CommonParams) => Promise<{
  error_msg: string | undefined;
  article: IArticle;
}>;

export type GetKbArticles = (
  code: string,
  params?: CommonParams
) => Promise<{
  error_msg: string | undefined;
  articles: IArticle[];
}>;

export type GetKbCategoryDetail = (params?: CommonParams) => Promise<{
  error_msg: string | undefined;
  category: IKBCategoryDetail;
}>;

export const getKbArticleDetail: GetKbArticleDetail = cache(async (params) => {
  const { config } = await getConfig();
  const { data, error } = await getClient().query({
    query: queries.articleDetail,
    variables: params?.variables,
    context: {
      headers: {
        "erxes-app-token": config?.erxesAppToken,
      },
    },
  });

  const { knowledgeBaseArticleDetail: article } = data || {};

  return {
    article,
    error_msg: error?.message,
  };
});

export const getKbArticlesByCode: GetKbArticles = cache(
  async (code, params) => {
    const { config } = await getConfig();

    const kbCat = await getClient().query({
      query: queries.kbCategoryId,
      variables: { _id: code },
      context: {
        headers: {
          "erxes-app-token": config?.erxesAppToken,
        },
      },
    });

    const { knowledgeBaseCategoryDetail: category } = kbCat.data || {};

    const { data, error } = await getClient().query({
      query: queries.articles,
      variables: { ...params?.variables, categoryIds: [category?._id] },
      context: {
        headers: {
          "erxes-app-token": config?.erxesAppToken,
        },
      },
    });

    const { knowledgeBaseArticles: articles } = data || {};

    return {
      articles,
      error_msg: error?.message,
    };
  }
);

export const kbCategoryDetail: GetKbCategoryDetail = cache(async (params) => {
  const { config } = await getConfig();
  const { data, error } = await getClient().query({
    query: queries.kbCategory,
    variables: params?.variables,
    context: {
      headers: {
        "erxes-app-token": config?.erxesAppToken,
      },
    },
  });

  const { knowledgeBaseCategoryDetail: category } = data || {};

  return {
    category,
    error_msg: error?.message,
  };
});
