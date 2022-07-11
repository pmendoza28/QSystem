export interface IGetApiArgument {
    search: string | any;
    limit: number;
    page: number;
}

export type TTxtLoader = "No Data" | "Loading..." | "Refreshing..." | "Something went wrong"