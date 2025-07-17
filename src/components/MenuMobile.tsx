// React
import { useEffect, useState } from "react";

// Next.js & Next-Intl
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

// Componentes
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ExpandableSearchInput } from "./ExpandableSearchInput";
import LanguageCurrencySwitcher from "./LanguageCurrencySwitcher";

// Hooks locais
import { useAuth } from "@/hooks/useAuth";

// Ícones
import { Menu } from "lucide-react";

const STATIC_LINKS = [
  { labelKey: "sheetLinks.0.label", href: "/" },
  { labelKey: "sheetLinks.1.label", href: "/collection" },

  { labelKey: "sheetLinks.3.label", href: "/about" },
];

const AUTH_LINKS = [
  {
    labelKey: "sheetLinks.2.label",
    href: "order-history-key",
    auth: "user",
  },
  { labelKey: "sheetLinks.4.label", href: "/auth/sign-in", auth: "guest" },
  { labelKey: "sheetLinks.5.label", href: "/auth/sign-up", auth: "guest" },
  { labelKey: "sheetLinks.6.label", href: "/", auth: "user", isLogout: true },
];

const COLLECTIONS = [
  {
    labelKey: "sheetImages.0.label",
    altKey: "sheetImages.0.alt",
    imageUrl: "/pexels-lucas-brown-368306455-16270855.jpg",
    href: "/collection",
  },
  {
    labelKey: "sheetImages.1.label",
    altKey: "sheetImages.1.alt",
    imageUrl: "/pexels-igor-justo-102944996-12407949.jpg",
    href: "/collection",
  },
  {
    labelKey: "sheetImages.2.label",
    altKey: "sheetImages.2.alt",
    imageUrl: "/pexels-sara-kazemi-2148049458-30659493.jpg",
    href: "/collection",
  },
  {
    labelKey: "sheetImages.3.label",
    altKey: "sheetImages.3.alt",
    imageUrl: "/pexels-harsh-kushwaha-804217-1721558.jpg",
    href: "/collection",
  },
];

const MenuMobile = () => {
  const t = useTranslations("mobileMenu");
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="p-1">
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col gap-4 overflow-scroll max-w-xs w-full"
      >
        <SheetHeader>
          <SheetTitle className="text-xl">{t("sheetTitle")}</SheetTitle>
          <SheetDescription className="hidden"></SheetDescription>
        </SheetHeader>

        <div className="px-4 -mt-4 ">
          <ExpandableSearchInput alwaysExpanded />
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-6 px-4">
          {COLLECTIONS.map((collection) => (
            <div key={t(collection.labelKey)} className="flex flex-col gap-2 ">
              <Link
                href={collection.href}
                className="relative w-full min-w-[130px] max-w-[160px] min-h-[120px] max-h-[120px] rounded-md overflow-hidden"
              >
                <Image
                  src={collection.imageUrl}
                  alt={t(collection.altKey)}
                  fill
                  sizes="(max-width: 640px) 130px, 160px"
                  className="object-cover rounded-md"
                />
              </Link>
              <Link href={"/collection"} className="text-sm truncate">
                {t(collection.labelKey)}
              </Link>
            </div>
          ))}
        </div>

        <ul className="flex flex-col gap-2.5 px-4">
          {STATIC_LINKS.map((link) => (
            <li
              key={link.labelKey}
              onClick={toggleMenu}
              className={`first:border-t first:pt-2 first:mt-2 `}
            >
              <Link href={link.href}>{t(link.labelKey)}</Link>
            </li>
          ))}

          {/* Links condicionalmente renderizados */}
          {AUTH_LINKS.map(({ labelKey, href, auth, isLogout }) => {
            const showForUser = user && auth === "user";
            const showForGuest = !user && auth === "guest";

            if (!(showForUser || showForGuest)) return null;

            return (
              <li
                key={labelKey}
                onClick={toggleMenu}
                className={`${
                  href === "/auth/sign-in" ? "border-t mt-2 pt-2.5" : ""
                }
                ${href === "/auth/sign-up" ? "border-b mb-2 pb-2.5" : ""}
                `}
              >
                {isLogout ? (
                  <button
                    onClick={logout}
                    className="text-left w-full hover:underline border-b my-2.5 py-2.5"
                  >
                    {t(labelKey)}
                  </button>
                ) : (
                  <Link
                    href={
                      href === "order-history-key"
                        ? `/${user?.username
                            .replaceAll(" ", "-")
                            .toLocaleLowerCase()}/order-history`
                        : href
                    }
                  >
                    {t(labelKey)}
                  </Link>
                )}
              </li>
            );
          })}

          <li>
            <LanguageCurrencySwitcher />
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default MenuMobile;
