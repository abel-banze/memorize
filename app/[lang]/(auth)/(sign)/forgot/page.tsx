'use client'

import { useState } from "react"
import SubmitButton from "@/components/forms/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import SocialSign from "@/components/forms/social-sign"
import { forgot } from "@/actions/auth"

export default function LoginForm() {
  const [message, setMessage] = useState<string | null>(null)

  const submit = async (form: FormData) => {
    const data = {
      email: form.get('email') as string,
    }

    const promise = await forgot(data)
    setMessage(promise.message)

  }

  return (
    <form 
      className="flex flex-col gap-6" 
      action={submit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Recuperar a senha</h1>
        { message ? (
          <>
            <Alert>
              <AlertDescription>
                { message }
              </AlertDescription>
            </Alert>
          </>
        ) : (
          <>
            <p className="text-balance text-sm text-muted-foreground">
              Insira e seu email que usou para criar a sua conta
            </p>
          </>
        ) }
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="m@example.com" required />
        </div>
        
        <SubmitButton label="Recuperar" className="w-full" />

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
