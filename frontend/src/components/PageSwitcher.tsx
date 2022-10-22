interface PageSwitchProps {
    page: number,
    setPage: any
}

export function PageSwitcher(props: PageSwitchProps) {
    return (
        <div className="flex justify-center">
            <div className="select-none p-2 text-slate-500 cursor-pointer hover:bg-slate-100 hover:text-slate-600 transition rounded-lg"
                onClick={() => {if (props.page > 0) {props.setPage(props.page - 1)}}}
            >предыдущая</div>

            <div className=" mx-4 w-auto rounded-lg bg-slate-100 text-slate-500 p-2">{props.page + 1}</div>
            
            <div className="select-none p-2 text-slate-500 cursor-pointer hover:bg-slate-100 hover:text-slate-600 transition rounded-lg"
                onClick={() => {props.setPage(props.page + 1)}}
            >следующая</div>
        </div>
    )
}