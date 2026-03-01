import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-eu-blue hover:bg-eu-blue-dark text-eu-gold shadow-eu-card hover:shadow-eu-hover",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg",
        outline:
          "border-2 border-eu-blue text-eu-blue hover:bg-eu-blue hover:text-eu-gold shadow-sm hover:shadow-eu-card",
        secondary:
          "bg-eu-gold hover:bg-eu-gold-dark text-eu-blue shadow-md hover:shadow-lg",
        ghost: "hover:bg-eu-blue/10 hover:text-eu-blue",
        link: "text-eu-blue underline-offset-4 hover:underline",
        european: "bg-gradient-to-r from-eu-blue to-eu-blue-dark text-eu-gold shadow-eu-floating hover:shadow-eu-hover transform hover:scale-105 hover:-translate-y-1",
        glass: "backdrop-blur-lg bg-white/10 border border-white/20 text-eu-blue hover:bg-white/20 shadow-glass"
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
        xl: "h-14 rounded-xl px-10 text-lg"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }