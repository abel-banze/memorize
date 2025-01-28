'use client'

import SubmitButton from "@/components/forms/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { uploadFileS3 } from "@/lib/uploadToS3"
import { createGallery } from "@/actions/create"
import Swal from 'sweetalert2'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
  


export default function GalleryPage(){

    const submit = async (form: FormData) => {
        const cover = form.get('cover') as File;
        const  name = form.get('name') as string;
        const  description = form.get('description') as string;
        const visibility = form.get('visibility') as string;

        let fileName = "";

        if(cover && cover.size > 0){
            const file = await uploadFileS3(cover)
            fileName = file.file_url
        }

        const data = {
            name,
            description,
            cover: fileName,
            visibility
        }

        const promise = await createGallery(data)

        if(promise.status === 200){
            Swal.fire({
                title: 'Galeria criada com sucesso',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        }else{
            Swal.fire({
                title: 'Erro ao criar galeria',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }

    }

    return (
        <>
            <div className="W-full flex flex-col gap-4 pt-20 px-10">
                <h2 className="text-2xl font-bold">Criar galeria</h2>
                <form 
                    action={submit}
                    className="flex flex-col gap-4 max-w-lg"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" type="text" name="name" placeholder="Nome" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Input id="description" type="text" name="description" placeholder="Descrição" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cover">Imagem de capa</Label>
                        <Input id="cover" type="file" name="cover" placeholder="Imagem de capa" required />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="visibility">Visibilidade</Label>
                            <Select name="visibility" defaultValue="public">
                                <SelectTrigger>
                                    <SelectValue placeholder="Visibilidade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="private">Privado</SelectItem>
                                    <SelectItem value="public">Público</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <SubmitButton label="Criar galeria" className="w-full" />
                </form>
            </div>
        </>
    )
}