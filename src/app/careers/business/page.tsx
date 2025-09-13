import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, PiggyBank, Users } from 'lucide-react';

export default function BusinessCareersPage() {
  const careerPaths = [
    {
      icon: <PiggyBank className="h-8 w-8 text-primary" />,
      title: 'Finance',
      description: 'Roles include financial analysis, investment banking, and accounting. Strong analytical skills are key.',
      skills: ['Financial Modeling', 'Risk Management', 'Excel'],
    },
    {
      icon: <AreaChart className="h-8 w-8 text-primary" />,
      title: 'Marketing',
      description: 'Focuses on promoting and selling products or services, including market research and advertising.',
      skills: ['SEO/SEM', 'Content Creation', 'Data Analysis'],
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Human Resources',
      description: 'Manage an organization\'s employees, including recruiting, training, and employee relations.',
      skills: ['Communication', 'Conflict Resolution', 'Labor Law'],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Business & Management Careers
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Lead, innovate, and manage in the dynamic world of business.
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
