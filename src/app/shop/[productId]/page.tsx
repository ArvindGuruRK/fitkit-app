import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ProductImageGallery } from '@/components/shop/product-image-gallery';
import { ProductDetailInfo } from '@/components/shop/product-detail-info';
import { ProductRelated } from '@/components/shop/product-related';
import { getProductBySlug, getRelatedProducts } from '@/lib/shop/products';
import { CATEGORY_LABELS } from '@/lib/shop/types';

interface ProductDetailPageProps {
  params: Promise<{ productId: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = getProductBySlug(productId);
  if (!product) return { title: 'Product Not Found | FitKit 2025' };
  return {
    title: `${product.name} — ${product.brand} | FitKit 2025`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { productId } = await params;
  const product = getProductBySlug(productId);

  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8 flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href={`/shop?categories=${product.category}`}
          className="hover:text-foreground transition-colors"
        >
          {CATEGORY_LABELS[product.category]}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main content: gallery + info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <ProductImageGallery images={product.images} productName={product.name} />
        <ProductDetailInfo product={product} />
      </div>

      <Separator className="my-10" />

      {/* Detail tabs */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="description">Description</TabsTrigger>
          {product.nutritionFacts && (
            <TabsTrigger value="nutrition">Nutrition Facts</TabsTrigger>
          )}
          <TabsTrigger value="reviews">
            Reviews ({product.reviews?.length ?? 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="text-muted-foreground leading-relaxed max-w-3xl">
          {product.description}
        </TabsContent>

        {product.nutritionFacts && (
          <TabsContent value="nutrition">
            <div className="max-w-sm rounded-lg border border-border overflow-hidden">
              <div className="bg-foreground text-background px-4 py-3">
                <p className="font-headline text-sm uppercase tracking-wide">Nutrition Facts</p>
                <p className="text-xs text-background/70">Per {product.nutritionFacts['Serving Size'] ?? 'serving'}</p>
              </div>
              <div className="divide-y divide-border">
                {Object.entries(product.nutritionFacts)
                  .filter(([key]) => key !== 'Serving Size')
                  .map(([key, value]) => (
                    <div key={key} className="flex justify-between px-4 py-2 text-sm">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-semibold">{value}</span>
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>
        )}

        <TabsContent value="reviews">
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-4 max-w-2xl">
              {product.reviews.map((review) => (
                <div key={review.id} className="rounded-lg border border-border p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{review.author}</span>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < review.rating ? 'text-amber-400' : 'text-muted-foreground'}>★</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No reviews yet. Be the first to review this product!</p>
          )}
        </TabsContent>
      </Tabs>

      {/* Related products */}
      <ProductRelated products={related} />
    </div>
  );
}
