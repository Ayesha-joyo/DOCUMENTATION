import { client } from "@/sanity/lib/client";
import type { Product } from "@/types/products";
import { groq } from "next-sanity";
import ProductDetail from "./product-detail";
import { PageProps } from "@/.next/types/app/layout";

interface ProductPageProps extends PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Fetch product details from Sanity
async function getProduct(slug: string): Promise<Product | null> {
  return await client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
      _id,
      productName,
      _type,
      image,
      price,
      description,
      colors,
      sizes
    }`,
    { slug }
  );
}

// Dynamic page component
export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params; // Await the Promise to get the resolved value
  const { slug } = resolvedParams;

  try {
    // Fetch product details
    const product = await getProduct(slug);

    if (!product) {
      return <div>Product not found</div>; // Handle case where the product is not found
    }

    return <ProductDetail product={product} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    return <div>Something went wrong. Please try again later.</div>;
  }
}
