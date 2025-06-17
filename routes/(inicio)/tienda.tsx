import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getSpells } from "../../utils/harryAPi.ts";
import { APISpell } from "../../utils/type.ts";
import SpellStoreComponent from "../../components/SpellStoreComponent.tsx";
import { getCookies } from "https://deno.land/std/http/cookie.ts";

export const handler: Handlers<APISpell[] | null> = {
  GET: async (req: Request, ctx: FreshContext) => {
    const cookies = getCookies(req.headers);
    if (!cookies.user) {
      const headers = new Headers();
      headers.set("location", "/");
      return new Response(null, {
        status: 302,
        headers,
      });
    }
    const spells = await getSpells();
    return ctx.render(spells);
  },
};

export default function StorePage(props: PageProps<APISpell[] | null>) {
  if (!props.data || props.data.length === 0) {
    return <div>No hay hechizos disponibles.</div>;
  }

  return (
    <div>
      <h1>Tienda de Hechizos</h1>
      {props.data.map((spell) => (
        <SpellStoreComponent key={spell.name} {...spell} />
      ))}
    </div>
  );
}
