import { useEffect, useState } from "react"
import { TableItem } from "../interfaces/TableItem"
import { AppTableBody } from "./AppTableBody"
import { AppTableHeader } from "./AppTableHeader"
import { DropDown } from "./DropDown"
import { DropDownMenu, MenuItem } from "./DropDownMenu"
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
    let [isPlaceholderVisible, setPlaceholderVisibility] = useState<boolean>(true)

    let [inputTimeout, setInputTimeout] = useState<NodeJS.Timeout>()

    let [filterType, setFilterType] = useState<string>("none")
    let filterTypeItems: Array<MenuItem> = [
        {key: "none", value: "Выключить"},
        {key: "equals", value: "Равно"},
        {key: "less", value: "Меньше"},
        {key: "greater", value: "Больше"},
        {key: "contains", value: "Содержит"},
    ]

    let [filterColumn, setFilterColumn] = useState<string>("date")
    let filterColumnItems: Array<MenuItem> = [
        {key: "name", value: "Название"},
        {key: "count", value: "Количество"},
        {key: "distance", value: "Расстояние"},
    ]

    let [value, setValue] = useState<string>("")

    let placeholderClassAddition = " hidden"
    if (isPlaceholderVisible) { placeholderClassAddition = "" }

    useEffect(() => {
        fetch("api/v1?page=" + page + "&sortColumn=" + sortColumn + "&sortOrder=" + stringifySortOrder(isSortOrderIncrease) + "&filterType=" + filterType + "&filterColumn=" + filterColumn + "&value=" + value).then((result) => {
            setPlaceholderVisibility(true)
            if (result.ok) {
                result.json().then((obj) => {
                    setItems(obj.rows)
                    setPlaceholderVisibility(false)
                })
            }
        })
    }, [page, sortColumn, isSortOrderIncrease, filterType, filterColumn, value])
    // <DropDownMenu visible={true} items={[{key: "key1", value: "value1"}, {key: "key2", value: "value2"}]} onClick={(key: any) => {console.log(key)}}/>

    return (
        <div className="min-w-[600px]">
            <div className="my-[20px] flex justify-between">
                <DropDown onSelect={(key: string) => {setFilterColumn(key)}} items={filterColumnItems}>Столбец</DropDown>
                <DropDown onSelect={(key: string) => {setFilterType(key)}} items={filterTypeItems}>Тип фильтра</DropDown>
                <input placeholder="Значение..."
                    className="px-8 outline-none border border-slate-300 rounded-lg placeholder-slate-300 focus:border-slate-900 text-slate-500"
                    onInput={(input: any) => {
                        clearTimeout(inputTimeout)
                        let timeout = setTimeout(() => {setValue(input.target.value)}, 500)
                        setInputTimeout(timeout)
                }}></input>
            </div>
            <table className="min-w-[600px] w-full text-left">
                <AppTableHeader sortColumn={sortColumn} setSortColumn={setSortColumn} isSortOrderIncrease={isSortOrderIncrease} setIsSortOrderIncrease={setIsSortOrderIncrease} />
                <AppTableBody items={items} />
            </table>
            <div className="min-w-[600px] w-full h-[20px] bg-slate-900 rounded-b-lg"></div>
            <PageSwitcher page={page} setPage={setPage} />
        </div>
    )
}