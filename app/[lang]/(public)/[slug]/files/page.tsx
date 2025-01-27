import { getGalleryImages } from "@/actions/show"
import { Badge } from "@/components/ui/badge"


export default async function Files({ params } : {
    params: Promise<{ slug: string }>
}){
    const slug = (await params).slug

    const gallery = await getGalleryImages(slug)

    if(!gallery) return (
        <>
            <div className="w-full flex flex-col gap-4 p-5">
                <span>Fotos não encontradas</span>
            </div>
        </>
    )

    return (
        <>
            <div className="w-full flex flex-col gap-4 p-5">
                <div className="w-full flex flex-row items-center flex-wrap gap-2">
                    <Badge>
                        Entrada
                    </Badge>
                    <Badge variant={"outline"}>
                        Saída
                    </Badge>
                    
                </div>

                <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-2">

                    { gallery.images.map((image: any) => {
                        return (
                            <div className="w-full rounded-lg h-40 border border-slate-100 ">
                                <img src={image.url} alt="Imagem" className="w-full h-full object-cover rounded-lg" />
                            </div>
                        )
                    }) }
                    
                </div>
            </div>
        </>
    )
}