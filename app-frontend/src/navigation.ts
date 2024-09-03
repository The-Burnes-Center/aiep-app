import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
import {locales, pathnames, localePrefix} from './config';

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix
  });

export const getURLWithSearchParams = (
  pathname: string,
  searchParamKey: string,
  searchParamValue: any
): string => {
  return `${pathname}?${searchParamKey}=${encodeURIComponent(searchParamValue)}`;
};