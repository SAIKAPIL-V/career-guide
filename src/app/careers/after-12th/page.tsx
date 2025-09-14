'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, University, Briefcase, Rocket, CheckCircle, GraduationCap } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { careerRoadmap, CareerRoadmapOutput } from '@/ai/flows/career-roadmap';
import { useToast } from '@/hooks/use-toast';

type CourseOption = 'B.Tech' | 'B.Sc' | 'B.Com';

const courseOptions: { name: CourseOption; description: string }[] = [
    { name: 'B.Tech', description: 'Engineering & Technology.' },
    { name: 'B.Sc', description: 'Science & Research.' },
    { name: 'B.Com', description: 'Commerce & Finance.' },
];

export default function After12thPage() {
  const [selectedCourse, setSelectedCourse] = useState<CourseOption | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CareerRoadmapOutput | null>(null);
  const { toast } = useToast();

  const handleCourseSelect = async (course: CourseOption) => {
    setSelectedCourse(course);
    setLoading(true);
    setResults(null);
    try {
      const resultData = await careerRoadmap({ course: course, stage: '12th Completed' });
      setResults(resultData);
    } catch (error) {
      console.error('AI call failed:', error);
      toast({
        variant: 'destructive',
        title: 'AI Error',
        description: 'Failed to get the roadmap. The AI might be busy. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Roadmap After 12th
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Congratulations on finishing 12th grade! Now it's time to pick a degree. Choose a course below to see what opportunities await you.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto mb-12 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Which degree interests you most?</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courseOptions.map((course) => (
            <Button
              key={course.name}
              variant={selectedCourse === course.name ? 'default' : 'outline'}
              onClick={() => handleCourseSelect(course.name)}
              disabled={loading}
              className="flex flex-col h-auto py-4"
            >
              <span className="font-semibold text-lg">{course.name}</span>
              <span className="text-sm font-normal text-muted-foreground">{course.description}</span>
            </Button>
          ))}
        </CardContent>
      </Card>

      {loading && (
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-lg text-muted-foreground">
            Our AI is designing your degree-level roadmap...
          </p>
        </div>
      )}

      {results && (
        <div className="max-w-4xl mx-auto animate-float-up">
           <div className="text-center mb-8">
            <h2 className="font-headline text-3xl font-bold">
              Your AI-Generated Roadmap for {selectedCourse}
            </h2>
             <p className="mt-2 text-muted-foreground">{results.introduction}</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {results.recommendedPaths.map((path, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                   <div className="flex items-center gap-3">
                     <Sparkles className="h-6 w-6 text-primary" />
                    {path.pathName}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-6 space-y-6">
                  <RoadmapDetail title="Further Studies" icon={<GraduationCap />} items={path.furtherStudies} />
                  <RoadmapDetail title="Job Opportunities" icon={<Briefcase />} items={path.jobOpportunities} />
                  <RoadmapDetail title="Entrepreneurship Ideas" icon={<Rocket />} items={path.entrepreneurshipIdeas} />
                  <RoadmapDetail title="Key Advantages" icon={<CheckCircle />} items={path.advantages} />
                  <RoadmapDetail title="Recommended Govt. Colleges" icon={<University />} items={path.recommendedColleges} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}

function RoadmapDetail({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2 text-primary/90">
            {icon} {title}
        </h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-4">
            {items.map((item, idx) => (
                <li key={idx}>{item}</li>
            ))}
        </ul>
    </div>
  )
}
