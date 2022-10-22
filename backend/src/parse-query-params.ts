import { Column, columnTypeValues, FilterType, filterTypeValues, FrontendRequest, SortOrder, sortOrderTypeValues } from "./frontend-request";

export function parseQueryParams(params: any): FrontendRequest {
    let page = 0

    let sortColumn: Column = "date"
    let sortOrder: SortOrder = "increase"

    let haveFilter: boolean = false
    let filterType: FilterType = "contains"
    let filterColumn: Column = "distance"
    let value: any = "0"
    
    if (params.page !== undefined) {
        try {
            page = parseInt(params.page)
        } catch {
            console.log("WARNING: page must be integer")
        }
    }

    if (params.sortColumn !== undefined) {
        if (columnTypeValues.includes(params.sortColumn)) {
            sortColumn = params.sortColumn   
        }
    }

    if (params.sortOrder !== undefined) {
        if (sortOrderTypeValues.includes(params.sortOrder)) {
            sortOrder = params.sortOrder   
        }
    } 

    if  (params.filterType !== undefined && params.filterColumnt !== undefined && params.value !== undefined) {
        if (filterTypeValues.includes(params.filterType) && columnTypeValues.includes(params.filterColumn)) {
            filterType = params.filterType
            filterColumn = params.filterColumn

            if (filterColumn != "name") {
                try {
                    value = parseInt(params.value)
                    haveFilter = true
                } catch {
                    console.log("WARNING: value must be integer if filterColumn != name")
                }
            } else {
                value = params.value
                haveFilter = true
            }
        }
    }

    return {
        page,

        sortColumn,
        sortOrder,

        haveFilter,
        filterType,
        filterColumn,
        value
    }
}