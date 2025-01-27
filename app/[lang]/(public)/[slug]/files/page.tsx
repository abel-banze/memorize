import { getGalleryImages } from "@/actions/show"
import PhotoViewer from "@/components/PhotoViewer"
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

                <h2 className="text-xl font-semibold">Fotos da galeria de {gallery.name}</h2>
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
                            <PhotoViewer key={image.id} image={image} />
                        )
                    }) }
                    
                </div>
            </div>
        </>
    )
}