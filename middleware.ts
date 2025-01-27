import { auth } from "./auth";
import { NextResponse, NextRequest } from "next/server";
import { AUTH_ROUTES, DEFAULT_REDIRECT, locales } from "./routes";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');

  if (acceptLanguage) {
    const acceptedLanguages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim());
    for (const locale of acceptedLanguages) {
      if (locales.includes(locale)) {
        return locale;
      }
    }
  }

  return 'pt';
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(req);
    req.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(req.nextUrl);
  }

  const isLogged = !!req.auth;
  const currentRoute = req.nextUrl.pathname;
  const locale = currentRoute.split('/')[1];

  // Normaliza o caminho removendo o idioma
  const normalizedPath = currentRoute.replace(`/${locale}`, '');

  // Verifica se a rota contém 'dashboard'
  const isDashboardRoute = normalizedPath.includes('dashboard');

  // Verifica se é uma rota de autenticação
  const isAuthRoute = AUTH_ROUTES.some(route => normalizedPath === route.replace(`/${locale}`, ''));

  // Se o usuário não está logado e tenta acessar uma rota de dashboard
  if (!isLogged && isDashboardRoute) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  // Se o usuário está logado e tenta acessar uma rota de autenticação
  if (isLogged && isAuthRoute) {
    return NextResponse.redirect(new URL(`/${locale}${DEFAULT_REDIRECT}`, req.url));
  }

  // Permite acesso a todas as outras rotas
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.jpg|.*\\.jpeg|.*\\.png).*)"],
};