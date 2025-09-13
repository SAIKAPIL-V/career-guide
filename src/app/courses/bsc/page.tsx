import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BScPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Bachelor of Science (B.Sc)
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          A foundational degree in science disciplines.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>A B.Sc degree is an undergraduate academic degree awarded for completing a three-year course in the field of science. This page will soon contain more details about career opportunities, top colleges, and future prospects.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Career Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Research Scientist</li>
              <li>Data Analyst</li>
              <li>Teacher</li>
              <li>Scientific Writer</li>
              <li>And many more...</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
