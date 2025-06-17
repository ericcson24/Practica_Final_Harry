import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { CartItem } from "../utils/type.ts";

type Props = {
  id: string;
};

const BuyButton: FunctionalComponent<Props> = ({ id }) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const carrito = document.cookie
        .split("; ")
        .find((c) => c.startsWith("carrito="));
      if (!carrito) return;
      const items: CartItem[] = JSON.parse(
        decodeURIComponent(carrito.split("=")[1]),
      );
      const item = items.find((i) => i.name === id);
      if (item) setQuantity(item.quantity);
    }
  }, []);

  const updateCart = (newQuantity: number) => {
    if (typeof window === "undefined") return;

    const carritoCookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("carrito="));

    let items: CartItem[] = [];
    if (carritoCookie) {
      items = JSON.parse(decodeURIComponent(carritoCookie.split("=")[1]));
    }

    if (newQuantity <= 0) {
      items = items.filter((item) => item.name !== id);
    } else {
      const existingItem = items.find((item) => item.name === id);
      if (existingItem) {
        existingItem.quantity = newQuantity;
      } else {
        items.push({ name: id, quantity: newQuantity });
      }
    }

    if (items.length === 0) {
      document.cookie =
        "carrito=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
    } else {
      document.cookie = `carrito=${
        encodeURIComponent(
          JSON.stringify(items),
        )
      }; Path=/`;
    }

    setQuantity(newQuantity);
  };

  return (
    <div>
      <button onClick={() => updateCart(quantity - 1)}>-</button>
      <span>{quantity}</span>
      <button onClick={() => updateCart(quantity + 1)}>+</button>
    </div>
  );
};

export default BuyButton;
