'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { RotateCcw } from 'lucide-react';
import { CATEGORY_LABELS } from '@/lib/shop/types';
import type { ProductCategory } from '@/lib/shop/types';
import { getCategoryCounts } from '@/lib/shop/products';
import { cn } from '@/lib/utils';

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as ProductCategory[];

const RATING_OPTIONS = [
  { value: '4', label: '4★ & above' },
  { value: '3', label: '3★ & above' },
];

interface FilterSidebarContentProps {
  onClose?: () => void;
}

export function FilterSidebarContent({ onClose }: FilterSidebarContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryCounts = getCategoryCounts();

  const getParam = useCallback(
    (key: string) => searchParams.get(key) ?? '',
    [searchParams]
  );

  const selectedCategories = getParam('categories')
    ? getParam('categories').split(',').filter(Boolean) as ProductCategory[]
    : [];

  const minRating = getParam('minRating');
  const inStockOnly = getParam('inStockOnly') === 'true';

  function buildUpdatedParams(updates: Record<string, string | undefined>): string {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === undefined || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    return params.toString();
  }

  function navigate(updates: Record<string, string | undefined>) {
    const qs = buildUpdatedParams(updates);
    router.push(`${pathname}?${qs}`);
    onClose?.();
  }

  function toggleCategory(cat: ProductCategory) {
    const next = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
    navigate({ categories: next.length > 0 ? next.join(',') : undefined });
  }

  function setRating(val: string) {
    navigate({ minRating: minRating === val ? undefined : val });
  }

  function toggleInStock() {
    navigate({ inStockOnly: inStockOnly ? undefined : 'true' });
  }

  function clearAll() {
    router.push(pathname);
    onClose?.();
  }

  const hasActiveFilters =
    selectedCategories.length > 0 || !!minRating || inStockOnly;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-headline text-sm uppercase tracking-wider">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAll} className="h-7 gap-1 text-xs text-muted-foreground">
            <RotateCcw className="h-3 w-3" />
            Clear all
          </Button>
        )}
      </div>

      <Separator />

      {/* Category */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold">Category</h4>
        <div className="space-y-2">
          {ALL_CATEGORIES.map((cat) => (
            <div key={cat} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`cat-${cat}`}
                  checked={selectedCategories.includes(cat)}
                  onCheckedChange={() => toggleCategory(cat)}
                />
                <Label htmlFor={`cat-${cat}`} className="text-sm font-normal cursor-pointer">
                  {CATEGORY_LABELS[cat]}
                </Label>
              </div>
              <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
                {categoryCounts[cat] ?? 0}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold">Minimum Rating</h4>
        <div className="space-y-2">
          {RATING_OPTIONS.map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <Checkbox
                id={`rating-${opt.value}`}
                checked={minRating === opt.value}
                onCheckedChange={() => setRating(opt.value)}
              />
              <Label htmlFor={`rating-${opt.value}`} className="text-sm font-normal cursor-pointer">
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* In Stock */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="in-stock"
          checked={inStockOnly}
          onCheckedChange={toggleInStock}
        />
        <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
          In stock only
        </Label>
      </div>
    </div>
  );
}

export function ProductFilterSidebar({ className }: { className?: string }) {
  return (
    <aside className={cn('hidden lg:block w-56 flex-shrink-0', className)}>
      <div className="sticky top-28">
        <FilterSidebarContent />
      </div>
    </aside>
  );
}
