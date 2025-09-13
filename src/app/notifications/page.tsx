import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, CalendarCheck } from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: 'JEE Main 2024: Application Deadline',
    date: 'March 2, 2024',
    description: 'Last day to submit your application for the Joint Entrance Examination (Main).',
  },
  {
    id: 2,
    title: 'NEET 2024: Exam Date',
    date: 'May 5, 2024',
    description: 'The National Eligibility cum Entrance Test for medical courses will be held on this day.',
  },
  {
    id: 3,
    title: 'State Scholarship Program: Application Opens',
    date: 'June 1, 2024',
    description: 'Applications for state-level merit scholarships for undergraduate students will open.',
  },
  {
    id: 4,
    title: 'Local Government College: Admission Counseling',
    date: 'July 15, 2024',
    description: 'Counseling sessions for admissions into various degree programs will begin.',
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
