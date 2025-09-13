'use client';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CalendarCheck, Lightbulb, Briefcase, GraduationCap, LinkIcon } from 'lucide-react';
import Link from 'next/link';

import {
  personalizedCareerRecommendations,
  PersonalizedCareerRecommendationsOutput,
} from '@/ai/flows/personalized-career-recommendations';
import {
  personalizedCourseRecommendations,
  PersonalizedCourseRecommendationsOutput,
} from '@/ai/flows/personalized-course-recommendations';
import { careerSpotlight, CareerSpotlightOutput } from '@/ai/flows/career-spotlight';

type ResultsData =
  | PersonalizedCareerRecommendationsOutput
  | PersonalizedCourseRecommendationsOutput;

const notifications = [
  {
    id: 1,
    title: 'JEE Main 2024: Application Deadline',
    date: 'March 2, 2024',
    description:
      'Last day to submit your application for the Joint Entrance Examination (Main).',
  },
  {
    id: 2,
    title: 'NEET 2024: Exam Date',
    date: 'May 5, 2024',
    description:
      'The National Eligibility cum Entrance Test for medical courses will be held on this day.',
  },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<ResultsData | null>(null);
  const [spotlight, setSpotlight] = useState<CareerSpotlightOutput | null>(null);
  const [assessmentType, setAssessmentType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const storedAnswers = localStorage.getItem('assessmentAnswers');
      const type = localStorage.getItem('assessmentType');

      if (storedAnswers && type) {
        setAssessmentType(type);
        const parsedAnswers = JSON.parse(storedAnswers);

        try {
          let resultData: ResultsData;
          if (type === '10th') {
            resultData = await personalizedCourseRecommendations({
              interests: parsedAnswers.join(', '),
              strengths: 'Varies based on answers',
              academicPerformance: 'Average',
              careerAspirations: 'Not specified',
            });
          } else {
            resultData = await personalizedCareerRecommendations({
              interests: parsedAnswers.join(', '),
              aptitude: 'Varies based on answers',
              academicPerformance: 'Average',
              location: 'India',
            });
          }
          setResults(resultData);

          // After getting results, fetch the career spotlight
          let topRecommendation: string | undefined;
          if ('recommendedStreams' in resultData) {
            topRecommendation = resultData.recommendedStreams?.[0];
          } else if ('careerRecommendations' in resultData) {
            topRecommendation = resultData.careerRecommendations?.[0];
          }

          if (topRecommendation) {
            const spotlightResult = await careerSpotlight({ career: topRecommendation });
            setSpotlight(spotlightResult);
          }
        } catch (err) {
          console.error('Failed to get recommendations:', err);
          setError('Our AI is a bit busy right now. Please try again in a moment.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError('No assessment found. Please take an assessment to view your dashboard.');
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-lg text-muted-foreground">
            Building Your Personalized Dashboard...
          </p>
          <p className="text-sm text-muted-foreground">
            Our AI is crafting your future paths. This may take a moment.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 lg:py-24 text-center">
        <h1 className="font-headline text-3xl font-bold">{error}</h1>
        <Button asChild className="mt-4">
          <Link href="/assessment">Take an Assessment</Link>
        </Button>
      </div>
    );
  }

  const renderTopRecs = () => {
    if (!results) return null;

    let items: string[] = [];
    let title: string = '';
    let icon: React.ReactNode = null;

    if (assessmentType === '10th' && 'recommendedStreams' in results) {
        items = results.recommendedStreams.slice(0, 3);
        title = "Top Recommended Streams";
        icon = <GraduationCap className="h-6 w-6 text-primary" />;
    } else if (assessmentType === '12th' && 'careerRecommendations' in results) {
        items = results.careerRecommendations.slice(0, 3);
        title = "Top Recommended Careers";
        icon = <Briefcase className="h-6 w-6 text-primary" />;
    }

    return (
        <Card className="md:col-span-1">
            <CardHeader>
                <div className="flex items-center gap-3">
                    {icon}
                    <CardTitle>{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {items.map(item => (
                        <li key={item} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <div className="bg-primary/10 p-2 rounded-full">
                                <LinkIcon className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium">{item}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 lg:py-16 bg-background">
      <div className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Your Personalized Dashboard
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Welcome! Here are the AI-powered insights based on your Class {assessmentType} assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content: Rationale & Spotlight */}
        <div className="md:col-span-2 space-y-8">
            {results && 'rationale' in results && (
                <Card className="shadow-lg animate-float-up">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Lightbulb className="h-6 w-6 text-accent" />
                            <CardTitle>Your Personalized Rationale</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-base leading-relaxed">{results.rationale}</p>
                    </CardContent>
                </Card>
            )}

            {spotlight && (
                <Card className="shadow-lg animate-float-up" style={{animationDelay: '0.2s'}}>
                    <CardHeader>
                        <CardTitle className="text-primary text-2xl font-bold">Career Spotlight: {spotlight.title}</CardTitle>
                        <CardDescription>{spotlight.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-lg mb-2">A Day in the Life</h4>
                            <p className="text-muted-foreground">{spotlight.dayInTheLife}</p>
                        </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-lg mb-2">Key Skills</h4>
                                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                    {spotlight.requiredSkills.map(skill => <li key={skill}>{skill}</li>)}
                                </ul>
                            </div>
                             <div>
                                <h4 className="font-semibold text-lg mb-2">Average Salary (INR)</h4>
                                <p className="text-2xl font-bold text-primary">{spotlight.averageSalary}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>

        {/* Sidebar Content: Top Recs & Timeline */}
        <div className="space-y-8 animate-float-up" style={{animationDelay: '0.4s'}}>
            {renderTopRecs()}
            
            <Card className="md:col-span-1">
                <CardHeader>
                     <div className="flex items-center gap-3">
                        <CalendarCheck className="h-6 w-6 text-primary" />
                        <CardTitle>Timeline Tracker</CardTitle>
                    </div>
                    <CardDescription>Upcoming deadlines and events.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {notifications.map((notification) => (
                        <div key={notification.id} className="flex items-start space-x-3">
                            <div className="bg-primary/10 p-2 rounded-full mt-1">
                                <CalendarCheck className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">{notification.title}</h3>
                                <p className="text-sm font-bold text-primary">{notification.date}</p>
                            </div>
                        </div>
                    ))}
                    <Button variant="link" asChild className="p-0 h-auto">
                        <Link href="/notifications">View All Deadlines</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>

       <div className="text-center mt-16">
            <Button asChild size="lg">
                <Link href="/assessment">Take Another Assessment</Link>
            </Button>
        </div>
    </div>
  );
}
