export interface IProduct {
    id?: number | any;
    title?: string | null;
    description?: string | null;
    categoryId?: number | string | null;
    images?: any[] | null | any | undefined;
    cost?: number | null;
    price?: number | null;
}
