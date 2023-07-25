import "./User.css";

function User() {
  return (
    <section>
      <form action="">
        <h1>Iniciar Sesión</h1>
        <div className="inside">
          <input type="text" />
          <input type="password" />
          <a href="#">¿Olvidaste tu contraseña?</a>
          <button>Inicar Sesión</button>
          <p>
            ¿Nuevo usuario? <a href="#">Registrate</a>
          </p>
        </div>
        <img src="" alt="" />
      </form>
    </section>
  );
}

export { User };
