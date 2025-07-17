// Next.js & Next-Intl
import { Link } from "@/i18n/navigation";

// Componentes
import MenuMobile from "../MenuMobile";
import { Button } from "../ui/button";

// Hooks locais
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

// Ícones
import { ShoppingCart, UserRound } from "lucide-react";

const NavbarMobile = () => {
  const { totalItems } = useCart();
  const { user } = useAuth();
  return (
    <div className="flex lg:hidden justify-between items-center">
      <div className="flex items-center">
        <MenuMobile />

        <Button
          variant={"link"}
          size={"sm"}
          asChild
          className="font-black sm:text-base gap-0"
        >
          <Link href={"/"}>
            ACME <span className="font-normal">STORE</span>
          </Link>
        </Button>
      </div>

      <div className="flex">
        <Button variant={"ghost"} asChild>
          <Link
            href={
              user
                ? `/${user.username
                    .replaceAll(" ", "-")
                    .toLocaleLowerCase()}/order-history`
                : "/auth/sign-in"
            }
          >
            <UserRound className="size-5" strokeWidth={1.5} />
          </Link>
        </Button>

        <Button variant={"ghost"} asChild>
          <Link href={"/cart"}>
            <ShoppingCart className="size-5" strokeWidth={1.5} />
            <span>{totalItems}</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NavbarMobile;
