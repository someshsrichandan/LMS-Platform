
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="container px-6 py-12 mx-auto font-serif text-center text-muted-foreground">
      <Separator className="mb-6 bg-border" />
      <p className="text-sm">© 2025 LMS Platform. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-4">
        <a href="/about" className="transition-colors hover:text-primary">About</a>
        <a href="/contact" className="transition-colors hover:text-primary">Contact</a>
        <a href="/privacy" className="transition-colors hover:text-primary">Privacy Policy</a>
      </div>
    </footer>
  );
}