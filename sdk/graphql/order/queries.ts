import { gql } from "@apollo/client";

export const orderItemFields = `
    _id
    unitPrice
    orderId
    productName
    count
    productId
    isPackage
    isTake
    status
    productImgUrl
    discountAmount
    discountPercent
    bonusCount
`;

export const currentOrder = gql`
  query CurrentOrder(
    $customerId: String
    $saleStatus: String
    $perPage: Int
    $sortField: String
    $sortDirection: Int
    $statuses: [String]
  ) {
    fullOrders(
      customerId: $customerId
      saleStatus: $saleStatus
      perPage: $perPage
      sortField: $sortField
      sortDirection: $sortDirection
      statuses: $statuses
    ) {
      _id
      deliveryInfo
      description
      paidDate
      billType
      registerNumber
      totalAmount
      mobileAmount
      saleStatus
      items {
        ${orderItemFields}
      }
    }
  }
`;

export const fullOrders = gql`
  query FullOrders(
    $customerId: String
    $statuses: [String]
    $perPage: Int
    $sortField: String
    $sortDirection: Int
  ) {
    fullOrders(
      customerId: $customerId
      statuses: $statuses
      perPage: $perPage
      sortField: $sortField
      sortDirection: $sortDirection
    ) {
      _id
      createdAt
      paidDate
      status
      totalAmount
      number
      items {
        productName
        productImgUrl
      }
    }
  }
`;

const ordersCheckCompany = gql`
  query ordersCheckCompany($registerNumber: String!) {
    ordersCheckCompany(registerNumber: $registerNumber)
  }
`;

export const orderFields = `
  _id
  createdAt
  modifiedAt
  number
  status
  paidDate
  mobileAmount
  totalAmount
  slotCode
  registerNumber
  customerId
  printedEbarimt
  billType
  billId
  origin
  type
  deliveryInfo
  description
`;

const customerFields = `
  _id
  primaryPhone
  firstName
  primaryEmail
  lastName
`;

const putResponseFields = `
  billId
  lottery
  qrData 
  billType
  amount
`;

const orderDetail = gql`
query OrderDetail($id: String, $customerId: String) {
  orderDetail(_id: $id, customerId: $customerId) {
      ${orderFields}

      items {
        ${orderItemFields}
      }

      customer {
        firstName
        lastName
        primaryEmail
        primaryPhone
        code
      }

      user {
        ${customerFields}
      }

      putResponses {
        ${putResponseFields}
      }
    }
  }
`;

const donateOrderDetail = gql`
  query DonateOrderDetail($id: String, $customerId: String) {
    orderDetail(_id: $id, customerId: $customerId) {
      _id
      totalAmount
      mobileAmount
      number
      paidDate
      items {
        _id
        unitPrice
        count
        productId
      }
      description
      deliveryInfo
    }
  }
`;

const invoices = `
  query Invoices($contentType: String, $contentTypeId: String) {
    invoices(contentType: $contentType, contentTypeId: $contentTypeId) {
      _id
      amount
      status
    }
  }
`;

const orderItemDetail = gql`
  query OrderItemDetail($id: String) {
    poscProductDetail(_id: $id) {
      remainder
      category {
        name
      }
    }
  }
`;

const addresses = gql`
  query Addresses {
    clientPortalCurrentUser {
      customer {
        addresses
      }
    }
  }
`;
const CustomerDetail = gql`
  query customerDetail($_id: String!) {
    customerDetail(_id: $_id) {
      _id
      firstName
      middleName
      lastName
      avatar
      sex
      birthDate
      primaryEmail
      emails
      primaryPhone
      phones
      state
      visitorContactInfo
      modifiedAt
      position
      department
      leadStatus
      hasAuthority
      description
      isSubscribed
      code
      emailValidationStatus
      phoneValidationStatus
      score
      isOnline
      lastSeenAt
      sessionCount
      links
      ownerId
      owner {
        _id
        details {
          fullName
          __typename
        }
        __typename
      }
      integrationId
      createdAt
      remoteAddress
      location
      customFieldsData
      trackedData
      tagIds
      getTags {
        _id
        name
        colorCode
        __typename
      }
      urlVisits
      integration {
        kind
        name
        isActive
        __typename
      }
      companies {
        _id
        primaryName
        website
        __typename
      }
      __typename
    }
  }
`;
const ordersGroupSummary = gql`
  query posOrdersGroupSummary(
    $page: Int
    $perPage: Int
    $sortField: String
    $sortDirection: Int
    $search: String
    $paidStartDate: Date
    $paidEndDate: Date
    $createdStartDate: Date
    $createdEndDate: Date
    $paidDate: String
    $userId: String
    $customerId: String
    $customerType: String
    $posId: String
    $types: [String]
    $statuses: [String]
    $excludeStatuses: [String]
    $groupField: String
  ) {
    posOrdersGroupSummary(
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortDirection: $sortDirection
      search: $search
      paidStartDate: $paidStartDate
      paidEndDate: $paidEndDate
      createdStartDate: $createdStartDate
      createdEndDate: $createdEndDate
      paidDate: $paidDate
      userId: $userId
      customerId: $customerId
      customerType: $customerType
      posId: $posId
      types: $types
      statuses: $statuses
      excludeStatuses: $excludeStatuses
      groupField: $groupField
    )
  }
`;

const queries = {
  orderItemDetail,
  currentOrder,
  ordersCheckCompany,
  fullOrders,
  orderDetail,
  invoices,
  addresses,
  donateOrderDetail,
  ordersGroupSummary,
  CustomerDetail,
};

export default queries;
