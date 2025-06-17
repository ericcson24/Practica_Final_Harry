import {  FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import {  getCookies } from "https://deno.land/std/http/cookie.ts";
import CharacterComponent from "../../components/CharacterComponent.tsx";
import { getCharacters } from "../../utils/harryAPi.ts";
import { APICharacter } from "../../utils/type.ts";


type Data = {
    characters: APICharacter[]
    fav: string[]
}

export const handler:Handlers = {
    GET: async(req:Request, ctx:FreshContext<unknown, Data>) => {
        const characters:APICharacter[] = await getCharacters() 
        const cookies = getCookies(req.headers)
        if(cookies.favCharacter) {
            const aux = JSON.parse(decodeURIComponent(cookies.favCharacter))
            return ctx.render({
                characters,
                fav: aux
            })
        }
        return ctx.render({
                characters,
                fav: []
        })
    }
}


export default (props:PageProps<Data>) => {
    return (
        <div>
            {props.data.characters.map(e => <CharacterComponent key={e.id} character={e} fav={props.data.fav.some(i => e.id === i)}/>)}
        </div>
    )
}