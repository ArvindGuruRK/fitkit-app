'use client';

import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FilterSidebarContent } from './product-filter-sidebar';

export function ProductFilterSheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader className="mb-6">
          <SheetTitle className="font-headline uppercase text-sm tracking-wider">
            Filter Products
          </SheetTitle>
        </SheetHeader>
        <FilterSidebarContent onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
