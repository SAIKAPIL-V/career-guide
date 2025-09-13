import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BusinessCareersPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Business & Management Careers
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Detailed information about careers in this field will be available here soon.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Under Construction</CardTitle>
        </CardHeader>
        <CardContent>
            <p>This page is currently being built. Check back later for more information!</p>
        </CardContent>
       </Card>
    </div>
  );
}
