import { FunctionalComponent } from "preact/src/index.d.ts";
import { APICharacter } from "../utils/type.ts";
import Star from "../islands/Star.tsx";

type Data = {
    character: APICharacter
    fav: boolean
}

const CharacterComponent:FunctionalComponent<Data> = (props) => {
    return (
        <div>
            <h2>{props.character.name}</h2>
            <img src={props.character.image} alt={props.character.id} width={100}/>
            <Star id={props.character.id} fav={props.fav}/>
        </div>
    )
}

export default CharacterComponent