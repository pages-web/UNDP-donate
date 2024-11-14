"use client";
import { IProduct } from "@/types/product.types";
import { CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useAtom } from "jotai";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { LoadingIcon } from "../ui/loading";
import { donateItemAtom } from "@/store/donate.store";
import { useDonate, ValidateProduct } from "@/containers/donate/donate";
import { useTranslations } from "next-intl";

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

  const [item, setItem] = useAtom(donateItemAtom);

  const radioValue =
    item?.productId !== unitProduct?._id ? item?.productId || "" : "";

  const radioValueChange = (value: string) => {
    const { _id, unitPrice } =
      products.find((product) => product._id === value) || ({} as IProduct);

    setItem({
      _id: Math.random().toString(),
      productId: _id,
      count: 1,
      unitPrice,
    });
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
  };

  const handleSubmit = () => validateProduct(action);

  return (
    <>
      <CardContent className="md:py-0">
        <RadioGroup
          defaultValue="comfortable"
          className="grid grid-cols-2"
          onValueChange={radioValueChange}
          value={radioValue}
        >
          {(products || [])
            .filter((product) => product.unitPrice !== 1)
            .sort((a, b) => a.unitPrice - b.unitPrice)
            .map((product) => (
              <div className="relative" key={product._id}>
                <Label
                  className="flex items-center gap-2 border p-4 rounded-md text-black"
                  key={product._id}
                  htmlFor={product._id}
                >
                  <RadioGroupItem
                    value={product._id}
                    id={product._id}
                    className="peer"
                  />
                  <span className="font-bold text-base">
                    {product.unitPrice.toLocaleString()}₮
                  </span>
                  {radioValue === product._id && (
                    <span className="block absolute inset-0 rounded-md border-2 border-primary" />
                  )}
                </Label>
              </div>
            ))}
        </RadioGroup>
        {!!unitProduct && (
          <div className="mt-6">
            <Label className="pb-2 block">Өөр дүн</Label>
            <Input
              type="number"
              value={unitProduct._id === item?.productId ? item.count : ""}
              className="font-bold text-black"
              placeholder="Өөр дүн ₮"
              min={1}
              onChange={(e) => handleCustomValueChange(e.target.value)}
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          size="lg"
          className="w-full text-white"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading && <LoadingIcon />} Хандив өгөх
        </Button>
      </CardFooter>
    </>
  );
};

export default ChooseProducts;
