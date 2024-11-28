"use client";
import { IProduct } from "@/types/product.types";
import { CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { useAtom } from "jotai";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { LoadingIcon } from "../ui/loading";
import { donateItemAtom, selectedPriceAtom } from "@/store/donate.store";
import { useDonate, ValidateProduct } from "@/containers/donate/donate";
import { useTranslations } from "next-intl";
import ModalIcon from "../svg/modal/ModalIcon";

const ChooseProducts = ({
  products,
  unitProduct,
  validateProduct,
}: {
  products: IProduct[];
  unitProduct?: IProduct;
  validateProduct: ValidateProduct;
}) => {
  const { loading, action } = useDonate();
  const t = useTranslations();
  const [item, setItem] = useAtom(donateItemAtom);
  const [, setSelectedPrice] = useAtom(selectedPriceAtom);

  const radioValue =
    item?.productId !== unitProduct?._id ? item?.productId || "" : "";

  const handleProductClick = (value: string) => {
    const { _id, unitPrice } =
      products.find((product) => product._id === value) || ({} as IProduct);

    setItem({
      _id: Math.random().toString(),
      productId: _id,
      count: 1,
      unitPrice,
    });

    setSelectedPrice(unitPrice.toLocaleString() + "₮");
  };

  const handleCustomValueChange = (value: string) => {
    if (Number(value) < 0) return null;
    !!unitProduct &&
      setItem({
        _id: Math.random().toString(),
        productId: unitProduct._id,
        count: Number(value),
        unitPrice: 1,
      });

    setSelectedPrice(value + "₮");
  };

  const handleSubmit = () => validateProduct(action);

  return (
    <>
      <CardContent className="md:py-0">
        <div className="flex flex-col items-center">
          <div className="flex items-center content-center gap-[12px] flex-wrap">
            {(products || [])
              .filter((product) => product.unitPrice !== 1)
              .sort((a, b) => a.unitPrice - b.unitPrice)
              .map((product) => (
                <div
                  className={`relative border border-[#959595] py-3 px-5 rounded-[100px] flex items-center justify-center gap-1 cursor-pointer ${
                    radioValue === product._id
                      ? "bg-primary text-white border-primary"
                      : "text-black"
                  }`}
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
                >
                  <ModalIcon />
                  <span className="font-inter text-sm font-medium leading-normal">
                    {product.unitPrice.toLocaleString()}
                  </span>
                </div>
              ))}
          </div>
        </div>
        {!!unitProduct && (
          <div className="mt-6 ">
            <Label className="pb-2 block ">Enter your amount</Label>
            <Input
              type="number"
              value={unitProduct._id === item?.productId ? item.count : ""}
              className="flex py-2 px-3 items-center text-[24px] text-[#6C707E] gap-[10px] self-stretch rounded-[8px] border border-[#EFEFEF]"
              placeholder="0₮"
              min={1}
              onChange={(e) => handleCustomValueChange(e.target.value)}
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          size="lg"
          className="w-full rounded-[100px] text-white"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading && <LoadingIcon />} Continue
        </Button>
      </CardFooter>
    </>
  );
};

export default ChooseProducts;
