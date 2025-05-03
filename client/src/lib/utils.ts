import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a string
 * @param date The date to format
 * @param options Formatting options
 * @returns The formatted date string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  const d = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat("en-US", options).format(d);
}

/**
 * Truncate a string to a specified length
 * @param str The string to truncate
 * @param length The maximum length
 * @returns The truncated string
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

/**
 * Get an object containing valid pagination information
 * @param total Total number of items
 * @param currentPage Current page number
 * @param pageSize Number of items per page
 * @returns Pagination info object
 */
export function getPaginationInfo(
  total: number,
  currentPage: number = 1,
  pageSize: number = 9
) {
  const totalPages = Math.ceil(total / pageSize);
  const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));
  
  const startIndex = (validCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  
  return {
    totalPages,
    currentPage: validCurrentPage,
    pageSize,
    startIndex,
    endIndex,
    hasNextPage: validCurrentPage < totalPages,
    hasPrevPage: validCurrentPage > 1,
    showingFrom: total === 0 ? 0 : startIndex + 1,
    showingTo: endIndex,
    total
  };
}

/**
 * Format a file size to a human-readable string
 * @param bytes File size in bytes
 * @returns Formatted file size string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Calculate a human-readable time ago string
 * @param date Date to calculate from
 * @returns Time ago string
 */
export function timeAgo(date: Date | string): string {
  const d = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
}

/**
 * Generate profile initials from a name
 * @param name Full name
 * @returns Initials (up to 2 characters)
 */
export function getInitials(name: string): string {
  if (!name) return '';
  
  const parts = name.split(' ').filter(part => part.length > 0);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Generate a random avatar URL
 * @param name Name to use for the avatar
 * @returns URL to the avatar image
 */
export function generateAvatarUrl(name: string): string {
  const initials = getInitials(name);
  const colors = [
    "264653", "2a9d8f", "e9c46a", "f4a261", "e76f51",
    "277da1", "577590", "4d908e", "43aa8b", "90be6d"
  ];
  const colorIndex = Math.abs(name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
  
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${colors[colorIndex]}&color=fff&size=100`;
}
