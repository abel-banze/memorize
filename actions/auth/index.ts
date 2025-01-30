'use server'

import { DEFAULT_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import bcrypt from "bcryptjs";
import { db } from "@/actions/config";
import validator from "validator";
import { WelcomeEmail } from "@/actions/email/templates/welcome";
import { sendMail } from "@/actions/email";
import { render } from '@react-email/components';
import { ResetPasswordEmail } from "@/actions/email/templates/reset-password";


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

        // send welcome email

        const emailHtml = await render(WelcomeEmail({ userFirstname: data.firstName }));

        await sendMail({
            to: data.email,
            subject: 'Bem-vindo ao Memorize',
            html: emailHtml
        });

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

export async function forgot(data: any){
    try{

        const user = await db.user.findUnique({
            where: {
                email: data.email
            }
        });

        if(!user) return { status: 404, message: 'Nenhum usuário encontrado com esse email.' };

        const token = await bcrypt.hash(user.id, 10);

        // send reset password email
        const emailHtml = await render(ResetPasswordEmail({ userFirstname: user.firstName!, resetPasswordLink: `https://memorize.space/forgot/${token}` }));

        return { status: 200, message: 'Enviamos um email para você com um link para redefinir sua senha.' }


    }catch(err){
        return { status: 500, message: 'failed' }
    }
}