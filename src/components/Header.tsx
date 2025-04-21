
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  MessageCircleQuestion, 
  PlusCircle, 
  Home 
} from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 transition-all hover:opacity-80">
          <div className="bg-purple-600 text-white p-1.5 rounded-md">
            <MessageCircleQuestion className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Doubt Buddy</h1>
        </Link>
        
        <nav className="flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link to="/" className="flex items-center gap-1">
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
          </Button>
          
          <Button 
            asChild
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Link to="/submit" className="flex items-center gap-1">
              <PlusCircle className="w-4 h-4" />
              <span>New Doubt</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
