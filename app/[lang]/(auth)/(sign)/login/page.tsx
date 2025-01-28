'use client'

import { useState } from "react"
import { login } from "@/actions/auth"
import SubmitButton from "@/components/forms/submit-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CircleX } from "lucide-react"
import SocialSign from "@/components/forms/social-sign"


export default function LoginForm() {
  const [message, setMessage] = useState<string | null>(null)

  const submit = async (form: FormData) => {
    const data = {
      email: form.get('email') as string,
      password: form.get('password') as string,
      type: 'credentials'
    }

    const promise = await login(data)

    if(promise?.status !== 201 && promise !== undefined) setMessage(promise.message)

  }

  return (
    <form 
      className="flex flex-col gap-6" 
      action={submit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        { message ? (
          <>
            <Alert>
              <CircleX className="h-4 w-4" />
              <AlertTitle>Upps!</AlertTitle>
              <AlertDescription>
                { message }
              </AlertDescription>
            </Alert>

          </>
        ) : (
          <>
            <p className="text-balance text-sm text-muted-foreground">
              Insira tuas credenciais para acessar a plataforma
            </p>
          </>
        ) }
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="m@example.com" required />
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
          <Input id="password" name="password" type="password" required />
        </div>
        <SubmitButton label="login" className="w-full" />

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Ou continue com
          </span>
        </div>
        <SocialSign />
      </div>
      <div className="text-center text-sm">
        Não tem uma conta? 
        <Link href="/pt/register" className="underline underline-offset-4 ml-2">
          Cadastrar
        </Link>
      </div>
    </form>
  )
}
