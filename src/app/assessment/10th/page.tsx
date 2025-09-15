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
    question: 'What kind of activities do you enjoy outside of school?',
    options: ['Building things with blocks or tools', 'Solving puzzles or playing strategy games', 'Helping others or volunteering', 'Drawing, painting, or making music'],
  },
  {
    question: 'If you could invent anything, what would it be?',
    options: ['A robot that does chores', 'A new type of video game', 'A way to solve world hunger', 'A beautiful piece of art'],
  },
  {
    question: 'How do you prefer to learn new things?',
    options: ['By reading books and articles', 'By watching videos and documentaries', 'By doing hands-on experiments', 'By discussing with others'],
  },
  {
    question: 'What kind of problems do you enjoy solving?',
    options: ['Logical puzzles with clear answers', 'Complex problems with no single right answer', 'Helping people resolve their issues', 'Creating something new and original'],
  },
  {
    question: 'Which of these sounds like a fun weekend project?',
    options: ['Building a model airplane', 'Writing a short story or poem', 'Organizing a charity event', 'Conducting a science experiment'],
  },
  {
    question: 'What is more important to you in a future job?',
    options: ['A high salary', 'Helping society', 'Being creative', 'Solving challenging problems'],
  },
  {
    question: 'Which work environment sounds most appealing?',
    options: ['A busy office', 'A quiet library or research lab', 'An art studio or workshop', 'Outdoors, working with nature'],
  },
  {
    question: 'How do you feel about working with numbers and data?',
    options: ['I love it', 'I can do it if needed', 'I prefer to avoid it'],
  },
  {
    question: 'When faced with a difficult task, what do you do first?',
    options: ['Break it down into smaller steps', 'Ask for help from a friend or teacher', 'Try different approaches until one works', 'Think about the big picture and overall goal'],
  }
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
      

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        const finalAnswers = [...newAnswers]; 
        localStorage.setItem('assessmentType', '10th');
        localStorage.setItem('assessmentAnswers', JSON.stringify(finalAnswers));
        router.push('/dashboard');
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
                {currentQuestion < questions.length - 1 ? 'Next' : 'Finish & See Dashboard'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
