import "./Button.css"

export const Button = ({ title, condicion }) => {
    return (
      <main className="containerButton">
        <button className="button">
            {title}
        </button>

      </main>
    );
  };