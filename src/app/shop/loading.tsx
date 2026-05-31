import { ProductGridSkeleton } from '@/components/shop/product-card-skeleton';

export default function ShopLoading() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex gap-8">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block w-56 flex-shrink-0 space-y-4">
          <div className="h-5 w-24 bg-muted animate-pulse rounded" />
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                <div className="h-4 w-28 bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <ProductGridSkeleton count={9} />
        </div>
      </div>
    </div>
  );
}
