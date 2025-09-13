import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Terms of Service
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Please read our terms and conditions carefully.
        </p>
      </div>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
            <CardTitle>Agreement</CardTitle>
        </CardHeader>
        <CardContent>
            <p>This is a placeholder for the terms of service. This page would typically outline the rules and regulations for the use of the application, including user responsibilities, limitations of liability, and other legal notices.</p>
        </CardContent>
       </Card>
    </div>
  );
}
