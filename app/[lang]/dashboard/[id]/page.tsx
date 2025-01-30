import InputCopy from "@/components/ui/input-copy"
import LinkQRCode from "@/components/ui/link-qrcode"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function GalleryDetailsPage({ params } : {
    params: Promise<{ id: string }>
}){

    const id = (await params).id

    return (
        <>
            <div className="w-full flex flex-col gap-5 px-5">
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="account">QR code & Link</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <div className="flex flex-col gap-4">
                            <InputCopy url={`https://memorize.space/pt/${id}`} />
                            <LinkQRCode url={`https://memorize.space/pt/${id}`} />
                        </div>
                    </TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent>
                </Tabs>
            </div>
        </>
    )
}