import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Insira tuas credenciais para acessar a plataforma
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu senha?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Ou continue com
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.2 0 5.9 1.1 8.1 3.2l6-6C33.7 3.1 29.2 1 24 1 14.9 1 7.3 6.6 3.9 14.4l7 5.4C12.7 13.5 17.9 9.5 24 9.5z"/>
            <path fill="#34A853" d="M46.4 24.5c0-1.6-.1-3.3-.4-4.8H24v9.2h12.7c-.6 3.1-2.4 5.7-4.9 7.4l7 5.4C43.7 37 46.4 31.2 46.4 24.5z"/>
            <path fill="#FBBC05" d="M7.9 28.6C6.8 25.7 6.8 22.4 7.9 19.4L.9 14C-1.6 19.3-1.6 26.7.9 32l7-5.4z"/>
            <path fill="#4285F4" d="M24 46c5.2 0 9.7-1.8 13-4.9l-7-5.4c-1.9 1.3-4.2 2-6.5 2-6.1 0-11.3-4.1-13.1-9.7l-7 5.4C7.3 41.4 14.9 46 24 46z"/>
            <path fill="none" d="M1.1 1.1h46.8v46.8H1.1z"/>
          </svg>

          Login com Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Não tem uma conta?
        <Link href="/register" className="underline underline-offset-4">
          Cadastrar
        </Link>
      </div>
    </form>
  )
}
