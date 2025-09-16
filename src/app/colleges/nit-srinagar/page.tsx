import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { collegeDetails } from '@/ai/flows/college-details';
import { Building, Library, Microscope, FileText } from 'lucide-react';
import { Suspense } from 'react';

async function CollegeInfo() {
  const details = await collegeDetails({ collegeName: 'National Institute of Technology, Srinagar' });

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
            <Building className="h-8 w-8 text-primary" />
            <CardTitle>About the College</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground leading-relaxed">{details.description}</p>
        </CardContent>
      </Card>
        <Card>
        <CardHeader className="flex flex-row items-center gap-4">
            <Library className="h-8 w-8 text-primary" />
            <CardTitle>Courses Offered</CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-muted-foreground">
              {details.coursesOffered.map(course => <li key={course} className="flex items-center gap-2"><div className="w-2 h-2 bg-primary rounded-full" />{course}</li>)}
            </ul>
        </CardContent>
      </Card>
        <Card>
        <CardHeader className="flex flex-row items-center gap-4">
            <Microscope className="h-8 w-8 text-primary" />
            <CardTitle>Facilities</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground leading-relaxed">{details.facilities}</p>
        </CardContent>
      </Card>
        <Card>
        <CardHeader className="flex flex-row items-center gap-4">
            <FileText className="h-8 w-8 text-primary" />
            <CardTitle>Admission Process</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground leading-relaxed">{details.admissionProcess}</p>
        </CardContent>
      </Card>
    </>
  )
}

export default async function NITSrinagarPage() {
  return (
     <div className="bg-muted/20">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            National Institute of Technology, Srinagar
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Srinagar, Jammu and Kashmir
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Suspense fallback={<p>Loading college details...</p>}>
              <CollegeInfo />
            </Suspense>
          </div>
          <div className="space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle>Campus Photos</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="relative h-60 rounded-lg overflow-hidden shadow-md">
                          <Image
                              src="https://picsum.photos/seed/college4/600/400"
                              alt="NIT Srinagar campus"
                              fill
                              className="object-cover"
                              data-ai-hint="kashmir university campus"
                          />
                      </div>
                  </CardContent>
              </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
