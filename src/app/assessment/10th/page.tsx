'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const questions = [
  {
    question: 'Which subject do you enjoy the most?',
    options: ['Mathematics', 'Science', 'Social Studies', 'Languages'],
  },
  {
    question: 'Are you more interested in theoretical concepts or practical applications?',
    options: ['Theoretical concepts', 'Practical applications', 'A balance of both'],
  },
  {
    question: 'What kind of activities do you prefer?',
    options: ['Building things', 'Solving puzzles', 'Understanding living things', 'Creative writing'],
  },
  {
    question: 'Which of these career fields sounds most appealing?',
    options: ['Engineering / Technology', 'Medicine / Healthcare', 'Business / Commerce', 'Arts / Design'],
  },
    {
    question: 'How do you feel about subjects that require a lot of calculation?',
    options: ['I love them', 'I can manage them', 'I prefer to avoid them'],
  },
];

export default function Assessment10thPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedOption) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedOption;
      setAnswers(newAnswers);
      setSelectedOption(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        localStorage.setItem('assessmentType', '10th');
        localStorage.setItem('assessmentAnswers', JSON.stringify(newAnswers));
        router.push('/assessment/results');
      }
    }
  };

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
  };
  
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-headline">10th Grade Assessment</CardTitle>
            <CardDescription className="text-center">
              Question {currentQuestion + 1} of {questions.length}
            </CardDescription>
             <Progress value={progress} className="w-full mt-4" />
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-semibold mb-8">{questions[currentQuestion].question}</h2>
              <RadioGroup
                onValueChange={handleRadioChange}
                value={selectedOption || ''}
                className="flex flex-col space-y-4 items-start mx-auto max-w-md mb-8"
              >
                {questions[currentQuestion].options.map((option) => (
                  <div key={option} className="flex items-center space-x-3">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="text-lg">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
              <Button onClick={handleNext} disabled={!selectedOption} size="lg">
                {currentQuestion < questions.length - 1 ? 'Next' : 'Finish Assessment'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
