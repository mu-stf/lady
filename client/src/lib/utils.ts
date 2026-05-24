import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ar-IQ-u-nu-latn", {
    style: "currency",
    currency: "IQD",
    maximumFractionDigits: 0,
  }).format(price);
};
