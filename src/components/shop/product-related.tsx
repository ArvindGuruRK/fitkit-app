import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductCard } from './product-card';
import type { Product } from '@/lib/shop/types';

interface ProductRelatedProps {
  products: Product[];
}

export function ProductRelated({ products }: ProductRelatedProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-10">
      <h2 className="font-headline text-2xl uppercase mb-6">
        You May Also <span className="text-primary">Like</span>
      </h2>
      <Carousel
        opts={{ align: 'start', loop: false }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {products.map((product) => (
            <CarouselItem key={product.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </Carousel>
    </section>
  );
}
