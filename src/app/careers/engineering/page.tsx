import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, DraftingCompass, Cpu, Factory } from 'lucide-react';

export default function EngineeringCareersPage() {
  const careerPaths = [
    {
      icon: <Cpu className="h-8 w-8 text-primary" />,
      title: 'Software Engineering',
      description: 'Design, develop, and maintain software systems. High demand in tech hubs.',
      skills: ['Java, Python, C++', 'Data Structures', 'Algorithms'],
    },
    {
      icon: <DraftingCompass className="h-8 w-8 text-primary" />,
      title: 'Civil Engineering',
      description: 'Plan, design, and oversee construction of infrastructure projects like roads, bridges, and buildings.',
      skills: ['AutoCAD', 'Structural Analysis', 'Project Management'],
    },
    {
      icon: <Factory className="h-8 w-8 text-primary" />,
      title: 'Mechanical Engineering',
      description: 'Involves the design, production, and operation of machinery.',
      skills: ['Thermodynamics', 'CAD/CAM', 'Fluid Mechanics'],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Engineering & Technology Careers
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore the vast world of engineering and find your place in building the future.
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
