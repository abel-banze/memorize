import { Check } from "lucide-react"

const features = [
  "Criação de galerias",
  "Criação de pastas e subpastas",
  "Partilha de ficheiros",
  "24/7 suporte técnico",
]

export function FeatureList() {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-extrabold text-gray-900 text-center mb-8">Todos planos incluem</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Check className="h-5 w-5 text-green-500" />
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

