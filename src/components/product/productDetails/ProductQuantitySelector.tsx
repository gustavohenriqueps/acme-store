// Next-Intl
import { useTranslations } from "next-intl";

// Shadcn UI
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProductQuantitySelectorProps = {
  quantitySelected: number;
  setQuantitySelected: (qty: number) => void;
  quantityOptions: number[];
};

const ProductQuantitySelector = ({
  quantitySelected,
  setQuantitySelected,
  quantityOptions,
}: ProductQuantitySelectorProps) => {
  const t = useTranslations("productDetails");

  return (
    <div className="space-y-5 ">
      <h4 className="font-medium">{t("quantityLabel")}</h4>
      <Select
        value={quantitySelected.toString()}
        onValueChange={(value) => setQuantitySelected(Number(value))}
      >
        <SelectTrigger className="w-24 border-black">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {quantityOptions.map((qty) => (
              <SelectItem key={qty} value={qty.toString()}>
                {qty}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductQuantitySelector;
