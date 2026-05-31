'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ElectricBorder from '@/components/ui/electric-border';
import { useCart } from './cart-provider';
import { formatPrice } from '@/lib/shop/cart-utils';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/shop/types';
import { cn } from '@/lib/utils';

export function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();
  const { toast } = useToast();

  const defaultVariant = product.variants?.find((v) => v.inStock) ?? product.variants?.[0];

  function handleAddToCart() {
    dispatch({ type: 'ADD_ITEM', product, variant: defaultVariant });
    toast({
      title: 'Added to cart',
      description: `${product.name}${defaultVariant ? ` (${defaultVariant.label})` : ''} was added to your cart.`,
    });
  }

  const effectivePrice = (product.price) + (defaultVariant?.priceModifier ?? 0);

  return (
    <ElectricBorder color="#E63946" speed={2} chaos={0.3} thickness={1.5}>
      <Card className="overflow-hidden group transform transition-all duration-300 hover:shadow-xl flex flex-col rounded-2xl bg-transparent h-full">
        <Link href={`/shop/${product.slug}`} className="block overflow-hidden relative">
          <div className="relative h-52 w-full overflow-hidden bg-muted">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          </div>
          {/* Status badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isBestSeller && (
              <Badge className="text-[10px] px-1.5 py-0.5 bg-amber-500 hover:bg-amber-500 text-white border-0">
                BEST SELLER
              </Badge>
            )}
            {product.isNew && (
              <Badge className="text-[10px] px-1.5 py-0.5 bg-green-600 hover:bg-green-600 text-white border-0">
                NEW
              </Badge>
            )}
          </div>
          {product.originalPrice && (
            <div className="absolute top-2 right-2">
              <Badge variant="destructive" className="text-[10px] px-1.5 py-0.5">
                SALE
              </Badge>
            </div>
          )}
        </Link>

        <CardContent className="p-4 flex-grow flex flex-col gap-3 bg-card">
          <Link href={`/shop/${product.slug}`} className="space-y-1 flex-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
              {product.brand}
            </p>
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-3 w-3',
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-muted text-muted-foreground'
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviewCount.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(effectivePrice)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.originalPrice && (
              <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                {Math.round(((product.originalPrice - effectivePrice) / product.originalPrice) * 100)}% off
              </span>
            )}
          </div>

          <Button
            size="sm"
            className="w-full mt-auto"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </CardContent>
      </Card>
    </ElectricBorder>
  );
}
