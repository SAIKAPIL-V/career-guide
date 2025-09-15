import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EmblemLogo from '@/components/layout/emblem-logo';
import { MapPin } from 'lucide-react';
import Link from 'next/link';

export default function CollegesPage() {
  const colleges = [
    {
      name: 'University of Kashmir',
      location: 'Srinagar, Jammu and Kashmir',
      href: '/colleges/university-of-kashmir',
    },
    {
      name: 'NIT Srinagar',
      location: 'Srinagar, Jammu and Kashmir',
      href: '/colleges/nit-srinagar',
    },
    {
      name: 'IIT Delhi',
      location: 'New Delhi, Delhi',
      href: '/colleges/iit-delhi',
    },
    {
      name: 'Government City College',
      location: 'Hyderabad, Telangana',
      href: '/colleges/government-city-college',
    },
    {
      name: 'Nizam College',
      location: 'Hyderabad, Telangana',
      href: '/colleges/nizam-college',
    },
    {
      name: 'IIT Hyderabad',
      location: 'Hyderabad, Telangana',
      href: '/colleges/iit-hyderabad',
    },
    {
      name: 'AIIMS Delhi',
      location: 'New Delhi, Delhi',
      href: '#', 
    },
    {
        name: 'JIPMER Puducherry',
        location: 'Puducherry',
        href: '#',
    },
    {
        name: 'Maulana Azad Medical College',
        location: 'New Delhi, Delhi',
        href: '#',
    },
    {
        name: 'Lady Hardinge Medical College',
        location: 'New Delhi, Delhi',
        href: '#',
    },
    {
        name: 'Christian Medical College',
        location: 'Vellore, Tamil Nadu',
        href: '#',
    },
    {
        name: 'IIT Bombay',
        location: 'Mumbai, Maharashtra',
        href: '#',
    },
    {
      name: 'Jammu University',
      location: 'Jammu, Jammu and Kashmir',
      href: '#',
    },
    {
      name: 'Sher-e-Kashmir University of Agricultural Sciences and Technology',
      location: 'Srinagar, Jammu and Kashmir',
      href: '#',
    },
    {
      name: 'Government Medical College, Srinagar',
      location: 'Srinagar, Jammu and Kashmir',
      href: '#',
    },
    {
      name: 'IIT Madras',
      location: 'Chennai, Tamil Nadu',
      href: '#',
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Explore Colleges
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Find detailed information about top institutions in Jammu and Kashmir and across India.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {colleges.map((college, index) => (
          <Link href={college.href} key={index}>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <EmblemLogo className="h-6 w-6 text-primary" />
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
          </Link>
        ))}
      </div>
    </div>
  );
}
