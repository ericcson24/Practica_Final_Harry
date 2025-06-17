import { MongoClient, Collection } from "mongodb"
import { FavModel, HarryModel } from "./type.ts";

let HarryCollection:Collection<HarryModel>
let FavCollection:Collection<FavModel>

const initMongodb = async() => {

    if(HarryCollection && FavCollection) return ({HarryCollection, FavCollection})

    const url = Deno.env.get("MONGO_URL")
    if(!url) throw new Error("Error con MONGO_URL")

    const client = new MongoClient(url)
    await client.connect()
    console.log("Conectado a MongoDB")

    const db = client.db("harry-potter")
    HarryCollection = db.collection<HarryModel>("user")
    FavCollection = db.collection<FavModel>("favourite")

    return ({HarryCollection, FavCollection})
}

export default initMongodb