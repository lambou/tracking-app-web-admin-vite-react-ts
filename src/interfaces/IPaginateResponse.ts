export default interface IPaginateResponse<Item extends any = any> {
    page: number;
    limit: number;
    total: number;
    pages: number;
    docs: Item[]
}