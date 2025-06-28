
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";



export const metadata = {
  title: "LMS Platform",
  description: "Your ultimate destination for learning and growth.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <div>
         <Navbar />
      <main className="container px-4 mx-auto md:px-6 lg:px-8">

          {children}
       
        <Footer />
      </main>
    </div>
  );
}