import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider >
          <AppSidebar />
          <SidebarInset>
            <header className="flex items-center justify-between py-4 px-4">
              <SidebarTrigger className="block lg:hidden" />
              <Link href="/pt/dashboard/gallery/new" passHref>
                <Button>
                  Criar galeria
                </Button>
              </Link>
            </header>
            { children }
          </SidebarInset>
        </SidebarProvider>
    )
}