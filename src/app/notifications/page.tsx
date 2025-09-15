import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, CalendarCheck } from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: 'JEE Main 2025: Application Deadline',
    date: 'March 2, 2025',
    description: 'Last day to submit your application for the Joint Entrance Examination (Main).',
  },
  {
    id: 2,
    title: 'NEET 2025: Exam Date',
    date: 'May 5, 2025',
    description: 'The National Eligibility cum Entrance Test for medical courses will be held on this day.',
  },
  {
    id: 3,
    title: 'State Scholarship Program 2025: Application Opens',
    date: 'June 1, 2025',
    description: 'Applications for state-level merit scholarships for undergraduate students will open.',
  },
  {
    id: 4,
    title: 'Local Government College: Admission Counseling 2025',
    date: 'July 15, 2025',
    description: 'Counseling sessions for admissions into various degree programs will begin.',
  },
  {
    id: 5,
    title: 'GATE 2026: Registration Starts',
    date: 'August 30, 2025',
    description: 'Registration for the Graduate Aptitude Test in Engineering (GATE) 2026 begins.',
  },
  {
    id: 6,
    title: 'UPSC Civil Services 2026: Prelims Exam',
    date: 'June 5, 2026',
    description: 'The preliminary examination for the UPSC Civil Services will be conducted.',
  },
];


export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <Bell className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-8 font-headline text-4xl md:text-5xl font-bold text-primary">
          Timeline Tracker
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest admission dates, scholarships, and exam schedules.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines & Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full mt-1">
                        <CalendarCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">{notification.title}</h3>
                        <p className="text-sm font-bold text-primary">{notification.date}</p>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
