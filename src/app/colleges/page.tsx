import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, MapPin } from 'lucide-react';

export default function CollegesPage() {
  const colleges = [
    {
      name: 'Government City College',
      location: 'Hyderabad, Telangana',
    },
    {
      name: 'Nizam College',
      location: 'Hyderabad, Telangana',
    },
    {
      name: 'Indian Institute of Technology, Hyderabad',
      location: 'Hyderabad, Telangana',
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Explore Colleges
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Find the best government colleges near you.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {colleges.map((college, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl font-headline">{college.name}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{college.location}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
