'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Icons } from '@/components/icons';
import { LayoutDashboard, UserCircle, LogOut, Ticket, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard /> },
  { href: '/dashboard/profile', label: 'Profile', icon: <UserCircle /> },
  { href: '/dashboard/tickets', label: 'My Tickets', icon: <Ticket /> },
  { href: '/fitbox', label: 'My Learning', icon: <BookOpen /> },
];

const logoImage = PlaceHolderImages.find(p => p.id === 'main-logo');

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
             <Link href="/" className="flex items-center gap-2">
                {logoImage && <Image src={logoImage.imageUrl} alt={logoImage.description} width={40} height={40} className="h-10 w-10" />}
                <span className="font-bold text-lg font-headline text-accent-foreground">
                  FITKITS
                </span>
              </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={{ children: item.label, side: "right", align: "center" }}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <Button variant="ghost" className="w-full justify-start gap-2">
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex-1 bg-background">
          <div className="p-4 md:p-6">
            <div className="md:hidden mb-4">
                <SidebarTrigger />
            </div>
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
