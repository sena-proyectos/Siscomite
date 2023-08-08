import "./Button.css"

export const Button = ({ title, icon }) => {
    return (
      <main className="containerButton">
        <button className="button">
           {icon}  {title}
        </button>

      </main>
    );
  };