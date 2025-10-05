import { Button } from "@workspace/ui/components/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface SimilarProductsProps {
  products?: any[];
}

export const SimilarProducts = ({ products }: SimilarProductsProps) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-8 lg:py-12">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
          <h2 className="text-xl lg:text-3xl font-bold text-gray-900">
            Similar Products
          </h2>
          <Button variant="outline" className="w-fit">
            <Link href="/products"> View More</Link>
          </Button>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative"
        >
          <CarouselContent className="">
            {products.map((product) => (
              <CarouselItem key={product.id} className="basis-auto">
                <ProductCard {...product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </div>
    </section>
  );
};
