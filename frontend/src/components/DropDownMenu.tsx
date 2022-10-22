import { useEffect, useState } from "react"

export interface MenuItem {
    key: string,
    value: string
}

interface DropDownMenuProps {
    visible: boolean,
    items: Array<MenuItem>,
    onClick: any
}

export function DropDownMenu(props: DropDownMenuProps) {
    let [classNameAddition, setClassNameAddition] = useState<string>("hidden")

    useEffect(() => {
        if (props.visible) {
            setClassNameAddition("")
        } else {
            setClassNameAddition(" hidden")
        }
    }, [props.visible])

    return (
        <div className={"fixed bg-white border border-slate-300 rounded-lg p-1" + classNameAddition}>
            {props.items.map((item) => {
                return <div key={item.key + item.value} className={"select-none p-2 text-slate-500 cursor-pointer hover:bg-slate-100 rounded-lg"} onClick={() => {props.onClick(item.key, item.value)}}>{item.value}</div>
            })}
        </div>
    )
}