import { useId } from "react"
import { isDoStatement } from "typescript"
import { TableItem } from "../interfaces/TableItem"

interface AppTableBodyProps {
    items: Array<TableItem>
}

function parseDate(date: string) {
    return date.split("T")[0]
}


export function AppTableBody(props: AppTableBodyProps) {
    return (
        <tbody>
            {props.items.map((item, index) => {
                let classAddition = ""
                if (index % 2 == 0) {
                    classAddition = " bg-slate-100"
                } else {
                    classAddition = ""
                }
                return (
                    <tr key={item.date + item.name + item.count + item.distance}>
                        <td className={"pl-8 py-1 text-slate-500" + classAddition}>{parseDate(item.date)}</td>
                        <td className={"pl-8 py-1 text-slate-500" + classAddition}>{item.name}</td>
                        <td className={"pl-8 py-1 text-slate-500" + classAddition}>{item.count}</td>
                        <td className={"pl-8 py-1 text-slate-500" + classAddition}>{item.distance}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}