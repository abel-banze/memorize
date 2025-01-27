'use server'

import { db } from "@/actions/config";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";


export async function deletePost(id: string){
    try{

        // delete associated files
        await db.file.deleteMany({
            where: {
                postId: id
            }
        });


        // delete associated comments
        await db.comment.deleteMany({
            where: {
                postId: id
            }
        });

        // delete associated likes
        await db.postLike.deleteMany({
            where: {
                postId: id
            }
        });

        // delete associated shares
        await db.share.deleteMany({
            where: {
                postId: id
            }
        });

        await db.post.delete({
            where: {
                id
            }
        });



        revalidatePath('/(root)', 'layout')

        return { status: 201, message: "Publicação excluída com sucesso" };

    }catch(err){
        console.log(err)
        return { status: 501, message: "Erro ao excluir publicação" };
    }
}