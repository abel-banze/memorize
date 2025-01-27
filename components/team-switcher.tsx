"use client"

import * as React from "react"
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"



export function TeamSwitcher() {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-2 px-5"> 
          <h2>Memorize</h2>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
