import { cn } from "@/lib/utils";

export default function EmblemLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 44 54"
      className={cn("h-8 w-8", className)}
      fill="currentColor"
    >
        <path d="M22 6.5C11.8 6.5 3.5 14.8 3.5 25c0 10.2 8.3 18.5 18.5 18.5S40.5 35.2 40.5 25C40.5 14.8 32.2 6.5 22 6.5zM22 39.5c-8 0-14.5-6.5-14.5-14.5S14 10.5 22 10.5 36.5 17 36.5 25 30 39.5 22 39.5z" />
        <path d="M22 0C9.9 0 0 9.9 0 22s9.9 22 22 22 22-9.9 22-22S34.1 0 22 0zm0 40C12.1 40 4 31.9 4 22S12.1 4 22 4s18 8.1 18 18-8.1 18-18 18z" />
        <path d="M29.5 25h-15c-0.6 0-1-0.4-1-1v-2c0-0.6 0.4-1 1-1h15c0.6 0 1 0.4 1 1v2C30.5 24.6 30.1 25 29.5 25z" />
        <path d="M22 31c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4S24.2 31 22 31z" />
        <path d_in="M12,54h20c1.1,0,2-0.9,2-2l0-17H10l0,17C10,53.1,10.9,54,12,54z" />
        <path d="M12 54h20c1.1 0 2-.9 2-2V35H10v17c0 1.1.9 2 2 2zM15 40h14v2H15zM15 44h14v2H15zM15 48h14v2H15z" />
    </svg>
  );
}
