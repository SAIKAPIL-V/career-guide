'use client';
import { Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import EmblemLogo from './emblem-logo';
import { useAuth } from '@/context/auth-context';

export default function Footer() {
  const { user } = useAuth();
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <EmblemLogo className="h-10 w-10 text-primary" />
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
            <div>
              <h3 className="font-headline font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Government of Jammu and Kashmir. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
