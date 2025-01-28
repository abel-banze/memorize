import { getMyGalleries } from "@/actions/show";
import { Folders, Image, MessageSquareHeart } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const galleries = await getMyGalleries();
  
  return (
    <>
      <div className="w-full flex flex-col gap-4 p-5">
        <h1 className="text-2xl font-semibold"> Minhas galerias </h1>

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-2">
          {  galleries ? (
            galleries.map((gallery: any) => (
              <Link href={`/dashboard/${gallery.id}`} key={gallery.id} className="w-full flex item-center rounded-xl border border-slate-100 p-4 text-center hover:border-indigo-300">
                <div className="w-4/12 flex items-center justify-center">
                  <img src={gallery.cover} alt="Imagem" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="flex flex-col gap-4 p-5">
                  <h2 className="text-xl font-semibold"> { gallery.name } </h2>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Folders size={20} />
                      { gallery.folders.length } pastas
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Image size={20} />
                      { gallery.images.length.toLocaleString() } fotos
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <MessageSquareHeart size={20} />
                      { gallery.messages.length.toLocaleString() } mensagens
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : <span> Nenhuma galeria encontrada </span> }
          
        </div>
      </div>
    </>
  )
}