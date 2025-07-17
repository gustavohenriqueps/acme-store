"use client";

// React
import { useState } from "react";

// Next.js & Next-Intl
import Image from "next/image";
import { Link } from "@/i18n/navigation";

// Componentes
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Hooks
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

// Zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Icones
import { Loader2 } from "lucide-react";

const signUpSchema = z.object({
  username: z.string().min(1, "errors.nameRequired"),
  email: z.string().email("errors.emailRequired").min(1, "errors.emailInvalid"),
  password: z.string().min(6, "errors.passwordMinLength"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const { signup, user } = useAuth();
  const router = useRouter();
  const t = useTranslations("signUp");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const success = await signup(data);
      if (success) {
        router.push("/");
        reset();
      } else {
        alert("Erro ao realizar cadastro. Verifique os dados.");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Ocorreu um erro inesperado ao tentar se cadastrar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container mx-auto lg:px-[8%] min-h-[calc(100vh-128px)] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:mt-6">
      <div className="flex flex-col place-self-center gap-y-6 mx-auto w-full min-w-2xs max-w-sm p-8 lg:p-4 ">
        <h2 className="text-2xl  tracking-tight font-bold">{t("title")}</h2>
        <p className="text-zinc-500 text-sm font-medium tracking-tight">
          {t("alreadyHaveAccount")}{" "}
          <Link href="/auth/sign-in" className="text-indigo-600 font-semibold">
            {t("signInNow")}
          </Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="space-y-4">
            <Label htmlFor="username">{t("name")}</Label>
            <Input
              type="text"
              id="username"
              {...register("username")}
              className={`focus-visible:border-indigo-600 focus-visible:ring-indigo-600 focus-visible:ring-[1px] bg-white ${
                errors.username ? "border-red-500" : ""
              }`}
            />

            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {t(errors.username.message ?? "")}
              </p>
            )}
          </div>
          <div className="space-y-4">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              type="email"
              id="email"
              {...register("email")}
              className={`focus-visible:border-indigo-600 focus-visible:ring-indigo-600 focus-visible:ring-[1px] bg-white ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {t(errors.email.message ?? "")}
              </p>
            )}
          </div>
          <div className="space-y-4">
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              type="password"
              id="password"
              {...register("password")}
              className={`focus-visible:border-indigo-600 focus-visible:ring-indigo-600 focus-visible:ring-[1px] bg-white ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {t(errors.password.message ?? "")}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">{t("rememberMe")}</Label>
            </div>
          </div>

          <Button type="submit" disabled={isLoading || user !== null}>
            {isLoading ? (
              <Loader2 className="animate-spin size-5 " />
            ) : (
              t("signUpButton")
            )}
          </Button>
        </form>

        <div className="flex items-center gap-4 text-sm">
          <span className="block h-px w-full bg-zinc-300"></span>
          <p className="text-nowrap font-medium">{t("orContinueWith")}</p>
          <span className="block h-px w-full bg-zinc-300"></span>
        </div>

        <div className="flex gap-4 items-center">
          <Button className="flex-1" variant={"outline"}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                fill="#EA4335"
              ></path>
              <path
                d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                fill="#4285F4"
              ></path>
              <path
                d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                fill="#FBBC05"
              ></path>
              <path
                d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                fill="#34A853"
              ></path>
            </svg>
            Google
          </Button>
          <Button className="flex-1" variant={"outline"}>
            <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
            GitHub
          </Button>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <Image
          src="/pexels-musa-yilmaz-2148837900-30304811.jpg"
          alt="Pessoa escrevendo em caderno"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top rounded"
          priority
        />
      </div>
    </section>
  );
};

export default SignUp;
