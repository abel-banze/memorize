import { auth } from "./auth";
import { NextResponse, NextRequest } from "next/server";
import { PUBLIC_ROUTES, AUTH_ROUTES, DEFAULT_REDIRECT, locales } from "./routes";

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

  // Verifica se a rota é pública ou de autenticação
  const isPublicRoute = PUBLIC_ROUTES.some(route => normalizedPath === route.replace(`/${locale}`, ''));
  const isAuthRoute = AUTH_ROUTES.some(route => normalizedPath === route.replace(`/${locale}`, ''));

  // Se o usuário não está logado e tenta acessar uma rota privada
  if (!isLogged && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  // Se o usuário está logado e tenta acessar uma rota de autenticação
  if (isLogged && isAuthRoute) {
    return NextResponse.redirect(new URL('/pt', req.url));
  }

  // Permitir acesso às rotas públicas e de autenticação para usuários não logados
  if (isPublicRoute || (!isLogged && isAuthRoute)) {
    return NextResponse.next();
  }

  // Para usuários logados, permitir acesso a todas as rotas não autenticadas
  if (isLogged) {
    return NextResponse.next();
  }

  // Se nenhuma das condições acima for atendida, redireciona para login
  return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
});


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.jpg ||.*\\.jpeg |.*\\.png ).*)"],
};