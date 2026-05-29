// backoffice/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  const clientAppUrl = process.env.CLIENT_APP_URL || 'http://localhost:3000';
  
  // 1. Verificar si hay token
  if (!token) {
    console.log('❌ No hay token, redirigiendo a /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. Verificar el rol (ahora sí está en token.role)
  if (token.role !== 'admin') {
    console.warn(`⚠️ Acceso denegado: ${token.email} (rol: ${token.role})`);
    return NextResponse.redirect(new URL(`${clientAppUrl}/home`));
  }
  
  // 3. Es admin, permitir acceso
  console.log(`✅ Acceso permitido: ${token.role}`);
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!login|api|_next/static|favicon.ico).*)'],
};