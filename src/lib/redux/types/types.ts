
export interface Item {
    id: number;
    title: string;
    price: number;
    image?: string;
    description: string;
    category: string;
    rating: { rate: number; count: number };
}



export interface ItemsState {
    value: Item[] | null;
    status: "loading" | "succeeded" | "failed";
    error: string | null;
}

export interface ItemState {
    value: Item | null;
    status: "loading" | "succeeded" | "failed";
    error: string | null;
}



export interface favorite {
    data: number[],
    loading: boolean,
    error: string
}