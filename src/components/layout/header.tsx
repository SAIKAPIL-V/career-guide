'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import EmblemLogo from './emblem-logo';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Career Paths', href: '/careers' },
  { label: 'AI College Finder', href: '/find-colleges' },
  { label: 'About', href: '/about' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState<string | false>(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const handleLinkClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname !== href) {
        setIsNavigating(href);
        router.push(href);
    }
    setIsMobileMenuOpen(false);
  }

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-header/95 backdrop-blur supports-[backdrop-filter]:bg-header/60">
      <div className="container flex h-20 items-center">
        <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <EmblemLogo className="h-10 w-10 text-primary" />
              <div className='flex flex-col'>
                <span className="font-bold text-xl leading-tight sm:inline-block">
                    CareerCompass
                </span>
                <span className="text-xs text-muted-foreground font-semibold leading-tight">Govt. of Jammu and Kashmir</span>
              </div>
            </Link>
        </div>
        
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium ml-6">
        {user && navItems.map((item) => (
            <Link
            key={item.href}
            href={item.href}
            onClick={handleLinkClick(item.href)}
            className={cn("transition-colors hover:text-primary flex items-center gap-2", pathname === item.href && "text-primary")}
            >
              {isNavigating === item.href && <Loader2 className="h-4 w-4 animate-spin" />}
              {item.label}
            </Link>
        ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
            {!loading && (
            user ? (
                <>
                {pathname === '/dashboard' && <span className="hidden sm:inline text-sm text-muted-foreground">Welcome!</span>}
                <Button variant="outline" onClick={handleLogout}>Log Out</Button>
                </>
            ) : (
                <>
                <Button variant="outline" onClick={() => router.push('/login')}>Log In</Button>
                <Button onClick={() => router.push('/signup')}>Sign Up</Button>
                </>
            )
            )}
            {user && (
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Open menu</span>
                  </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full max-w-sm p-0">
                  <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between p-4 border-b">
                        <Link href="/" className="flex items-center space-x-2" onClick={handleLinkClick('/')}>
                            <EmblemLogo className="h-8 w-8 text-primary" />
                            <div className='flex flex-col'>
                                <span className="font-bold text-lg leading-tight sm:inline-block">
                                    CareerCompass
                                </span>
                                <span className="text-xs text-muted-foreground font-semibold leading-tight">Govt. of Jammu and Kashmir</span>
                            </div>
                        </Link>
                      <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                          <X className="h-6 w-6" />
                          <span className="sr-only">Close menu</span>
                      </Button>
                      </div>
                      <nav className="flex-1 p-4 space-y-4">
                      {navItems.map((item) => (
                          <Link
                          key={item.href}
                          href={item.href}
                          className="block text-lg font-medium py-2 hover:text-primary transition-colors"
                          onClick={handleLinkClick(item.href)}
                          >
                          {item.label}
                          </Link>
                      ))}
                      </nav>
                      {!loading && (
                        <div className="p-4 border-t space-y-2">
                          {user ? (
                            <Button variant="outline" className="w-full" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>Log Out</Button>
                          ) : (
                            <>
                              <Button variant="outline" className="w-full" onClick={() => { router.push('/login'); setIsMobileMenuOpen(false); }}>Log In</Button>
                              <Button className="w-full" onClick={() => { router.push('/signup'); setIsMobileMenuOpen(false); }}>Sign Up</Button>
                            </>
                          )}
                        </div>
                      )}
                  </div>
                  </SheetContent>
              </Sheet>
            )}
        </div>
      </div>
    </header>
  );
}
