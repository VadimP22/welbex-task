interface AppTableHeaderItemProps {
    children: any,
    roundedTopLeft?: boolean,
    roundedTopRight?: boolean,
    keyProp: string,
    currentSortKey: string,
    onClick: any,
    isSortOrderIncrease: boolean
}

function SortIcon(props: any) {
    if (props.increase) {
        return <div>↑</div>
    }

    return <div>↓</div>
}

function SortIconContainer(props: any) {
    if (props.keyProp == props.currentSortKey) {
        return <div className="w-[10px]">
            <SortIcon increase={props.isSortOrderIncrease} />
        </div>
    }

    else return <div className="w-[10px]"></div>
}

export function AppTableHeaderItem(props: AppTableHeaderItemProps) {
    let classNameAddition = ""

    if (props.roundedTopLeft) {
        classNameAddition += " rounded-tl-lg"
    }

    if (props.roundedTopRight) {
        classNameAddition += " rounded-tr-lg"
    }

    return (
        <th className={"font-normal bg-slate-900 text-white px-8 py-4 cursor-pointer select-none" + classNameAddition} onClick={() => {props.onClick(props.keyProp)}}>
            <div className="flex justify-between">
                <div>{props.children}</div>
                <SortIconContainer isSortOrderIncrease={props.isSortOrderIncrease} keyProp={props.keyProp} currentSortKey={props.currentSortKey} />
            </div>
        </th>
    )
}