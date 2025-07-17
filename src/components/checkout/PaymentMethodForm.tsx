"use client";

// React
import { useFormContext } from "react-hook-form";

// Componentes
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Next-Intl
import { useTranslations } from "next-intl";

// Tipos
import { FormValues } from "@/app/[locale]/checkout/page";

const PaymentMethodForm = () => {
  const t = useTranslations("checkoutForm");

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>();

  // Regex simples para formato MM/YY
  const expirationDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;

  return (
    <div className="space-y-8">
      <h2 className="text-lg lg:text-2xl font-semibold">
        {t("payment.title")}
      </h2>

      <RadioGroup
        value={watch("paymentMethod")}
        onValueChange={(value: "creditCard") =>
          setValue("paymentMethod", value)
        }
        className="sm:flex gap-6 text-zinc-700"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="creditCard" id="r1" />
          <Label htmlFor="r1">{t("payment.creditCard.title")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem disabled value="PayPal" id="r2" />
          <Label htmlFor="r2">PayPal</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem disabled value="eTransfer" id="r3" />
          <Label htmlFor="r3">eTransfer</Label>
        </div>
      </RadioGroup>

      {watch("paymentMethod") === "creditCard" && (
        <div className="flex flex-col gap-8">
          <div className="space-y-1">
            <Label htmlFor="cardNumber">
              {t("payment.creditCard.cardNumber")}
            </Label>
            <Input
              id="cardNumber"
              {...register("cardNumber", {
                required: t("validation.required"),
                minLength: {
                  value: 13,
                  message: t("validation.minLength", { count: 13 }),
                },
                maxLength: {
                  value: 19,
                  message: t("validation.maxLength", { count: 19 }),
                },

                pattern: {
                  value: /^\d+$/,
                  message: t("validation.onlyDigits"),
                },
              })}
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
            />
            {errors.cardNumber && (
              <p className="text-red-600 text-sm">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="nameOnCard">
              {t("payment.creditCard.nameOnCard")}
            </Label>
            <Input
              id="nameOnCard"
              {...register("nameOnCard", {
                required: t("validation.required"),
              })}
              type="text"
              autoComplete="cc-name"
            />
            {errors.nameOnCard && (
              <p className="text-red-600 text-sm">
                {errors.nameOnCard.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-1 col-span-3">
              <Label htmlFor="expirationDate">
                {t("payment.creditCard.expirationDate")}
              </Label>
              <Input
                id="expirationDate"
                {...register("expirationDate", {
                  required: t("validation.required"),
                  pattern: {
                    value: expirationDateRegex,
                    message: t("validation.invalidExpirationDateFormat"),
                  },
                  validate: (value) => {
                    if (!value || !expirationDateRegex.test(value))
                      return t("validation.invalidExpirationDateFormat");

                    const [monthStr, yearStr] = value.split("/");
                    const month = parseInt(monthStr, 10);
                    const year = 2000 + parseInt(yearStr, 10); // Assume ano 20xx

                    const today = new Date();
                    const currentMonth = today.getMonth() + 1; // Mês é 0-indexado (Janeiro = 0)
                    const currentYear = today.getFullYear();

                    if (
                      year < currentYear ||
                      (year === currentYear && month < currentMonth)
                    ) {
                      return t("validation.expirationDateInPast");
                    }
                    return true;
                  },
                })}
                type="text"
                placeholder="MM/YY"
                autoComplete="cc-exp"
              />
              {errors.expirationDate && (
                <p className="text-red-600 text-sm">
                  {errors.expirationDate.message}
                </p>
              )}
            </div>

            <div className="space-y-1 col-span-1">
              <Label htmlFor="cvc">{t("payment.creditCard.cvc")}</Label>
              <Input
                id="cvc"
                {...register("cvc", {
                  required: t("validation.required"),
                  minLength: {
                    value: 3,
                    message: t("validation.invalidCvc"),
                  },
                  maxLength: {
                    value: 4,
                    message: t("validation.invalidCvc"),
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: t("validation.onlyDigits"),
                  },
                })}
                type="text"
                inputMode="numeric"
                autoComplete="cc-csc"
              />
              {errors.cvc && (
                <p className="text-red-600 text-sm">{errors.cvc.message}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodForm;
