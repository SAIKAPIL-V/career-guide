'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { personalizedCareerRecommendations, PersonalizedCareerRecommendationsOutput } from '@/ai/flows/personalized-career-recommendations';
import { personalizedCourseRecommendations, PersonalizedCourseRecommendationsOutput } from '@/ai/flows/personalized-course-recommendations';

type ResultsData = PersonalizedCareerRecommendationsOutput | PersonalizedCourseRecommendationsOutput;

export default function ResultsPage() {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<ResultsData | null>(null);
  const [assessmentType, setAssessmentType] = useState<string | null>(null);

  useEffect(() => {
    const storedAnswers = localStorage.getItem('assessmentAnswers');
    const type = localStorage.getItem('assessmentType');
    
    if (storedAnswers && type) {
      const parsedAnswers = JSON.parse(storedAnswers);
      setAssessmentType(type);
      
      const getRecommendations = async () => {
        setLoading(true);
        try {
          let result: ResultsData;
          if (type === '10th') {
            result = await personalizedCourseRecommendations({
              interests: parsedAnswers.join(', '),
              strengths: 'Varies based on answers',
              academicPerformance: 'Average',
              careerAspirations: 'Not specified',
            });
          } else { // 12th
            result = await personalizedCareerRecommendations({
              interests: parsedAnswers.join(', '),
              aptitude: 'Varies based on answers',
              academicPerformance: 'Average',
              location: 'India',
            });
          }
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
          <p className="text-sm text-muted-foreground">Our AI is crafting your personalized path...</p>
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
    );
  }

  const render10thResults = () => {
    const data = results as PersonalizedCourseRecommendationsOutput;
    return (
      <>
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Your Personalized Rationale</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{data.rationale}</p>
                </CardContent>
            </Card>
        </div>
        <div className="grid grid-cols-1 gap-8 md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Recommended Streams</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                    {data.recommendedStreams?.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Recommended Courses</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                    {data.recommendedCourses?.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </>
    );
  };

  const render12thResults = () => {
    const data = results as PersonalizedCareerRecommendationsOutput;
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Careers</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {data.careerRecommendations?.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Courses</CardTitle>
          </CardHeader>
          <CardContent>
             <ul className="list-disc list-inside space-y-2">
                {data.courseRecommendations?.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Colleges</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {data.collegeRecommendations?.map((item) => <li key-={item}>{item}</li>)}
            </ul>
          </CardContent>
        </Card>
      </>
    );
  };

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Your Personalized Recommendations
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Based on your assessment for Class {assessmentType}, here are some paths you could explore.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {assessmentType === '10th' ? render10thResults() : render12thResults()}
      </div>
       <div className="text-center mt-12">
            <Button asChild>
                <a href="/assessment">Take Another Assessment</a>
            </Button>
        </div>
    </div>
  );
}
