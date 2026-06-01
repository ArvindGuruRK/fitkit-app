import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster"
import { AnnouncementBanner } from '@/components/announcement-banner';
import Ribbons from '@/components/ui/ribbons';
import { Header } from '@/components/layout/header';
import { CartProvider } from '@/components/shop/cart-provider';
import { ChatbotWidget } from '@/components/chatbot';
import { PageTransitionProvider } from '@/components/layout/transition-provider';
import { Michroma, Roboto } from 'next/font/google';

const michroma = Michroma({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-headline',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'FitKit 2025',
  description: 'The Next-Gen Fitness Experience',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("font-body antialiased bg-background", michroma.variable, roboto.variable)}>
        <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
            <Ribbons
              colors={['#E63946', '#E0F7FA', '#212121']}
              enableShaderEffect={true}
              effectAmplitude={1}
              baseThickness={20}
            />
        </div>
          <CartProvider>
            <AnnouncementBanner />
            <Header />
            <PageTransitionProvider>
              <main>{children}</main>
            </PageTransitionProvider>
            <Footer />
            <Toaster />
            <ChatbotWidget />
          </CartProvider>
      </body>
    </html>
  );
}
