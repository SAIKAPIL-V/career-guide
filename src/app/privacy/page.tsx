import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Privacy Policy
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Your privacy is important to us.
        </p>
      </div>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
        </CardHeader>
        <CardContent>
            <p>This is a placeholder for the privacy policy. In a real application, this page would detail the data collected from users, how it's used, and the measures taken to protect it. For this demo, we store assessment answers in your browser's local storage and do not send it to a server for storage.</p>
        </CardContent>
       </Card>
    </div>
  );
}
