import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-eu-blue text-eu-gold hover:bg-eu-blue-dark shadow-sm",
        secondary:
          "border-transparent bg-eu-gold text-eu-blue hover:bg-eu-gold-dark shadow-sm",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-600 shadow-sm",
        outline: "border-eu-blue text-eu-blue hover:bg-eu-blue hover:text-eu-gold",
        european: "border-transparent bg-gradient-to-r from-eu-blue to-eu-blue-dark text-eu-gold shadow-eu-card hover:shadow-eu-hover transform hover:scale-105",
        glass: "backdrop-blur-lg bg-white/20 border-white/30 text-eu-blue shadow-glass",
        success: "border-transparent bg-green-500 text-white hover:bg-green-600 shadow-sm",
        warning: "border-transparent bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }