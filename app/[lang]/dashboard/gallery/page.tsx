import SubmitButton from "@/components/forms/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function GalleryPage() {
    return (
        <>
            <div className="W-full flex flex-col gap-4 p-5 px-10">
                <form 
                    action=""
                    className="flex flex-col gap-4 max-w-2xl"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" type="text" placeholder="Nome" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Input id="description" type="text" placeholder="Descrição" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cover">Imagem de capa</Label>
                        <Input id="cover" type="text" placeholder="Imagem de capa" required />
                    </div>
                    <SubmitButton label="Criar galeria" className="w-full" />
                </form>
            </div>
        </>
    )
}