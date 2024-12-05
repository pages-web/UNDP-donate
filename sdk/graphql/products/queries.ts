import { gql } from "@apollo/client";

const commonFields = `
  _id
  name
  code

`;

const productCategories = gql`
  query poscProductCategories ($parentId: String, $searchValue: String, $excludeEmpty: Boolean, $meta: String, $page: Int, $perPage: Int, $sortField: String, $sortDirection: Int) {
    poscProductCategories(parentId: $parentId, searchValue: $searchValue, excludeEmpty: $excludeEmpty, meta: $meta, page: $page, perPage: $perPage, sortField: $sortField, sortDirection: $sortDirection) {
      ${commonFields}
      order
      parentId
      attachment {
        url
      }
    }
  }
`;

const products = gql`
  query poscProducts(
    $searchValue: String,
    $type: String, 
    $categoryId: String, 
    $page: Int, 
    $perPage: Int, 
    $isKiosk: Boolean, 
    $groupedSimilarity: String
    $sortField: String
    $sortDirection: Int
    ) {
    poscProducts(
      searchValue: $searchValue, 
      categoryId: $categoryId, 
      type: $type, 
      page: $page, 
      perPage: $perPage, 
      isKiosk: $isKiosk, 
      groupedSimilarity: $groupedSimilarity
      sortField: $sortField
      sortDirection: $sortDirection
    )  {
      ${commonFields}
      category {
        name
        _id
      }
      unitPrice
      type
      description
      remainder
      hasSimilarity
      attachment {
        url
      }
    }
  }
`;

const productsMeta = gql`
  query poscProducts($perPage: Int) {
    poscProducts(perPage: $perPage, isKiosk: true) {
      _id
      modifiedAt
    }
  }
`;

const productSimilarities = gql`
  query PoscProductSimilarities($id: String!, $groupedSimilarity: String) {
    poscProductSimilarities(_id: $id, groupedSimilarity: $groupedSimilarity) {
      products {
        _id
        description
        unitPrice
        name
        attachment {
          url
        }
        customFieldsData
      }
      groups {
        fieldId
        title
      }
    }
  }
`;

const productsCount = gql`
  query productsCount(
    $categoryId: String
    $type: String
    $searchValue: String
    $groupedSimilarity: String
    $isKiosk: Boolean
  ) {
    poscProductsTotalCount(
      categoryId: $categoryId
      type: $type
      searchValue: $searchValue
      groupedSimilarity: $groupedSimilarity
      isKiosk: $isKiosk
    )
  }
`;

const getPriceInfo = gql`
  query getPriceInfo($productId: String!) {
    getPriceInfo(productId: $productId)
  }
`;

const getInitialCategory = gql`
  query InitialCategory($_id: String) {
    poscProductCategoryDetail(_id: $_id) {
      _id
      name
    }
  }
`;

const getKioskCategory = gql`
  query InitialCategory($_id: String) {
    poscProductCategoryDetail(_id: $_id) {
      _id
      name
      attachment {
        url
      }
    }
  }
`;

const productDetail = gql`
  query ProductDetail($_id: String) {
    poscProductDetail(_id: $_id) {
      _id
      name
      description
      code
      type
      createdAt
      unitPrice
      category {
        order
        name
        _id
      }
      attachment {
        url
      }
      attachmentMore {
        url
      }
    }
  }
`;

const productReview = gql`
  query Productreview($productId: String!) {
    productreview(productId: $productId) {
      average
      length
      productId
    }
  }
`;
export const GET_INTEGRATIONS = `
query Integrations($brandId: String, $kind: String, $perPage: Int, $page: Int) {
  integrations(brandId: $brandId, kind: $kind, perPage: $perPage, page: $page) {
    _id
    form {
      code
    }
    formId
    brand {
      code
    }
  }
}
`;

export const GET_FORM_DETAIL = `
query FormDetail($id: String!) {
  formDetail(_id: $id) {
    _id
    description
    type
    title
    fields {
      field
      _id
      code
      text
      type
    }
  }
}
`;

const queries = {
  productCategories,
  products,
  productsCount,
  productSimilarities,
  productDetail,
  productsMeta,
  productReview,
};
export default queries;
