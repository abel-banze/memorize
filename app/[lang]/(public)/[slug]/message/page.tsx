'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/forms/submit-button";
import { useParams } from "next/navigation";
import Swal from "sweetalert2"
import { createMessage } from "@/actions/create";

export default function Message(){
    const params = useParams<{slug: string}>();

    const submit = async (form: FormData) => {
        const data = {
            name: form.get('name') as string,
            content: form.get('content') as string,
            gallery: params.slug
        }

        const promise = await createMessage(data)

        if(promise.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Mensagem enviada.',
                text: 'Sua mensagem foi enviada com sucesso. Obrigado por partilhar connosco este momento íncrivel.'
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Algo correu mal.',
                text: 'Por favor, tente novamente!'
            })
        }
    }

    return (
        <>
            <div className="w-full flex flex-col gap-4 px-10 pt-20 mx-auto">
                <h2 className="text-xl font-semibold">Deixe uma mensagem</h2>

                <form 
                    action={submit}
                    className="flex flex-col gap-4 max-w-lg"
                >   
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input type="text" name="name" id="name" placeholder="Nome" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">Sua mensagem</Label>
                        <Textarea name="content" id="content" className="h-40" placeholder="Escreva aqui a sua mensagem...." required />
                    </div>
                    
                    <SubmitButton label="Enviar" className="w-full" />
                </form>
            </div>
        </>
    )
}