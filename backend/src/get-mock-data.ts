import { TableItem } from "./services/table-service";

function generateTwoDigitNumber(): number {
    let num = Math.floor(Math.random() * 99)

    if (num < 10) {
        num += 10
    }

    return num
}

function randomString(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function getMockData(count: number): Array<TableItem> {
    let data: TableItem
    let array: Array<TableItem> = []

    for (let i = 0; i < count; i++) {
        data = {
            count: Math.floor(Math.random() * 1000),
            date: "20" + generateTwoDigitNumber() + "-04-30", 
            distance: Math.floor(Math.random() * 1000), 
            name: randomString(10)
        }

        array.push(data)
    }

    return array
}