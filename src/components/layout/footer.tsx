'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';

export default function Footer() {
  const { user } = useAuth();
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Government_of_India_logo.svg/1200px-Government_of_India_logo.svg.png" alt="Government of India Emblem" width={60} height={60} />
              <div className="flex flex-col">
                 <span className="font-bold font-headline text-xl leading-tight">CareerCompass</span>
                 <span className="text-xs text-muted-foreground font-semibold leading-tight">Government of Jammu and Kashmir</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering the youth of Jammu and Kashmir.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 gap-8">
            {user && (
              <div>
                <h3 className="font-headline font-semibold mb-4">Navigate</h3>
                <ul className="space-y-2">
                  <li><Link href="/careers" className="text-sm hover:text-primary transition-colors">Career Paths</Link></li>
                  <li><Link href="/find-colleges" className="text-sm hover:text-primary transition-colors">AI College Finder</Link></li>
                  <li><Link href="/assessment" className="text-sm hover:text-primary transition-colors">Take Assessment</Link></li>
                  <li><Link href="/colleges" className="text-sm hover:text-primary transition-colors">College Directory</Link></li>
                </ul>
              </div>
            )}
            <div>
              <h3 className="font-headline font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
