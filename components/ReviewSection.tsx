'use client';

import { ReactNode } from 'react';

interface ReviewSectionProps {
  title: string;
  children: ReactNode;
}

export function ReviewSection({ title, children }: ReviewSectionProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-lg">{title}</h3>
      <div className="text-sm text-muted-foreground space-y-1">
        {children}
      </div>
    </div>
  );
}