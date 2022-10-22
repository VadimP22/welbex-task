import { TableItem } from "./services/table-service";

export function getMockData(count: number): Array<TableItem> {
    let data: TableItem
    let array: Array<TableItem> = []

    for (let i = 0; i < count; i++) {
        data = {
            count: Math.floor(Math.random() * 1000),
            date: "2011-04-30", 
            distance: Math.floor(Math.random() * 1000), 
            name: Math.floor(Math.random() * 1000).toString()
        }

        array.push(data)
    }

    return array
}