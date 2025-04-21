
import { Header } from "@/components/Header";
import { DoubtForm } from "@/components/DoubtForm";

export default function SubmitDoubt() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8 text-center">
          Submit a New Doubt
        </h1>
        
        <DoubtForm />
      </main>
      
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          Doubt Buddy © {new Date().getFullYear()} - Your personal doubt management system
        </div>
      </footer>
    </div>
  );
}
