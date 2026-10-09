import React from 'react';
import { cn } from '../../lib/utils';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

/** Small uppercase editorial label (eyebrow) */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span className={cn('eyebrow', className)} aria-hidden="false">
      {children}
    </span>
  );
}
