import { FunctionalComponent } from "preact";

const HomeComponent: FunctionalComponent = () => {
  return (
    <div>
      <a href="/characters"><button type="button">Personajes</button></a>
      <a href="/spells"><button type="button">Hechizos</button></a>
      <a href="/tienda"><button type="button">Tienda</button></a>
    </div>
  );
};

export default HomeComponent;
