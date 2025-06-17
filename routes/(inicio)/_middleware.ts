import { FreshContext, Handler } from "$fresh/server.ts";
import initMongodb from "../../utils/database.ts";
import {
    Cookie,
    getCookies,
    setCookie,
} from "https://deno.land/std/http/cookie.ts";
import { CookieUser } from "../../utils/type.ts";
import { ObjectId } from "mongodb";

const devolver = () => {
    const headers = new Headers();
    headers.set("location", "/");
    return new Response(null, {
        status: 302,
        headers,
    });
};

const generateCoockie = (user: string, token: string): Cookie => {
    const userObject: CookieUser = { name: user, token };
    const cookie: Cookie = {
        name: "user",
        value: encodeURIComponent(JSON.stringify(userObject)),
    };
    return cookie;
};

const goHome = (user: string, token: string) => {
    const headers = new Headers();
    setCookie(headers, generateCoockie(user, token));
    headers.set("location", "/home");
    return new Response(null, {
        status: 302,
        headers,
    });
};

const comprobarToken = async (user: string): Promise<boolean> => {
    const userObject: CookieUser = JSON.parse(user);
    const { HarryCollection } = await initMongodb();
    const result = await HarryCollection.findOne({
        _id: new ObjectId(userObject.token),
    });
    return result ? true : false;
};

export const handler: Handler = async (req: Request, ctx: FreshContext) => {
    try {
        const cookie = getCookies(req.headers);
        if (cookie.user) {
            if (await comprobarToken(decodeURIComponent(cookie.user))) {
                return await ctx.next();
            }
            return devolver();
        }

        // Si es una solicitud GET y no hay cookie, redirigir al inicio
        if (req.method === "GET") {
            return devolver();
        }

        const form = await req.formData();
        const user = form.get("user") as string;
        const password = form.get("password") as string;
        const email = form.get("email") as string;

        const { HarryCollection } = await initMongodb();

        if (!email) {
            const result = await HarryCollection.findOne({
                name: user,
                password,
            });
            if (!result) return devolver();
            return goHome(user, result._id.toString());
        } else {
            const result = await HarryCollection.findOne({ email });
            if (result) return devolver();
            const { insertedId } = await HarryCollection.insertOne({
                name: user,
                email,
                password,
            });
            return goHome(user, insertedId.toString());
        }
    } catch (e) {
        console.log("Error: " + e);
        return devolver();
    }
};
