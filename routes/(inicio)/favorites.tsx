import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std/http/cookie.ts";
import { APICharacter } from "../../utils/type.ts";
import { getCharactersID } from "../../utils/harryAPi.ts";
import CharacterComponent from "../../components/CharacterComponent.tsx";

export const handler:Handlers = {
    GET: async(req:Request, ctx:FreshContext<unknown, APICharacter[]>) => {
        const cookies = getCookies(req.headers)
        if(!cookies.favCharacter) return ctx.render()
            
        const favObject:string[] = JSON.parse(decodeURIComponent(cookies.favCharacter))
        const result:APICharacter[] = await Promise.all(favObject.map(e => getCharactersID(e)))
        
        return ctx.render(result)
    }
}

export default (props:PageProps<APICharacter[]>) => {
    if(!props.data) return <div>Añade un personaje a favoritos</div>
    return (
        <div>
            {props.data.map(e => <CharacterComponent key={e.id} character={e} fav={false}/>)}
        </div>
    )
}