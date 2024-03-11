'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { ICategory } from '@/types/products.types';
import Link from 'next/link';
import { useState, PropsWithChildren } from 'react';

export function CategoryNav({
  categories,
  primaryCategories
}: {
  categories: ICategory[];
  primaryCategories: ICategory[];
}) {
  const [activeCat, setActiveCat] = useState<string | undefined>();

  const getChildren = (parentId: string) =>
    categories.filter(c => c.parentId === parentId);

  const onLinkClick = () => setActiveCat(undefined);

  return (
    <NavigationMenu
      className="-mx-4 flex-auto max-w-screen-2xl justify-start"
      value={activeCat}
      onValueChange={setActiveCat}
    >
      <NavigationMenuList>
        {(primaryCategories || []).map(({ _id, name, order }) => (
          <NavigationMenuItem key={_id} value={_id}>
            <NavigationMenuTrigger>{name}</NavigationMenuTrigger>
            <NavigationMenuContent className="md:w-full">
              <div className="p-4 text-sm">
                <LinkItem
                  order={order}
                  className="font-normal"
                  onClick={onLinkClick}
                >
                  {name} <ChevronRight className="h-4 w-4 ml-1" />
                </LinkItem>
                <ul className="grid grid-cols-4 w-full">
                  {getChildren(_id).map(cat => (
                    <li key={cat._id}>
                      <h4 className="font-medium py-1 px-4">{cat.name}</h4>
                      {getChildren(cat._id).map(c => (
                        <LinkItem
                          className="flex h-7 font-normal"
                          key={c._id}
                          order={c.order}
                          onClick={onLinkClick}
                        >
                          {c.name}
                        </LinkItem>
                      ))}
                      <LinkItem
                        className="flex h-7 font-normal"
                        order={cat.order}
                        onClick={onLinkClick}
                      >
                        All {cat.name}
                      </LinkItem>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const LinkItem = ({
  onClick,
  children,
  order,
  className
}: React.PropsWithChildren & {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  order: string;
  className: string;
}) => (
  <Button variant="link" className={className} asChild>
    <Link
      href={{ pathname: '/category', query: { order: order } }}
      onClick={onClick}
    >
      {children}
    </Link>
  </Button>
);