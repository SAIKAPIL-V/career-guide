import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          We'd love to hear from you. Reach out with any questions or feedback.
        </p>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-primary" />
                <a href="mailto:support@educareercompass.com" className="text-lg hover:underline">support@educareercompass.com</a>
            </div>
            <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-primary" />
                <span className="text-lg">+91 123-456-7890</span>
            </div>
             <p className="text-muted-foreground pt-4">This page is for demonstration purposes. Contact information is not real.</p>
        </CardContent>
       </Card>
    </div>
  );
}
