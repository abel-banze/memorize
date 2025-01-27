'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Download } from "lucide-react"


  
export default function PhotoViewer({ image } : { image: any}){
    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <div key={image.id} className="w-full rounded-lg h-40 border border-slate-100 ">
                        <img src={image.url} alt="Imagem" className="w-full h-full object-cover rounded-lg" />
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle> <Download /> </DialogTitle>
                    <DialogDescription>
                        <img src={image.url} alt="Imagem" className="w-full max-h-4/5 object-cover rounded-lg" />
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>
    )
}