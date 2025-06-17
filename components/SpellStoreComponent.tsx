import { FunctionalComponent } from "preact";
import { APISpell } from "../utils/type.ts";
import BuyButton from "../islands/BuyButton.tsx";

const SpellStoreComponent: FunctionalComponent<APISpell> = (props) => {
  return (
    <div class="spell-card">
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <BuyButton id={props.name} />
    </div>
  );
};

export default SpellStoreComponent;
