
'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { personalizedCareerRecommendations, PersonalizedCareerRecommendationsOutput } from '@/ai/flows/personalized-career-recommendations';
import { personalizedCourseRecommendations, PersonalizedCourseRecommendationsOutput } from '@/ai/flows/personalized-course-recommendations';


export default function ResultsPage() {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<PersonalizedCareerRecommendationsOutput | PersonalizedCourseRecommendationsOutput | null>(null);
  const [answers, setAnswers] = useState<string[] | null>(null);

  useEffect(() => {
    const storedAnswers = localStorage.getItem('assessmentAnswers');
    if (storedAnswers) {
      const parsedAnswers = JSON.parse(storedAnswers);
      setAnswers(parsedAnswers);
      
      const getRecommendations = async () => {
        setLoading(true);
        try {
          // This is a simplified logic. We'll need to know which quiz was taken (10th or 12th).
          // For now, let's assume 12th grade and call the career recommendations flow.
          const result = await personalizedCareerRecommendations({
            interests: parsedAnswers.join(', '),
            aptitude: 'Varies based on answers',
            academicPerformance: 'Average',
            location: 'India',
          });
          setResults(result);
        } catch (error) {
          console.error('Failed to get recommendations:', error);
        } finally {
          setLoading(false);
        }
      };
      getRecommendations();
    } else {
        setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-lg text-muted-foreground">Analyzing your results...</p>
        </div>
      </div>
    );
  }
  
  if (!results && !loading) {
     return (
        <div className="container mx-auto px-4 py-16 lg:py-24 text-center">
            <h1 className="font-headline text-3xl font-bold">No results found.</h1>
            <p className="text-muted-foreground mt-2">Please take an assessment to see your recommendations.</p>
            <Button asChild className="mt-4">
                <a href="/assessment">Take Assessment</a>
            </Button>
        </div>
     )
  }

  const careerResults = results as PersonalizedCareerRecommendationsOutput;

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Your Personalized Recommendations
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Based on your assessment, here are some paths you could explore.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recommended Careers</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {careerResults.careerRecommendations?.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Courses</CardTitle>
          </CardHeader>
          <CardContent>
             <ul className="list-disc list-inside space-y-2">
                {careerResults.courseRecommendations?.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Colleges</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {careerResults.collegeRecommendations?.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
