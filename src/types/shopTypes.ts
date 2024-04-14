export type TProduct = {
    id: number,
    image_url: string,
    title: string,
    description: string,
    price: number
}

export type TFetching = {
    page: number,
    amount: number,
    total: number,
    products: TProduct[],
}