import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, LogIn } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import LoginModal from "@/components/admin/LoginModal";

export default function Header() {
  const [location] = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <svg viewBox="0 0 24 24" className="h-10 w-auto mr-3 fill-current">
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l4-2.18L12 3zm5 12.99l-5 2.73-5-2.73V11.5L12 14l5-2.5v4.49z" />
          </svg>
          <h1 className="font-bold text-xl md:text-2xl">University Administration Directory</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink href="/" label="Home" isActive={location === "/"} />
          <NavLink href="/directory" label="Directory" isActive={location === "/directory"} />
          <NavLink href="/admin" label="Admin" isActive={location === "/admin"} />
          <Button
            variant="ghost"
            className="text-white hover:text-accent hover:bg-primary-dark"
            onClick={() => setIsLoginOpen(true)}
          >
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        </nav>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="pt-12">
            <nav className="flex flex-col space-y-4">
              <MobileNavLink href="/" label="Home" />
              <MobileNavLink href="/directory" label="Directory" />
              <MobileNavLink href="/admin" label="Admin" />
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setIsLoginOpen(true)}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      
      <LoginModal open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </header>
  );
}

function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link href={href}>
      <a className={`font-semibold transition-colors duration-200 ${isActive ? 'text-accent' : 'hover:text-accent-light'}`}>
        {label}
      </a>
    </Link>
  );
}

function MobileNavLink({ href, label }: { href: string; label: string }) {
  const [location] = useLocation();
  const isActive = location === href;
  
  return (
    <Link href={href}>
      <a className={`py-2 px-4 rounded-md ${isActive ? 'bg-primary text-white' : 'text-foreground hover:bg-muted'}`}>
        {label}
      </a>
    </Link>
  );
}
