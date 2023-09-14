import { Footer } from '../Footer/Footer'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react'

const Procedures = () => {
  return (
    <main className="flex h-secreen">
      <Sliderbar />
      <section className="w-full overflow-auto">
        <header className="justify-center flex">
          <h1 className="text-3xl">Aquí va lo de los trámites y actas</h1>
        </header>
        <section>
          <section className="flex w-full flex-col">
          </section>
        </section>
        <Footer />
      </section>
    </main>
  )
}

export { Procedures }
