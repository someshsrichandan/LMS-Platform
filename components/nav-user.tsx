"use client"

import {
  IconBrandParsinta,
  IconDotsVertical,
  IconLogout,
  IconDashboard,
  IconHomeFilled,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { useSignOut } from "@/hooks/use-signout"



export function NavUser() {
  const { isMobile } = useSidebar();
  
  const handleSignOut = useSignOut();
  
  const{data:session , isPending} = authClient.useSession();
  
  if(isPending){
    return null;
    
  }
  
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="w-8 h-8 rounded-lg grayscale">
                <AvatarImage src={session?.user.image ?? 'https://avatar.vercel.sh/rauchg'} alt={session?.user.name} />
                <AvatarFallback className="rounded-lg">
                  {
                    session?.user.name && session?.user.name.length > 0 ?
                    session.user.name.charAt(0).toUpperCase() :
                    session?.user.email.charAt(0).toUpperCase()
                  }
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-sm leading-tight text-left">
                <span className="font-medium truncate">
                  {
                    session?.user.name && session?.user.name.length > 0 ?
                    session.user.name :
                    session?.user.email.split('@')[0]
                  }
                </span>
                <span className="text-xs truncate text-muted-foreground">
                  {
                    session?.user.email
                  }
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="w-8 h-8 rounded-lg">
                  <AvatarImage src={session?.user.image ?? 'https://avatar.vercel.sh/rauchg'} alt={session?.user.name}  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-sm leading-tight text-left">
                  <span className="font-medium truncate">
                    {
                    session?.user.name && session?.user.name.length > 0 ?
                    session.user.name :
                    session?.user.email.split('@')[0]
                  }
                  </span>
                  <span className="text-xs truncate text-muted-foreground">
                    {
                    session?.user.email
                  }
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href='/'>
                <IconHomeFilled />
                Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/admin'>
                <IconDashboard />
                Dashboard
                </Link>
              </DropdownMenuItem>
             <DropdownMenuItem asChild>
                <Link href='/admin/courses'>
                <IconBrandParsinta />
                Courses
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
