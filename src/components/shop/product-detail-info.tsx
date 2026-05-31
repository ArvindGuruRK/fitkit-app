'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Minus, Plus, ShoppingCart, Zap, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from './cart-provider';
import { useToast } from '@/hooks/use-toast';
import { formatPrice, getEffectivePrice } from '@/lib/shop/cart-utils';
import type { Product, ProductVariant } from '@/lib/shop/types';
import { CATEGORY_LABELS } from '@/lib/shop/types';
import { cn } from '@/lib/utils';

export function ProductDetailInfo({ product }: { product: Product }) {
  const { dispatch } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const firstInStockVariant = product.variants?.find((v) => v.inStock) ?? product.variants?.[0];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(firstInStockVariant);
  const [quantity, setQuantity] = useState(1);

  const effectivePrice = product.price + (selectedVariant?.priceModifier ?? 0);
  const isAvailable = product.inStock && (selectedVariant ? selectedVariant.inStock : true);

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', product, variant: selectedVariant });
    }
    toast({
      title: 'Added to cart',
      description: `${quantity}× ${product.name}${selectedVariant ? ` (${selectedVariant.label})` : ''} added to your cart.`,
    });
  }

  function handleBuyNow() {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', product, variant: selectedVariant });
    }
    router.push('/shop/checkout');
  }

  return (
    <div className="space-y-5">
      {/* Brand + category */}
      <div className="flex items-center gap-2 text-sm">
        <span className="font-semibold text-primary uppercase tracking-wide">{product.brand}</span>
        <span className="text-muted-foreground">·</span>
        <Badge variant="secondary" className="text-xs">{CATEGORY_LABELS[product.category]}</Badge>
      </div>

      <h1 className="font-headline text-3xl md:text-4xl uppercase leading-tight">{product.name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'h-4 w-4',
                i < Math.floor(product.rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-muted text-muted-foreground'
              )}
            />
          ))}
        </div>
        <span className="text-sm font-semibold">{product.rating}</span>
        <span className="text-sm text-muted-foreground">({product.reviewCount.toLocaleString()} reviews)</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-primary">{formatPrice(effectivePrice)}</span>
        {product.originalPrice && (
          <>
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.originalPrice + (selectedVariant?.priceModifier ?? 0))}
            </span>
            <Badge variant="destructive" className="text-xs">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Badge>
          </>
        )}
      </div>

      <p className="text-muted-foreground leading-relaxed">{product.shortDescription}</p>

      <Separator />

      {/* Variant selector */}
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold">
            Size / Flavour: <span className="font-normal text-muted-foreground">{selectedVariant?.label}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                disabled={!variant.inStock}
                className={cn(
                  'rounded-md border px-3 py-1.5 text-sm font-medium transition-all',
                  !variant.inStock && 'opacity-40 cursor-not-allowed line-through',
                  selectedVariant?.id === variant.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-primary hover:text-primary'
                )}
              >
                {variant.label}
                {variant.priceModifier > 0 && ` (+${formatPrice(variant.priceModifier)})`}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity + availability */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-0 border border-border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-r-none"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-l-none"
            onClick={() => setQuantity(quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          {isAvailable ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-green-600 dark:text-green-400 font-medium">In Stock</span>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 text-destructive" />
              <span className="text-destructive font-medium">Out of Stock</span>
            </>
          )}
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          size="lg"
          className="flex-1 gap-2"
          onClick={handleAddToCart}
          disabled={!isAvailable}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="flex-1 gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          onClick={handleBuyNow}
          disabled={!isAvailable}
        >
          <Zap className="h-4 w-4" />
          Buy Now
        </Button>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-4 pt-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">✓ Free shipping above ₹999</span>
        <span className="flex items-center gap-1">✓ Authentic products guaranteed</span>
        <span className="flex items-center gap-1">✓ Easy 7-day returns</span>
      </div>
    </div>
  );
}
