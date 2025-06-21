"use client";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default  function Home() {
  const router = useRouter();
    const {data: session} = authClient.useSession() 
    async function handleSignOut() {
       await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/login"); 
      toast.success('SignOut Successfully')// redirect to login page
    },
  },
});
    }
  return (
   <>
   <h1 className="text-2xl text-red-800">fefer</h1>
   <ThemeToggle />
    <div className="flex items-center justify-center h-screen">
        {session ? (
          <div>
            <h2>Welcome, {session.user.name}!</h2>
            <Button onClick={handleSignOut}>Sign Out</Button>
           
          </div>
        ) : (
         <Button >Login</Button>
        )}
      </div>
   </>
  );
}
