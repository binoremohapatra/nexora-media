import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Whitespace-respecting clamp for CSS values */
export function cssClamp(min: string, preferred: string, max: string) {
  return `clamp(${min}, ${preferred}, ${max})`;
}
