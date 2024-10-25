import ProductPage from "@/app/components/product-page";
import { storeData } from "@/app/lib/products";

async function getProduct(id: string) {
  // Replace this with your actual data fetching logic
  const products = storeData.products;
  return products.find((p) => p.id === parseInt(id)) || null;
}

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductPage product={product} />;
}
