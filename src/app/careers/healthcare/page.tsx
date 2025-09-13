import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, HeartPulse, Microscope } from 'lucide-react';

export default function HealthcareCareersPage() {
    const careerPaths = [
    {
      icon: <Stethoscope className="h-8 w-8 text-primary" />,
      title: 'Doctor (MBBS)',
      description: 'Diagnose and treat illnesses and injuries. Requires extensive education and training.',
      skills: ['Medical Knowledge', 'Patient Care', 'Problem-Solving'],
    },
    {
      icon: <HeartPulse className="h-8 w-8 text-primary" />,
      title: 'Nursing',
      description: 'Provide and coordinate patient care, educate patients, and provide advice and emotional support.',
      skills: ['Empathy', 'Clinical Skills', 'Teamwork'],
    },
    {
      icon: <Microscope className="h-8 w-8 text-primary" />,
      title: 'Medical Research',
      description: 'Conduct studies to understand, diagnose, and treat diseases.',
      skills: ['Data Analysis', 'Laboratory Techniques', 'Scientific Writing'],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Healthcare & Medicine Careers
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Make a difference in people's lives through a career in healthcare.
        </p>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {careerPaths.map((path) => (
          <Card key={path.title} className="flex flex-col">
            <CardHeader className="flex-row items-center gap-4">
              {path.icon}
              <CardTitle>{path.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground mb-4">{path.description}</p>
              <h4 className="font-semibold mb-2">Key Skills:</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {path.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
