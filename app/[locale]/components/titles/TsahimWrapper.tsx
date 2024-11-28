import React, { useEffect } from "react";
import Tsahim from "./Tsahim";
import { getProducts } from "../../../../sdk/queries/products";
import { useProducts } from "../../../../sdk/queries/products.client";

const TsahimWrapper = () => {
  const { getProducts, products } = useProducts();
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  console.log(products);
  return (
    <div>
      <Tsahim products={products} />
    </div>
  );
};

export default TsahimWrapper;
