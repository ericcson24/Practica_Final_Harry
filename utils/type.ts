import { ObjectId, OptionalId } from "mongodb";

export type HarryModel = OptionalId<{
    name: string;
    email: string;
    password: string;
}>;

export type FavModel = OptionalId<{
    id_user: ObjectId;
    id_character: string;
}>;

export type CookieUser = {
    name: string;
    token: string;
};

export type APICharacter = {
    id: string;
    name: string;
    image: string;
};

export type APISpell = {
    id: string;
    name: string;
    description: string;
};

export type CartItem = {
    name: string;
    quantity: number;
};
