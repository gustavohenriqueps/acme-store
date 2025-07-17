"use client";

// React Imports
import { useFormContext } from "react-hook-form";

// Next-Intl Imports
import { useTranslations } from "next-intl";

// UI Library Imports (Shadcn UI)
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Type Imports
import { FormValues } from "@/app/[locale]/checkout/page";

import { COUNTRIES_OPTIONS } from "@/lib/constants";

const ShippingInformationForm = () => {
  const t = useTranslations("checkoutForm");

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-lg lg:text-2xl font-semibold">
        {t("shippingInformation.title")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="firstName">
            {t("shippingInformation.firstName")}
          </Label>
          <Input
            id="firstName"
            {...register("firstName", {
              required: t("validation.required"),
            })}
            type="text"
            autoComplete="given-name"
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm">{errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="lastName">{t("shippingInformation.lastName")}</Label>
          <Input
            id="lastName"
            {...register("lastName", { required: t("validation.required") })}
            type="text"
            autoComplete="family-name"
          />
          {errors.lastName && (
            <p className="text-red-600 text-sm">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="address">{t("shippingInformation.address")}</Label>
        <Input
          id="address"
          {...register("address", { required: t("validation.required") })}
          type="text"
          autoComplete="street-address"
        />
        {errors.address && (
          <p className="text-red-600 text-sm">{errors.address.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="complement">
          {t("shippingInformation.addressComplement")}
        </Label>
        <Input
          id="complement"
          {...register("complement")}
          type="text"
          autoComplete="address-line2"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-1">
          <Label htmlFor="city">{t("shippingInformation.city")}</Label>
          <Input
            id="city"
            {...register("city", { required: t("validation.required") })}
            type="text"
            autoComplete="address-level2"
          />
          {errors.city && (
            <p className="text-red-600 text-sm">{errors.city.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="country">{t("shippingInformation.country")}</Label>
          <Select
            onValueChange={(value) => {
              setValue("country", value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            value={watch("country")}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder={t("shippingInformation.country")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {COUNTRIES_OPTIONS.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {t(country.labelKey)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="text-red-600 text-sm">
              {errors.country.message || t("validation.required")}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="state">{t("shippingInformation.state")}</Label>
          <Input
            id="state"
            {...register("state", { required: t("validation.required") })}
            type="text"
            autoComplete="address-level1"
          />
          {errors.state && (
            <p className="text-red-600 text-sm">{errors.state.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="postalCode">
            {t("shippingInformation.postalCode")}
          </Label>
          <Input
            id="postalCode"
            {...register("postalCode", {
              required: t("validation.required"),
              minLength: {
                value: 4,
                message: t("validation.minLength", { count: 4 }),
              },
            })}
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
          />
          {errors.postalCode && (
            <p className="text-red-600 text-sm">{errors.postalCode.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="phone">{t("shippingInformation.phone")}</Label>
        <Input
          id="phone"
          {...register("phone", { required: t("validation.required") })}
          type="tel"
          autoComplete="tel"
        />
        {errors.phone && (
          <p className="text-red-600 text-sm">{errors.phone.message}</p>
        )}
      </div>
    </div>
  );
};

export default ShippingInformationForm;
