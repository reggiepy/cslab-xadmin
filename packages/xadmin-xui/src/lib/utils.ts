import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { _t } from "xadmin-i18n"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export { _t }

