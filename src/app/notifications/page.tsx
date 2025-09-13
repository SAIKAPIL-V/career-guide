import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center">
        <Bell className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-8 font-headline text-4xl md:text-5xl font-bold text-primary">
          Notifications
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest admission dates, scholarships, and exam schedules. This page is under construction.
        </p>
      </div>
    </div>
  );
}
