import { SidebarNav } from '@/components/sidebar-nav/sidebar-nav';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';

const ProfileLayout = ({
  children,
  title,
  description,
}: React.PropsWithChildren & { title: string; description: string }) => {
  return (
    <div className="space-y-6 pt-6 md:pt-10 pb-16 container">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-10 lg:space-y-0">
        <aside className="lg:w-1/5 overflow-auto">
          <Suspense>
            <SidebarNav items={sidebarNavItems} />
          </Suspense>
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/profile',
  },
  {
    title: 'Orders',
    href: '/profile/orders',
  },
  {
    title: 'Wishlist',
    href: '/profile/wishlist',
  },
  {
    title: 'Viewed',
    href: '/profile/viewed',
  },
  {
    title: 'Log out',
    href: '/logout',
  },
];

export default ProfileLayout;