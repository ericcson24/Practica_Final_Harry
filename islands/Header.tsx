import { FunctionalComponent } from "preact/src/index.d.ts";

const Header: FunctionalComponent = () => {
  const borrarCoockie = () => {
    if (typeof window === "undefined") return;
    document.cookie = "user=; Path=/; Expires=Thu, 29 May 2025 00:00:00 GMT";
    document.cookie =
      "favCharacter=; Path=/; Expires=Thu, 29 May 2025 00:00:00 GMT";
    document.cookie = "carrito=; Path=/; Expires=Thu, 29 May 2025 00:00:00 GMT";
    location.reload();
  };

  return (
    <header>
      <h1>Harry Potter</h1>
      <a href="/favorites">
        <button type="button">Favoritos</button>
      </a>
      <a href="/carrito">
        <button type="button">🛒 Carrito</button>
      </a>
      <button type="button" onClick={() => borrarCoockie()}>
        Cerrar sesión
      </button>
    </header>
  );
};

export default Header;
