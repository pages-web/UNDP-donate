import { cn } from '@/lib/utils';
import Link from 'next/link';

export function NavbarTop({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) {
  return (
    <header
      className={cn(
        'h-14 md:h-20 flex z-50 md:sticky md:-top-5 md:pt-2.5 md:shadow-md',
        'bg-primary text-white'
      )}
      {...rest}
    >
      <div className="flex gap-[clamp(1rem,3vw,3rem)] items-center w-full md:h-[60px] py-6 sticky top-0 container">
        <Link
          href="/"
          aria-label="SF Homepage"
          className="h-6 md:h-7 -mt-1.5 text-2xl"
        >
          LOGO
        </Link>
        {children}
      </div>
    </header>
  );
}