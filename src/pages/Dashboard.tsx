
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { DoubtList } from "@/components/DoubtList";
import { StatCard } from "@/components/StatCard";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { 
  MessageCircleQuestion, 
  Clock, 
  CheckCircle, 
  PlusCircle,
  BarChart 
} from "lucide-react";
import { doubtService } from "@/data/mock-doubts";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const doubts = await doubtService.getDoubts();
        
        setStats({
          total: doubts.length,
          pending: doubts.filter(d => d.status === 'pending').length,
          inProgress: doubts.filter(d => d.status === 'in-progress').length,
          resolved: doubts.filter(d => d.status === 'resolved').length
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your doubts and questions in one place
            </p>
          </div>
          
          <Button 
            onClick={() => navigate("/submit")}
            className="flex items-center gap-1"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Doubt</span>
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard 
            title="Total Doubts" 
            value={stats.total} 
            icon={MessageCircleQuestion}
            className="bg-gradient-to-br from-purple-50 to-white"
          />
          <StatCard 
            title="Pending" 
            value={stats.pending} 
            icon={Clock} 
            description="Awaiting answers"
            className="bg-gradient-to-br from-yellow-50 to-white"
          />
          <StatCard 
            title="In Progress" 
            value={stats.inProgress} 
            icon={Clock} 
            description="Being worked on"
            className="bg-gradient-to-br from-blue-50 to-white"
          />
          <StatCard 
            title="Resolved" 
            value={stats.resolved} 
            icon={CheckCircle}
            description="Successfully answered"
            className="bg-gradient-to-br from-green-50 to-white"
          />
        </div>
        
        {stats.total > 0 && (
          <div className="grid gap-4 md:grid-cols-2 mb-8">
            <div className="p-6 rounded-lg border bg-card shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                  Resolution Progress
                </h3>
              </div>
              <div className="space-y-4">
                <ProgressBar 
                  label="Pending" 
                  value={stats.pending} 
                  max={stats.total} 
                />
                <ProgressBar 
                  label="In Progress" 
                  value={stats.inProgress} 
                  max={stats.total} 
                />
                <ProgressBar 
                  label="Resolved" 
                  value={stats.resolved} 
                  max={stats.total} 
                />
              </div>
            </div>
            
            <div className="p-6 rounded-lg border bg-gradient-to-br from-purple-50 to-white shadow">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h3 className="font-medium mb-2">Quick Tips</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="bg-purple-100 text-purple-600 rounded-full p-1 mt-0.5">
                        <CheckCircle className="h-3 w-3" />
                      </span>
                      <span>Be specific when submitting your doubt</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-purple-100 text-purple-600 rounded-full p-1 mt-0.5">
                        <CheckCircle className="h-3 w-3" />
                      </span>
                      <span>Include relevant context in your descriptions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-purple-100 text-purple-600 rounded-full p-1 mt-0.5">
                        <CheckCircle className="h-3 w-3" />
                      </span>
                      <span>Choose the right category for faster resolution</span>
                    </li>
                  </ul>
                </div>
                <Button 
                  onClick={() => navigate("/submit")} 
                  className="mt-4 w-full"
                >
                  Submit New Doubt
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="rounded-lg border bg-card shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Your Doubts</h2>
            <DoubtList />
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
