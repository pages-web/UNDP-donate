'use client';

import { SlidersHorizontalIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useSetAtom } from 'jotai';
import { categorySheetAtom } from '@/store';

const CategorySidebarTrigger = () => {
  const setOpen = useSetAtom(categorySheetAtom);
  return (
    <Button
      variant={'ghost'}
      className="font-semibold md:hidden"
      onClick={() => setOpen(true)}
    >
      <SlidersHorizontalIcon className="h-4 w-4 mr-1" strokeWidth={2.2} />
      List Settings
    </Button>
  );
};

export default CategorySidebarTrigger;