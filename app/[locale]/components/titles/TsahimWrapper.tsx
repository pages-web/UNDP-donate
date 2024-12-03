import React, { useEffect } from "react";
import Tsahim from "./Tsahim";
import { useProducts } from "../../../../sdk/queries/products.client";

const TsahimWrapper = () => {
  const { getProducts, products } = useProducts();
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div>
      <Tsahim products={products} />
    </div>
  );
};

export default TsahimWrapper;
