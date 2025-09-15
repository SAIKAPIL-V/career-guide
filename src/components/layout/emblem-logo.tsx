import { cn } from "@/lib/utils";

export default function EmblemLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 70"
      className={cn("h-8 w-8", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M25 68.5C38.5 68.5 49.5 57.5 49.5 44C49.5 30.5 38.5 19.5 25 19.5C11.5 19.5 0.5 30.5 0.5 44C0.5 57.5 11.5 68.5 25 68.5Z"
        strokeMiterlimit="10"
      />
      <path d="M25 21V4.5" strokeMiterlimit="10" strokeLinecap="round" />
      <path d="M3.5 44H46.5" strokeMiterlimit="10" strokeLinecap="round" />
      <path d="M25 44V67" strokeMiterlimit="10" strokeLinecap="round" />
      <path
        d="M41.5 55C41.5 59.14 34.14 62.5 25 62.5C15.86 62.5 8.5 59.14 8.5 55"
        strokeMiterlimit="10"
      />
      <path
        d="M21 21L19 1C19 1 18.5 4 19.5 5C20.5 6 21 7 21 7"
        strokeMiterlimit="10"
      />
      <path
        d="M29 21L31 1C31 1 31.5 4 30.5 5C29.5 6 29 7 29 7"
        strokeMiterlimit="10"
      />
      <path d="M12.5 11.5L25 18L37.5 11.5" strokeMiterlimit="10" />
      <path
        d="M17 10L14.5 9.5C14.5 9.5 14 11 15 12C16 13 17 12 17 12"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M33 10L35.5 9.5C35.5 9.5 36 11 35 12C34 13 33 12 33 12"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M25 18C27.21 18 29 16.21 29 14C29 11.79 27.21 10 25 10C22.79 10 21 11.79 21 14C21 16.21 22.79 18 25 18Z"
        strokeMiterlimit="10"
      />
      <path d="M23 14H27" strokeMiterlimit="10" strokeLinecap="round" />
      <path d="M25 12V16" strokeMiterlimit="10" strokeLinecap="round" />
    </svg>
  );
}
