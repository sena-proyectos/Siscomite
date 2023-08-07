import "./Create.css";
import { Footer } from "../Footer/Footer"
import { Sliderbar } from "../Sliderbar/Sliderbar";

const Create = () => {
  return (
    <main className="containerCreate">
      <Sliderbar />
      <section className="createCentent">
        <header className="createHeader">
        </header>
        <Footer/>
      </section>
    </main>
  );
};

export { Create };
