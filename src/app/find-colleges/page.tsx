'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Search, Sparkles, Award } from 'lucide-react';
import EmblemLogo from '@/components/layout/emblem-logo';
import {
  findCollegesForCourse,
  FindCollegesForCourseOutput,
} from '@/ai/flows/find-colleges-for-course';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const collegeNameToSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/, srinagar/g, '')
    .replace(/, delhi/g, '')
    .replace(/, /g, ' ')
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

export default function FindCollegesPage() {
  const searchParams = useSearchParams();
  const [course, setCourse] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<FindCollegesForCourseOutput | null>(null);
  const { toast } = useToast();

  const runSearch = async (searchCourse: string, searchLocation: string) => {
    if (!searchCourse || !searchLocation) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please enter both a course and a location.',
      });
      return;
    }
    setLoading(true);
    setResults(null);
    try {
      const resultData = await findCollegesForCourse({ course: searchCourse, location: searchLocation });
      setResults(resultData);
    } catch (error) {
      console.error('AI call failed:', error);
      toast({
        variant: 'destructive',
        title: 'AI Error',
        description: 'Failed to get recommendations. The AI might be busy. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const courseParam = searchParams.get('course');
    if (courseParam) {
      setCourse(courseParam);
      // For simplicity, we'll default a location when a course is passed in the URL.
      const defaultLocation = 'India';
      setLocation(defaultLocation);
      runSearch(courseParam, defaultLocation);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(course, location);
  };

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          AI College Finder
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Enter a course and your location to get personalized college recommendations from our AI advisor.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto mb-12 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-6 w-6" />
            Find the Best College for You
          </CardTitle>
          <CardDescription>Our AI will find top colleges and include their NIRF ranking.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div className="grid gap-2">
              <Label htmlFor="course">Course Name</Label>
              <Input
                id="course"
                placeholder="e.g., B.Tech in Computer Science"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Your City</Label>
              <Input
                id="location"
                placeholder="e.g., Srinagar"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Asking AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Recommendations
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {loading && (
        <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <p className="mt-4 text-lg text-muted-foreground">
                Our AI is searching for the best colleges for you...
            </p>
        </div>
      )}

      {results && (
        <div className="max-w-4xl mx-auto">
            <h2 className="font-headline text-3xl font-bold text-center mb-8">
                AI Recommendations for {`"${course}"`}
            </h2>
          <div className="space-y-6">
            {results.colleges.length > 0 ? (
                results.colleges.map((college) => (
                  <Link href={`/colleges/${collegeNameToSlug(college.collegeName)}`} key={college.collegeName} className="block group">
                    <Card className="shadow-md animate-float-up transition-all group-hover:shadow-xl group-hover:border-primary/50">
                        <CardHeader className="flex flex-row items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg mt-1">
                                <EmblemLogo className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <CardTitle>{college.collegeName}</CardTitle>
                                <CardDescription>{college.reason}</CardDescription>
                            </div>
                             {college.nirfRanking && college.nirfRanking !== 'Not Ranked' && (
                                <div className="flex items-center gap-2 text-sm font-semibold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                                    <Award className="h-4 w-4" />
                                    <span>{college.nirfRanking}</span>
                                </div>
                            )}
                        </CardHeader>
                    </Card>
                  </Link>
                ))
            ) : (
                <p className="text-center text-muted-foreground">
                    The AI couldn't find specific recommendations for this query. Try being more specific with the course name.
                </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
