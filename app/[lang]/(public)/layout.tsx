import { getLoggedUser } from "@/actions/show";
import Header from "@/components/header";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
    const user = await getLoggedUser()
    return (
        <>  
            <Header user={user} />
            { children }
        </>
    )
}