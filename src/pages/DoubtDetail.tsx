
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Doubt, DoubtStatus, doubtStatuses } from "@/types/doubt";
import { doubtService } from "@/data/mock-doubts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  PenLine, 
  Trash2, 
  ArrowLeft, 
  Clock, 
  CheckCircle 
} from "lucide-react";
import { format } from "date-fns";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function DoubtDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doubt, setDoubt] = useState<Doubt | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(false);

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

  const handleStatusChange = async (status: DoubtStatus) => {
    if (!doubt) return;
    
    setStatusUpdating(true);
    try {
      const updated = await doubtService.updateDoubt(doubt.id, { status });
      setDoubt(updated);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!doubt) return;
    
    try {
      await doubtService.deleteDoubt(doubt.id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting doubt:", error);
    }
  };

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

  const statusColors = {
    pending: "bg-yellow-200 text-yellow-800",
    "in-progress": "bg-blue-200 text-blue-800",
    resolved: "bg-green-200 text-green-800",
  };

  const categoryColors = {
    Academic: "bg-purple-100 text-purple-800",
    Technical: "bg-indigo-100 text-indigo-800",
    Career: "bg-pink-100 text-pink-800",
    General: "bg-gray-100 text-gray-800",
    Other: "bg-teal-100 text-teal-800",
  };

  const statusIcons = {
    pending: Clock,
    "in-progress": Clock,
    resolved: CheckCircle,
  };

  const StatusIcon = statusIcons[doubt.status];

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")} 
              className="flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={() => navigate(`/edit/${doubt.id}`)}
                className="flex items-center gap-1"
              >
                <PenLine className="h-4 w-4" />
                <span>Edit</span>
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    className="flex items-center gap-1"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the doubt.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">{doubt.title}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge 
                    variant="outline" 
                    className={categoryColors[doubt.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-800"}
                  >
                    {doubt.category}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={statusColors[doubt.status]}
                  >
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {doubt.status.charAt(0).toUpperCase() + doubt.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Created: {format(new Date(doubt.createdAt), "PPP")}
                  {doubt.updatedAt !== doubt.createdAt && (
                    <> · Updated: {format(new Date(doubt.updatedAt), "PPP")}</>
                  )}
                </p>
              </div>
              
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{doubt.description}</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center p-4 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium">Status:</span>
              <Badge 
                variant="outline" 
                className={statusColors[doubt.status]}
              >
                <StatusIcon className="h-3 w-3 mr-1" />
                {doubt.status.charAt(0).toUpperCase() + doubt.status.slice(1)}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Change status:</span>
              <Select
                value={doubt.status}
                onValueChange={(value) => handleStatusChange(value as DoubtStatus)}
                disabled={statusUpdating}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {doubtStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          Doubt Buddy © {new Date().getFullYear()} - Your personal doubt management system
        </div>
      </footer>
    </div>
  );
}
