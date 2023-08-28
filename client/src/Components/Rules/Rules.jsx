import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Footer } from '../Footer/Footer'
import { ViewPdf } from '../ViewPDF/ViewPDF'

const Rules = () => {
  return (
    <main className="h-screen flex">
      <Sliderbar />
      <section className="w-full h-screen overflow-auto">
        <ViewPdf></ViewPdf>
        <Footer />
      </section>
    </main>
  )
}

export { Rules }
