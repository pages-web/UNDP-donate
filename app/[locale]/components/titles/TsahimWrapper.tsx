import React from "react";
import Tsahim from "./Tsahim";
import { getProducts } from "../../../../sdk/queries/products";

const TsahimWrapper = async () => {
  const { products } = await getProducts();
  return <Tsahim products={products} />;
};

export default TsahimWrapper;
