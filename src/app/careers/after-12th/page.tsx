'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, University, Briefcase, Rocket, CheckCircle, GraduationCap, Building, Palette, BarChart } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { careerRoadmap, CareerRoadmapOutput } from '@/ai/flows/career-roadmap';
import { useToast } from '@/hooks/use-toast';

type CareerField = 'Engineering' | 'Business' | 'Arts & Humanities';

const careerFields: { name: CareerField; description: string, icon: React.ReactNode }[] = [
    { name: 'Engineering', description: 'Build, innovate, and solve.', icon: <Building /> },
    { name: 'Business', description: 'Lead, manage, and strategize.', icon: <BarChart /> },
    { name: 'Arts & Humanities', description: 'Create, express, and inspire.', icon: <Palette /> },
];

export default function After12thPage() {
  const [selectedField, setSelectedField] = useState<CareerField | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CareerRoadmapOutput | null>(null);
  const { toast } = useToast();

  const handleFieldSelect = async (field: CareerField) => {
    setSelectedField(field);
    setLoading(true);
    setResults(null);
    try {
      const resultData = await careerRoadmap({ course: field, stage: '12th Completed' });
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
          Congratulations on finishing 12th grade! Now it's time to explore degree options. Choose a field below to see the opportunities.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto mb-12 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Which career field interests you?</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {careerFields.map((field) => (
            <Button
              key={field.name}
              variant={selectedField === field.name ? 'default' : 'outline'}
              onClick={() => handleFieldSelect(field.name)}
              disabled={loading}
              className="flex flex-col h-auto py-4 items-center gap-2"
            >
              {field.icon}
              <span className="font-semibold text-lg">{field.name}</span>
              <span className="text-sm font-normal text-muted-foreground">{field.description}</span>
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
              Your AI-Generated Roadmap for {selectedField}
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
