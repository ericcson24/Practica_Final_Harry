import { FreshContext, Handlers } from "$fresh/server.ts";
import HomeComponent from "../../components/HomeComponent.tsx";

export const handler:Handlers = {
    POST: (_req:Request, ctx:FreshContext) => ctx.render()
}

export default () =>  <HomeComponent/>