import { PricingTier } from "./pricing-tier"
import { FeatureList } from "./feature-list"

export default function PricingPage() {
  return (
    <div className="bg-gray-50 min-h-screen p-5 lg:p-10">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Simples, transparente e seguro.</h2>
          <p className="mt-4 text-xl text-gray-600">Escolha o plano que melhor se adequa ao seu projeto</p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          <PricingTier
            name="Básico"
            price="Grátis"
            description="Perfeito para pequenos projetos e indivíduais"
            features={["1 galeria", "100MB de armazenamento", "Suporte básico"]}
          />
          <PricingTier
            name="Pro"
            price="250 MZN"
            description="Bom para grandes eventos"
            features={["5 galerias", "5GB de armazenamento", "Suporte 24/7"]}
            highlighted={true}
          />
          <PricingTier
            name="Diamante"
            price="550 MZN"
            description="Excelente para todo tipo de eventos"
            features={[
              "Galerias ilimitadas",
              "20GB de armazenamento",
              "Prioridade no suporte",
              
              "Integrações personalizadas",
            ]}
          />
        </div>

        <FeatureList />
      </div>
    </div>
  )
}

