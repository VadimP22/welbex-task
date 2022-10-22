import { useEffect, useState } from "react"
import { TableItem } from "../interfaces/TableItem"
import { AppTableBody } from "./AppTableBody"
import { AppTableHeader } from "./AppTableHeader"
import { PageSwitcher } from "./PageSwitcher"

function stringifySortOrder(sortOrder: boolean) {
    if (sortOrder) {
        return "increase"
    }

    return "decrease"
}

export function AppTable(props: any) {
    let [items, setItems] = useState<Array<TableItem>>([])
    let [page, setPage] = useState<number>(0)
    let [sortColumn, setSortColumn]= useState<string>("date")
    let [isSortOrderIncrease, setIsSortOrderIncrease] = useState<boolean>(true)

    useEffect(() => {
        fetch("api/v1?page=" + page + "&sortColumn=" + sortColumn + "&sortOrder=" + stringifySortOrder(isSortOrderIncrease)).then((result) => {
            if (result.ok) {
                result.json().then((obj) => {
                    setItems(obj.rows)
                })
            }
        })
    }, [page, sortColumn, isSortOrderIncrease])

    return (
        <div>
            <table className="w-full text-left h-[500px]">
                <AppTableHeader sortColumn={sortColumn} setSortColumn={setSortColumn} isSortOrderIncrease={isSortOrderIncrease} setIsSortOrderIncrease={setIsSortOrderIncrease} />
                <AppTableBody items={items} />
            </table>
            <PageSwitcher page={page} setPage={setPage} />
        </div>
    )
}