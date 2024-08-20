import { auth } from '@/auth';

export default auth((req) => {
  console.log(req.auth);
  if (!req.auth && req.nextUrl.pathname !== '/login') {
    const newUrl = new URL('/login', req.nextUrl.origin);
    return Response.redirect(newUrl);
  } else if (
    req.auth &&
    (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/sign-up')
  ) {
    const newUrl = new URL('/', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: [
    '/recipes/create/',
    '/recipes/my-recipes/',
    '/recipes/:id/edit',
    '/profile',
    '/login',
    '/sign-up',
  ],
};
