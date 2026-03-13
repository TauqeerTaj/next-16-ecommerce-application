import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      phone?: string
    }
  }

  interface User {
    id: string
    name: string
    email: string
    phone?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    phone?: string
  }
}
