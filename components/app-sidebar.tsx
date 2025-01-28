"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings,
  Images,
  Folders,
  MessageSquareHeart,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Galerias",
      url: "#",
      icon: Images,
      isActive: true,
      items: [
        {
          title: "Todas galerias",
          url: "/dashboard",
        },
        {
          title: "Criar galeria",
          url: "/dashboard/gallery/new",
        }
        
      ],
    },
    {
      title: "Pastas",
      url: "#",
      icon: Folders,
      items: [
        {
          title: "Todas pastas",
          url: "#",
        },
        {
          title: "Criar pasta",
          url: "#",
        },
      ],
    },
    {
      title: "Mensagens",
      url: "/dashboard/messages",
      icon: MessageSquareHeart,
      items: [
        {
          title: "Todas as mensagens",
          url: "/dashboard/messages",
        },
      ],
    },
    {
      title: "Definições",
      url: "/dashboard/settings",
      icon: Settings,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
