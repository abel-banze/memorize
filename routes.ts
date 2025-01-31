const locales = ['pt', 'en'];

export const PUBLIC_ROUTES = [
    '/en/logo-02.png',
    '/en/promo-1.jpg',
    '/en/promo-2.jpg',
    '/pt/pricing',
    '/en/pricing'
]


export const AUTH_ROUTES = locales.flatMap(locale => [
  `/${locale}/login`,
  `/${locale}/register`,
  `/${locale}/forgot`,
  `/${locale}/recover`,
  `/${locale}/auth/error`
]);

export const DEFAULT_REDIRECT = '/pt';

export { locales };