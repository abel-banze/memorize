'use client'

import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useState } from "react"
import { Loader } from "lucide-react";



export default function SocialSign(){
    const [loading, setLoading] = useState(false)

    const signWithGoogle = async () => {
        setLoading(true)
        await login({type: 'google'})
    }

    const signWithGithub = async () => {
       await login({type: 'github'})
    }

    const signWithLinkedin = async () => {
        await login({type: 'linkedin'})
    }
    
    return (
            <>
                <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={signWithGoogle}
                >   
                    { loading ? (
                        <Loader className="h-5 w-5 animate-spin" />
                    ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.2 0 5.9 1.1 8.1 3.2l6-6C33.7 3.1 29.2 1 24 1 14.9 1 7.3 6.6 3.9 14.4l7 5.4C12.7 13.5 17.9 9.5 24 9.5z"/>
                        <path fill="#34A853" d="M46.4 24.5c0-1.6-.1-3.3-.4-4.8H24v9.2h12.7c-.6 3.1-2.4 5.7-4.9 7.4l7 5.4C43.7 37 46.4 31.2 46.4 24.5z"/>
                        <path fill="#FBBC05" d="M7.9 28.6C6.8 25.7 6.8 22.4 7.9 19.4L.9 14C-1.6 19.3-1.6 26.7.9 32l7-5.4z"/>
                        <path fill="#4285F4" d="M24 46c5.2 0 9.7-1.8 13-4.9l-7-5.4c-1.9 1.3-4.2 2-6.5 2-6.1 0-11.3-4.1-13.1-9.7l-7 5.4C7.3 41.4 14.9 46 24 46z"/>
                        <path fill="none" d="M1.1 1.1h46.8v46.8H1.1z"/>
                    </svg>
                    )}
                    Entrar com Google
                </Button>
            </>
        )
}