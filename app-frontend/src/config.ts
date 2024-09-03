import {Pathnames} from 'next-intl/navigation';

export const localeNames = {en: 'English', es: 'Español', tl: 'Tagalog', zh: '中文'} as const;
export const locales = Object.keys(localeNames);
export const languageSelectionButtonText = {en: 'Language', es: 'Idioma', tl: 'Wika', zh: '语言'} as const;
export const languageSelectionLabels = {en: 'Choose Your Language', es: 'Elige tu idioma', tl: 'Piliin ang Iyong Wika', zh: '请选择你的语言'} as const;
export const pathnames = {
  '/': '/',
} satisfies Pathnames<typeof locales>;

export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
