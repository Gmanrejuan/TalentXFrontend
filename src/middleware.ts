import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Define protected routes
        const protectedPaths = ['/dashboard', '/profile', '/settings']
        const { pathname } = req.nextUrl
        
        // Check if the current path is protected
        const isProtectedRoute = protectedPaths.some(path => 
          pathname.startsWith(path)
        )
        
        // Allow access if not a protected route or if user is authenticated
        return !isProtectedRoute || !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    // Add other protected routes here
  ]
}