'use server'

import { db } from "@/actions/config";
import { revalidatePath } from "next/cache";
import { getGalleryById, getLoggedUser } from "../show";


export async function createGallery(data: any){
    try{

        const user = await getLoggedUser();
        if(!user) return { status: 401, message: "Usuário não logado" };

        const code = await generateRandomCode();

        const promise = await db.gallery.create({
            data: {
                name: data.name,
                description: data.description,
                cover: data.cover,
                code,
                visibility: data.visibility,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        });

        revalidatePath('/[lang]', 'layout')

        return { status: 200, message: "success" }

    }catch(err){
        console.log(err)
        return { status: 500, message: "Erro ao criar galeria" }
    }
}

async function generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code;
}

export async function createImage(data: any){
    try{

        const user = await getLoggedUser();
        if(!user) return { status: 401, message: "Usuário não logado" };

        const gallery = await db.gallery.findFirst({
            where: {
                code: data.gallery
            }
        });

        if(!gallery) return { status: 404, message: "Galeria não encontrada" };

        const promise = await db.image.create({
            data: {
                url: data.url,
                gallery: {
                    connect: {
                        id: gallery.id
                    }
                }
            }
        });

        revalidatePath('/[lang]', 'layout')

        return { status: 200, message: "success" }

    }catch(err){
        console.log(err)
        return { status: 500, message: "Erro ao criar imagem" }
    }
}

export async function createMessage(data: any){
    try{

        const gallery = await getGalleryById(data.gallery)

        if(!gallery) return { status: 404, message: 'failed' }

        const message = await db.message.create({
            data: {
                name: data.name,
                content: data.content,
                gallery: {
                    connect: {
                        id: gallery.id
                    }
                }
            }
        });

        if(!message) return { status: 500, message: 'failed' }

        return { status: 200, message: 'success' }

    }catch(err){
        return { status: 500, message: 'failed' }
    }
}