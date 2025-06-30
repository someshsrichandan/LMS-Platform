"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { Separator } from "@/components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, BookOpen, LayoutDashboard, User, LogOut, ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { authClient } from '@/lib/auth-client';
import { useSignOut } from "@/hooks/use-signout";

export default function Navbar() {

  const { data: session, isPending } = authClient.useSession();
  const handleSignOut = useSignOut();
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "container mx-auto px-6 py-4 flex items-center justify-between",
        "bg-background/80 backdrop-blur-md shadow-md rounded-[--radius] font-serif"
      )}
    >
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="font-sans text-3xl font-bold text-primary">LMS Platform</h1>
            <Badge className="bg-accent text-accent-foreground animate-pulse">NEW</Badge>
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Link href="/" className="flex items-center gap-2 transition-colors text-foreground hover:text-primary">
              <Home size={20} />
              Home
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Link href="/courses" className="flex items-center gap-2 transition-colors text-foreground hover:text-primary">
              <BookOpen size={20} />
              Courses
            </Link>
          </motion.div>
          {session && (
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Link href="/admin" className="flex items-center gap-2 transition-colors text-foreground hover:text-primary">
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
            </motion.div>
          )}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Separator orientation="vertical" className="h-6 bg-border" />
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-auto p-2 hover:bg-accent hover:text-accent-foreground rounded-[--radius]"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={session.user?.image || "/avatar.jpg"} alt="Profile image" />
                  <AvatarFallback>
                    {session.user?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <ChevronDownIcon size={16} className="ml-1 opacity-60" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-card/95 text-card-foreground backdrop-blur-sm border-border rounded-[--radius] shadow-md"
            >
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-sans font-medium">{session.user?.name || "User"}</span>
                <span className="text-sm text-muted-foreground">
                  {session.user?.email || "user@example.com"}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-2">
                  <User size={16} />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2">
                <LogOut size={16} />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="outline"
            asChild
            className="border-border text-primary hover:bg-accent hover:text-accent-foreground transition-transform transform hover:scale-105 rounded-[--radius] shadow-md font-sans"
          >
            <Link href="/login">Sign In</Link>
          </Button>
        )}
      </div>
    </motion.header>
  );
}