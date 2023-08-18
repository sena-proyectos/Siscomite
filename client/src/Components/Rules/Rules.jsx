import { Sliderbar } from "../Sliderbar/Sliderbar";
import { Footer } from "../Footer/Footer";

const Rules = () => {
  return (
    <main className="h-screen flex">
      <Sliderbar />
      <section className="w-full h-screen overflow-auto">
        <h3 className="bg-red-500">Aquí va el reglamento</h3>

        <Footer />
      </section>
    </main>
  );
};

export { Rules };
