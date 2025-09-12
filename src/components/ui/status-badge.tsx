import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset",
  {
    variants: {
      status: {
        reported: "bg-muted text-muted-foreground ring-muted-foreground/20",
        assigned: "bg-accent text-accent-foreground ring-accent-foreground/20", 
        "in-progress": "bg-warning/10 text-warning ring-warning/20",
        resolved: "bg-success/10 text-success ring-success/20",
        closed: "bg-muted text-muted-foreground ring-muted-foreground/20"
      },
      urgency: {
        low: "bg-muted text-muted-foreground ring-muted-foreground/20",
        medium: "bg-warning/10 text-warning ring-warning/20", 
        high: "bg-urgent/10 text-urgent ring-urgent/20",
        critical: "bg-urgent text-urgent-foreground ring-urgent/20"
      }
    }
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode;
}

function StatusBadge({ className, status, urgency, children, ...props }: StatusBadgeProps) {
  return (
    <div 
      className={cn(statusBadgeVariants({ status, urgency }), className)} 
      {...props}
    >
      {children}
    </div>
  );
}

export { StatusBadge, statusBadgeVariants };