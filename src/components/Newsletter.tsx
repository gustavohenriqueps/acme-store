import { useTranslations } from "next-intl";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Newsletter = () => {
  const t = useTranslations("newsletter");

  return (
    <div className="max-w-md text-sm space-y-4 py-12">
      <h5 className="font-medium">{t("title")}</h5>
      <p className="text-muted-foreground ">{t("description")}</p>
      <div className="flex flex-col md:flex-row gap-4">
        <Input type="text" placeholder={t("placeholder")} />
        <Button>{t("button")}</Button>
      </div>
    </div>
  );
};
export default Newsletter;
