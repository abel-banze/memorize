'use client'

import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";


export default function SubmitButton({ label, className, icon, sr } : {
    label: string;
    className?: string;
    icon?: any;
    sr?: boolean
}) {
    const { pending } = useFormStatus()

    return (
        <>
            <Button type="submit" className={`flex flex-row items-center gap-4 ${className}`} disabled={pending}>
                {pending ? (
                    <>
                        <Loader className="size-4 animate-spin" />
                        <span className={sr ? 'sr-only' : ''}> { label } </span>
                    </>
                ) : (
                    <>
                        { icon }
                        <span className={sr ? 'sr-only' : ''}> { label } </span>
                    </>
                )}
            </Button>  
        </>
    )
}