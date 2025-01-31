import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PricingTierProps {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}

export function PricingTier({ name, price, description, features, highlighted = false }: PricingTierProps) {
  return (
    <div className={`rounded-lg shadow-lg overflow-hidden ${highlighted ? "border-2 border-primary" : ""}`}>
      <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
        <div className="flex justify-center">
          <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary-foreground text-primary">
            {name}
          </span>
        </div>
        <div className="mt-4 flex justify-center text-6xl font-extrabold text-gray-900">{price}</div>
        <p className="mt-5 text-lg text-gray-500 text-center">{description}</p>
      </div>
      <div className="px-6 pt-6 pb-8 bg-gray-50 sm:p-10 sm:pt-6">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-6 w-6 text-green-500" />
              </div>
              <p className="ml-3 text-base text-gray-700">{feature}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-md shadow">
          <Button className="w-full">Escolher plano</Button>
        </div>
      </div>
    </div>
  )
}

