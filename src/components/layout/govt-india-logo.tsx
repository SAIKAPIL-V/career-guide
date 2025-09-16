import { cn } from "@/lib/utils";

export default function GovtIndiaLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("h-8 w-8", className)}
      fill="#FF9933"
    >
      <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" fill="#FFFFFF" stroke="#000080" strokeWidth="2"/>
      <circle cx="50" cy="50" r="10" fill="#000080"/>
      <circle cx="50" cy="50" r="8" fill="#FFFFFF"/>
      <path d="M50 42 L50 58" stroke="#000080" strokeWidth="1"/>
      <path d="M42 50 L58 50" stroke="#000080" strokeWidth="1"/>
      <path d="M44 44 L56 56" stroke="#000080" strokeWidth="1"/>
      <path d="M44 56 L56 44" stroke="#000080" strokeWidth="1"/>
    </svg>
  );
}
