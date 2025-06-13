import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parserCourse = (course: number) => {
  if (course === 1) {
    return '1er'
  } else if (course === 2) {
    return '2do'
  } else if (course === 3) {
    return '3er'
  } else if (course === 4) {
    return '4to'
  } else if (course === 5) {
    return '5to'
  }
}

export const parserDate = (date: string | number) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Date(date).toLocaleDateString('es-ES', options)
}

export const parserAge = (date: string | number) => {
  const birthday = new Date(date)
  const ageDifMs = Date.now() - birthday.getTime()
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}
