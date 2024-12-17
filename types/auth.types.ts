export type CustomerType = "" | "user" | "company";

export interface Customer {
  _id: string;
  firstName?: string;
  lastName?: string;
  erxesCustomerId?: string;
  phone?: string;
  email?: string;
  password?: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
}

export interface IConfig {
  name: string;
  erxesAppToken: string;
  paymentIds: string[];
  checkRemainder: boolean;
  deliveryConfig: {
    productId?: string;
  };
  uiOptions?: {
    logo: string;
    colors: {
      primary?: string;
      secondary?: string;
      third?: string;
    };
  };
}
