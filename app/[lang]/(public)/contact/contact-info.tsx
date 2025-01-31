import { MapPin, Phone, Mail } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="border-b lg:border-r lg:border-b-0  p-8">
      <h2 className="text-2xl font-bold mb-6">Informações de contato</h2>
      <div className="space-y-4">
        <div className="flex items-start">
          <MapPin className="h-6 w-6 text-primary mr-3 mt-1" />
          <div>
            <h3 className="font-semibold">Endereço</h3>
            <p className="text-gray-600">
              Av. Julius Nyerere, 2453
              <br />
              Bairro de Laulane
              <br />
              Cidade de Maputo
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Phone className="h-6 w-6 text-primary mr-3" />
          <div>
            <h3 className="font-semibold">Telefone</h3>
            <p className="text-gray-600">+258 87 408 8005</p>
          </div>
        </div>
        <div className="flex items-center">
          <Mail className="h-6 w-6 text-primary mr-3" />
          <div>
            <h3 className="font-semibold">Email</h3>
            <p className="text-gray-600">info@codebaz.site</p>
          </div>
        </div>
      </div>
    </div>
  )
}

