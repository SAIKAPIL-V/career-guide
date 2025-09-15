import { cn } from "@/lib/utils";

export default function EmblemLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn("h-8 w-8", className)}
      fill="currentColor"
    >
      <title>Emblem of India</title>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="none"/>
      <path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14.5c-3.58 0-6.5-2.92-6.5-6.5s2.92-6.5 6.5-6.5 6.5 2.92 6.5 6.5-2.92 6.5-6.5 6.5z" opacity=".3"/>
      <path d="M12.5 11h-1V7.5h1V11zm-2 0H9.25L9 7.5h1.5l-.25 3.5zM14.75 11l-.25-3.5H16l-.25 3.5h-1zM11.25 12.5l-1-2h2.5l-1 2zM14 10.5l-1 2h-2l-1-2h4z" />
      <path d="M12 6.5c-1.5 0-2.75 1-2.75 2.25h1.5c0-.69.56-1.25 1.25-1.25s1.25.56 1.25 1.25h1.5C14.75 7.5 13.5 6.5 12 6.5z" />
      <path d="M12 14c-1.93 0-3.5-1.57-3.5-3.5h1.5c0 1.1.9 2 2 2s2-.9 2-2h1.5c0 1.93-1.57 3.5-3.5 3.5z" />
      <path d="M12 17c-2.76 0-5-2.24-5-5h1.5c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5h1.5c0 2.76-2.24 5-5 5z" />
    </svg>
  );
}
