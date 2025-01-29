'use server'

import { DEFAULT_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import bcrypt from "bcryptjs";
import { db } from "@/actions/config";
import validator from "validator";


export async function createAccount(data: any){
    try{

        const check = await db.user.findUnique({
            where : {
                email: data.email
            }
        });

        if(check) return {message: "Já existe um utilizador com esse email.", status: 501};

        const hashPass = await bcrypt.hash(data.password, 10);

        const create = await db.user.create({
            data: {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                name: `${data.firstName} ${data.lastName}`,
                hashPass: hashPass,
            }
        });

        if(!create) return {message: "Algo correu mal. Tente novamente.", status: 501};


        await signIn('credentials', {
            email: data.email,
            password: data.password,
            edirectTo: '/pt/dashboard'
        });

        return {status: 201, message: "Success"}

        
    }catch(err){
        console.log(err)
        return {message: "Redirecting...", status: 501};
    }
}

export async function login({email, password, type, redirect} : {
    email?: string;
    password?: string;
    type: string;
    redirect?: string | null;
}){
    try{

        if(type === 'credentials'){
            if(!validator.isEmail(email!)) return { status: 501, message: 'Email inválido.' };

            const check = await db.user.findUnique({
            where: {
                email: email
            }
            });
    
            if(check?.status === 'blocked') return { status: 501, message: 'Este usuário está bloqueado.' }
            
            if(!check) return { status: 501, message: 'Usuário não encontrada.' };
    
            const isCorrect = await bcrypt.compare(
            password!,
            check.hashPass!
            );
    
            if (!isCorrect) return { status: 501, message: 'Credenciais incorrectas.' };

            await signIn(type, {
                email: email,
                password: password,
                redirectTo: '/pt/dashboard'
            })

        }else{
            await signIn(type, {
                redirectTo: '/pt/dashboard'
            })
        }

    }catch(error){
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { status: 501, message: 'Credenciais incorrectas.' };
                case "CredentialsSignin":
                    return { status: 501, message: 'Credenciais incorrectas.' };
                default:
                    return { status: 501, message: 'Algo correu mal. Tente novamente' };
            }
        }
        throw error;
    }

}