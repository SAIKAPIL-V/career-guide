import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function IITHyderabadPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Indian Institute of Technology, Hyderabad
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Hyderabad, Telangana
        </p>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>About the College</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Information about the college, courses, and facilities will be displayed here.</p>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Campus Photos</CardTitle>
                </CardHeader>
                <CardContent>
                     <div className="relative h-60">
                        <Image
                            src="https://picsum.photos/seed/iith/600/400"
                            alt="IIT campus"
                            fill
                            className="object-cover rounded-md"
                            data-ai-hint="modern university"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
