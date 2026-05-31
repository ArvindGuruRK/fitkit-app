import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ProductGrid } from '@/components/shop/product-grid';
import { ProductFilterSidebar } from '@/components/shop/product-filter-sidebar';
import { ProductFilterSheet } from '@/components/shop/product-filter-sheet';
import { SortSelect } from '@/components/shop/sort-select';
import { filterProducts } from '@/lib/shop/products';
import type { ProductCategory, SortOption } from '@/lib/shop/types';

export const metadata: Metadata = {
  title: 'Shop | FitKit 2025',
  description: 'Browse premium fitness supplements, accessories, and merchandise.',
};

interface ShopPageProps {
  searchParams: Promise<{
    categories?: string;
    minRating?: string;
    inStockOnly?: string;
    sortBy?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  const categories = params.categories
    ? (params.categories.split(',').filter(Boolean) as ProductCategory[])
    : undefined;
  const minRating = params.minRating ? parseFloat(params.minRating) : undefined;
  const inStockOnly = params.inStockOnly === 'true';
  const sortBy = (params.sortBy as SortOption) || 'featured';

  const products = filterProducts({ categories, minRating, inStockOnly, sortBy });

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">Shop</span>
      </nav>

      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-headline text-4xl md:text-5xl uppercase tracking-tight">
          FitKits <span className="text-primary">Shop</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Premium supplements, accessories, and gear for your fitness journey.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-6 border-b pb-4">
        <div className="flex items-center gap-3">
          <ProductFilterSheet />
          <span className="text-sm text-muted-foreground hidden sm:inline">
            {products.length} product{products.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
          <SortSelect current={sortBy} />
        </div>
      </div>

      <div className="flex gap-8">
        <ProductFilterSidebar />
        <div className="flex-1 min-w-0">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
