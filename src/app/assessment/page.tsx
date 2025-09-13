import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function AssessmentPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Find Your Perfect Path
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Let's get started. To give you the best recommendations, please tell us which grade you've most recently completed.
        </p>
      </div>
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl">I have completed...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/assessment/10th" legacyBehavior>
                <a className="group block text-center p-8 border rounded-lg hover:bg-primary/5 hover:border-primary transition-all duration-300">
                  <h3 className="font-headline text-3xl font-bold">Class 10</h3>
                  <p className="text-muted-foreground mt-2">
                    Get guidance on choosing your stream (Arts, Science, Commerce, etc.).
                  </p>
                  <Button variant="link" className="mt-4 text-primary font-bold">
                    Start Assessment
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </Link>
              <Link href="/assessment/12th" legacyBehavior>
                <a className="group block text-center p-8 border rounded-lg hover:bg-primary/5 hover:border-primary transition-all duration-300">
                  <h3 className="font-headline text-3xl font-bold">Class 12</h3>
                  <p className="text-muted-foreground mt-2">
                    Discover the best degree courses and career opportunities for you.
                  </p>
                  <Button variant="link" className="mt-4 text-primary font-bold">
                    Start Assessment
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
