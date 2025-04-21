
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { DoubtForm } from "@/components/DoubtForm";
import { Doubt } from "@/types/doubt";
import { doubtService } from "@/data/mock-doubts";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditDoubt() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doubt, setDoubt] = useState<Doubt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoubt = async () => {
      if (!id) return;
      
      try {
        const data = await doubtService.getDoubtById(id);
        setDoubt(data);
      } catch (error) {
        console.error("Error fetching doubt:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoubt();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/20">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex justify-center items-center">
          Loading doubt details...
        </main>
      </div>
    );
  }

  if (!doubt) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/20">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">Doubt Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The doubt you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/doubt/${doubt.id}`)} 
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Doubt Details</span>
          </Button>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight mb-8 text-center">
          Edit Doubt
        </h1>
        
        <DoubtForm 
          existingDoubt={doubt} 
          onSuccess={() => navigate(`/doubt/${doubt.id}`)} 
        />
      </main>
      
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          Doubt Buddy © {new Date().getFullYear()} - Your personal doubt management system
        </div>
      </footer>
    </div>
  );
}
