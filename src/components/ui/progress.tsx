import * as React from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { cn } from "../../lib/utils"

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  variant?: "default" | "european" | "glass"
  showStars?: boolean
  starCount?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, variant = "default", showStars = false, starCount = 12, ...props }, ref) => {
    const getVariantStyles = () => {
      switch (variant) {
        case "european":
          return {
            container: "bg-eu-blue/10 border border-eu-blue/20 shadow-eu-card",
            fill: "bg-gradient-to-r from-eu-blue to-eu-gold shadow-eu-floating"
          }
        case "glass":
          return {
            container: "backdrop-blur-lg bg-white/10 border border-white/20 shadow-glass",
            fill: "bg-gradient-to-r from-eu-blue/80 to-eu-gold/80"
          }
        default:
          return {
            container: "bg-gray-200",
            fill: "bg-eu-blue"
          }
      }
    }

    const styles = getVariantStyles()
    const filledStars = Math.floor((value / 100) * starCount)

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {/* Progress Bar */}
        <div className={cn("relative h-3 w-full overflow-hidden rounded-full", styles.container)}>
          <motion.div
            className={cn("h-full rounded-full transition-all duration-500", styles.fill)}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          
          {variant === "european" && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>

        {/* EU Stars Progress Indicator */}
        {showStars && (
          <div className="flex justify-between items-center">
            {[...Array(starCount)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: index < filledStars ? 1 : 0.5, 
                  opacity: index < filledStars ? 1 : 0.3 
                }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={cn(
                  "transition-all duration-300",
                  index < filledStars ? "text-eu-gold" : "text-gray-300"
                )}
              >
                <Star 
                  className={cn(
                    "w-4 h-4",
                    index < filledStars && "fill-current drop-shadow-sm"
                  )} 
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Progress Text */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <motion.span 
            className="font-medium text-eu-blue"
            key={value}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {Math.round(value)}%
          </motion.span>
        </div>
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }