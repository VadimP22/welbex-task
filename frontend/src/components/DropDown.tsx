import { useState } from "react"
import { DropDownMenu, MenuItem } from "./DropDownMenu"

interface DropDownProps {
    children: any,
    items: Array<MenuItem>,
    onSelect: any
}

export function DropDown(props: DropDownProps) {
    let [visible, setVisibility] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.children)

    return (
        <div>
            <div className="flex justify-center py-2 px-8 w-[170px] bg-slate-900 rounded-md text-white w-fit transition hover:bg-slate-800 cursor-pointer select-none"
                onClick={() => {setVisibility(!visible)}}
            >{title}</div>
            <DropDownMenu items={props.items} visible={visible} onClick={(key: string, value: string) => { setVisibility(false); props.onSelect(key); setTitle(value) }}/>
        </div>
    )
}