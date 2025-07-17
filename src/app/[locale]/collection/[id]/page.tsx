// Componentes
import ProductDetails from "@/components/product/ProductDetails";
import ProductImage from "@/components/product/ProductImage";
import Testimonials from "@/components/product/Testimonials";
import NotFoundPage from "../../not-found";

// Produtos
import { AllProducts } from "@/data/products";
import MoreProducts from "@/components/product/MoreProducts";

type ProductPageProps = {
  params: {
    id: string;
    locale: string;
  };
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id, locale } = await params;

  const product = AllProducts.find((product) => product.id === id);

  if (!product) {
    return <NotFoundPage locale={locale} type="product" />;
  }

  return (
    <section className="container mx-auto p-6 md:px-[8%] max-w-full lg:max-w-screen-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-8 lg:gap-8">
        <ProductImage product={product} />
        <ProductDetails product={product} />
      </div>

      <Testimonials />

      <MoreProducts />
    </section>
  );
};

export default ProductPage;
