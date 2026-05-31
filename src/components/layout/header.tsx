'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CartIconButton } from '@/components/shop/cart-icon-button';
import { CartDrawer } from '@/components/shop/cart-drawer';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/classes', label: 'Classes' },
  { href: '/shop', label: 'Shop' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

const logoImage = PlaceHolderImages.find(p => p.id === 'main-logo');

function AuthSection() {
  return (
    <div className="flex items-center gap-2">
        <Button variant="outline" asChild>
          <Link href="/login">Log In</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50 will-change-transform">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            {logoImage && <Image src={logoImage.imageUrl} alt={logoImage.description} width={48} height={48} className="h-12 w-12" />}
            <span className="font-bold text-xl font-headline text-foreground">
              FITKITS
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex">
          <ul className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={cn(
                    "text-lg uppercase font-medium transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-full after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100",
                    pathname === link.href ? 'text-primary after:scale-x-100' : 'text-foreground hover:text-primary/80'
                  )}>
                    {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
       
        <div className="hidden md:flex items-center gap-2">
          <CartIconButton />
          <AuthSection />
        </div>

        <div className="md:hidden">
          <Button onClick={() => setIsMenuOpen(true)} variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </div>

      <CartDrawer />

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300",
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={cn(
            "fixed inset-y-0 right-0 flex w-full max-w-xs flex-col bg-white shadow-lg transition-transform duration-300 ease-in-out",
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              {logoImage && <Image src={logoImage.imageUrl} alt={logoImage.description} width={32} height={32} className="h-8 w-8" />}
              <span className="font-bold text-lg font-headline text-foreground">
                FITKITS
              </span>
            </Link>
            <Button onClick={() => setIsMenuOpen(false)} variant="ghost" size="icon">
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          <div className="flex flex-col p-4 space-y-2">
            <nav className="w-full">
              <ul className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href} className="w-full">
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "block w-full text-left p-3 rounded-md text-base font-medium transition-colors",
                        pathname === link.href ? 'bg-primary text-primary-foreground' : 'bg-gray-100 text-foreground hover:bg-gray-200'
                      )}>
                        {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t pt-4 mt-2 flex flex-col gap-2">
                <div className="flex justify-start pb-2">
                  <CartIconButton />
                </div>
                <Button variant="outline" asChild size="lg" onClick={() => setIsMenuOpen(false)}>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild size="lg" onClick={() => setIsMenuOpen(false)}>
                  <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
