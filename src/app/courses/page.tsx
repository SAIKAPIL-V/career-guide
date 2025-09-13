import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, BarChart2 } from 'lucide-react';
import Link from 'next/link';

export default function CoursesPage() {
  const courses = [
    {
      title: 'Bachelor of Technology (B.Tech)',
      description: 'An undergraduate engineering degree.',
      path: '/courses/btech',
    },
    {
      title: 'Bachelor of Science (B.Sc)',
      description: 'A foundational degree in science disciplines.',
      path: '/courses/bsc',
    },
    {
      title: 'Bachelor of Commerce (B.Com)',
      description: 'A degree focused on commerce, accounting, and finance.',
      path: '/courses/bcom',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Discover Degree Courses
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore a wide range of undergraduate courses to find your perfect fit.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <Link href={course.path} key={index}>
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                  <Book className="h-10 w-10 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-headline text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-muted-foreground">{course.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
