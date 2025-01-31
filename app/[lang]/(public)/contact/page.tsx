import { ContactForm } from "./contact-form"
import { ContactInfo } from "./contact-info"

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full lg:w-3/4 mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Fale connosco</h1>
          <p className="mt-4 text-xl text-gray-600">
            Nós adoraríamos ouvir de você. Entre em contato e nós responderemos o mais rápido possível.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ContactInfo />
            <ContactForm />
        </div>
      </div>
    </div>
  )
}

