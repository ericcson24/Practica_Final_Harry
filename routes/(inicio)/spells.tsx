import SpellComponent from "../../components/SpellComponent.tsx";
import { getSpells } from "../../utils/harryAPi.ts";

export default async() => {
    const spells = await getSpells()
    return (
        <div>
            {spells.map(e => <SpellComponent key={e.name} {...e}/>)}
        </div>
    )
}