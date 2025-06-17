import { FunctionalComponent } from "preact/src/index.d.ts";
import { APISpell } from "../utils/type.ts";

const SpellComponent:FunctionalComponent<APISpell> = (props) => {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
        </div>
    )
}

export default SpellComponent