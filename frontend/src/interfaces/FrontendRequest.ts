
export type Column = "name" | "count" | "distance"

export type SortOrder = "increase" | "decrease"

export type FilterType = "contains" | "greater" | "less" | "equals"

export interface FrontendRequest {
    page: number,

    sortColumn: Column,
    sortOrder: SortOrder,

    haveFilter: boolean,
    filterType: FilterType,
    filterColumn: Column,
    value: any
}