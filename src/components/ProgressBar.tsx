
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export function ProgressBar({ 
  value, 
  max, 
  label, 
  showPercentage = true,
  className 
}: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100) || 0;
  
  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-muted-foreground">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium">{percentage}%</span>
          )}
        </div>
      )}
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
