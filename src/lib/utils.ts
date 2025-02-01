import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    month: 'short',
    day: 'numeric',
  });
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'On Time':
      return 'text-green-600 bg-green-100';
    case 'Delayed':
      return 'text-red-600 bg-red-100';
    case 'Boarding':
      return 'text-blue-600 bg-blue-100';
    case 'Departed':
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}