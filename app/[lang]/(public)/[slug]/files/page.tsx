import { Badge } from "@/components/ui/badge"


export default function Files(){
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
                    <div className="w-full rounded-lg h-40 border border-slate-100 ">

                    </div>
                    <div className="w-full rounded-lg h-40 border border-slate-100 ">

                    </div>
                </div>
            </div>
        </>
    )
}