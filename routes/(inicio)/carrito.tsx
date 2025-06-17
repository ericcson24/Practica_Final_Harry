import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std/http/cookie.ts";
import { getSpells } from "../../utils/harryAPi.ts";
import { APISpell, CartItem } from "../../utils/type.ts";
import SpellComponent from "../../components/SpellComponent.tsx";
import BuyButton from "../../islands/BuyButton.tsx";

export const handler: Handlers<(APISpell & { quantity: number })[] | null> = {
  GET: async (req: Request, ctx: FreshContext) => {
    const cookies = getCookies(req.headers);
    if (!cookies.carrito) return ctx.render(null);

    const cartItems: CartItem[] = JSON.parse(
      decodeURIComponent(cookies.carrito),
    );
    const allSpells = await getSpells();
    const selected = allSpells
      .filter((s) =>
        cartItems.some((item) => item.name === s.name && item.quantity > 0)
      )
      .map((spell) => ({
        ...spell,
        quantity:
          cartItems.find((item) => item.name === spell.name)?.quantity || 0,
      }));

    return ctx.render(selected);
  },
};

export default function CarritoPage(
  props: PageProps<(APISpell & { quantity: number })[] | null>,
) {
  if (!props.data || props.data.length === 0) {
    return <div>No hay hechizos en el carrito.</div>;
  }

  return (
    <div>
      <h1>Tu carrito de hechizos</h1>
      {props.data.map((spell) => (
        <div key={spell.name}>
          <SpellComponent {...spell} />
          <BuyButton id={spell.name} />
        </div>
      ))}
    </div>
  );
}
