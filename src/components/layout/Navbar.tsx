"use client";

// Next.js & Next-Intl

import { useTranslations } from "next-intl";

// Componentes
import NavbarMobile from "./NavbarMobile";
import { Button } from "../ui/button";
import { ExpandableSearchInput } from "../ExpandableSearchInput";
import LanguageCurrencySwitcher from "../LanguageCurrencySwitcher";

// Hooks locais
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

// Ícones
import { LogOut, ShoppingCart } from "lucide-react";
import { Link } from "@/i18n/navigation";

const NAVBAR_DESKTOP_LINKS = [
  {
    href: "/",
    labelKey: "desktopLinks.home",
  },
  {
    href: "/collection",
    labelKey: "desktopLinks.collection",
  },
  {
    href: "#",
    labelKey: "desktopLinks.about",
  },
  {
    href: "#",
    labelKey: "desktopLinks.stores",
  },
];

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const t = useTranslations("navbar");
  return (
    <header className="p-6 container mx-auto max-w-screen-2xl md:px-[8%] sticky top-0 left-0 w-full bg-white z-50 shadow-xs">
      <nav className="">
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-4 mr-4">
            <Button
              variant={"link"}
              size={"sm"}
              className="text-lg font-semibold p-0 hover:no-underline"
            >
              <Link href={"/"} className="font-black flex">
                ACME <span className="font-normal">STORE</span>
              </Link>
            </Button>
            <ul className="flex">
              {NAVBAR_DESKTOP_LINKS.map((link) => (
                <li key={t(link.labelKey)}>
                  <Button variant={"link"} size={"sm"} style={"link"} asChild>
                    <Link href={link.href}>{t(link.labelKey)}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div>
                <Button variant={"link"} size={"sm"} asChild className="pl-0">
                  <Link
                    href={`/${user.username
                      .replaceAll(" ", "-")
                      .toLocaleLowerCase()}/order-history`}
                  >
                    {user.username}
                  </Link>
                </Button>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  asChild
                  onClick={logout}
                >
                  <Link href={"/"}>
                    <LogOut className="size-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex gap-1">
                <Button variant={"link"} size={"sm"} style={"link"}>
                  <Link href={"/auth/sign-in"}>{t("signIn")}</Link>
                </Button>
                <span className="h-6 w-px block bg-neutral-200 self-center"></span>
                <Button variant={"link"} size={"sm"} style={"link"}>
                  <Link href={"/auth/sign-up"}>{t("signUp")}</Link>
                </Button>
              </div>
            )}
            <ExpandableSearchInput />
            <LanguageCurrencySwitcher />
            <Button
              variant={"link"}
              asChild
              className="flex items-center gap-2"
            >
              <Link href={"/cart"}>
                <ShoppingCart className="size-5" strokeWidth={1.5} />
                <span>{totalItems}</span>
              </Link>
            </Button>
          </div>
        </div>

        <NavbarMobile />
      </nav>
    </header>
  );
};

export default Navbar;
