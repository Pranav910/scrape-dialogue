import { LayoutDashboard, MessageSquare, BarChart3, Settings } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Interactions", url: "/interactions", icon: MessageSquare },
  { title: "Metrics", url: "/metrics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50"

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>AI Agent Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}