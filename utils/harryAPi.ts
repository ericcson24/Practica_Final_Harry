import { APICharacter, APISpell } from "./type.ts";

export const getCharacters = async():Promise<APICharacter[]> => {
    const data = await fetch("https://hp-api.onrender.com/api/characters")
    const result:APICharacter[] = await data.json()
    return result.slice(0, 20)
}

export const getSpells = async():Promise<APISpell[]> => {
    const data = await fetch("https://hp-api.onrender.com/api/spells")
    const result:APISpell[] = await data.json()
    return result.slice(0, 20)
}

export const getCharactersID = async(id:string):Promise<APICharacter> => {
    const data = await fetch(`https://hp-api.onrender.com/api/character/${id}`)
    const result:APICharacter[] = await data.json()
    return result[0]
}