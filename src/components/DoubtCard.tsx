
import { Doubt } from "@/types/doubt";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface DoubtCardProps {
  doubt: Doubt;
  onClick?: () => void;
}

export function DoubtCard({ doubt, onClick }: DoubtCardProps) {
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

  return (
    <Card 
      className="hover:shadow-md transition-all cursor-pointer" 
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium line-clamp-1">
            {doubt.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {doubt.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge 
            variant="outline" 
            className={`${statusColors[doubt.status]}`}
          >
            {doubt.status.charAt(0).toUpperCase() + doubt.status.slice(1)}
          </Badge>
          <Badge 
            variant="outline"
            className={categoryColors[doubt.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-800"}
          >
            {doubt.category}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-0 text-xs text-muted-foreground">
        Created: {format(new Date(doubt.createdAt), "MMM d, yyyy")}
      </CardFooter>
    </Card>
  );
}
