
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Doubt, DoubtCategory, DoubtStatus, doubtCategories, doubtStatuses } from "@/types/doubt";
import { DoubtCard } from "@/components/DoubtCard";
import { EmptyState } from "@/components/EmptyState";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { doubtService } from "@/data/mock-doubts";
import { MessageCircleQuestion } from "lucide-react";

export function DoubtList() {
  const navigate = useNavigate();
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [filteredDoubts, setFilteredDoubts] = useState<Doubt[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const data = await doubtService.getDoubts();
        setDoubts(data);
        setFilteredDoubts(data);
      } catch (error) {
        console.error("Error fetching doubts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoubts();
  }, []);

  useEffect(() => {
    let result = doubts;

    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(
        (doubt) =>
          doubt.title.toLowerCase().includes(lowercasedSearch) ||
          doubt.description.toLowerCase().includes(lowercasedSearch)
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((doubt) => doubt.category === categoryFilter);
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((doubt) => doubt.status === statusFilter);
    }

    // Sort by creation date (newest first)
    result = [...result].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setFilteredDoubts(result);
  }, [doubts, searchTerm, categoryFilter, statusFilter]);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-4 h-4 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-4 h-4 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search doubts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={categoryFilter}
            onValueChange={setCategoryFilter}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {doubtCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {doubtStatuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredDoubts.length === 0 ? (
        <div className="py-8">
          <EmptyState
            icon={<MessageCircleQuestion className="h-12 w-12 opacity-20" />}
            title="No doubts found"
            description="Try adjusting your filters or create a new doubt."
            action={{
              label: "Create Doubt",
              onClick: () => navigate("/submit"),
            }}
            className="bg-card"
          />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoubts.map((doubt) => (
            <DoubtCard
              key={doubt.id}
              doubt={doubt}
              onClick={() => navigate(`/doubt/${doubt.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
