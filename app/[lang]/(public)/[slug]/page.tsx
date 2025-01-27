import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function ImagePage({ params } : {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug

  return (
    <div className="h-screen w-full fixed flex flex-col">
      <div className="relative h-screen">
        <Image src="/couple.png" alt="Main image" fill className="object-cover" />
      </div>
      <div className="absolute w-full pb-10 h-3/5 bottom-0 flex flex-row items-end pt-10 gap-x-4 justify-center bg-gradient-to-t from-white to-transparent">
        <Link
          href={`/${slug}/files`}
          passHref
        >
            <Button 
                className="w-full"
                variant="outline"
                size="lg"
            >
                Ver imagens
            </Button>
        </Link>
        <Link
          href={`/${slug}/share`}
          passHref
        >
            <Button 
                className="w-full"
                size='lg'
            >
                Partilhar imagens
            </Button>
        </Link>
      </div>
    </div>
  )
}

