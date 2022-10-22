import { getMockData } from "../get-mock-data";
import { PostgreService } from "./postgre-service";

export interface TableItem {
    date: string,
    name: string,
    count: number,
    distance: number
}

export class TableService {
    private isTableCreated: boolean

    constructor(private postgreService: PostgreService) {
        this.isTableCreated = false
    }

    private async checkTableCreated() {
        if (!this.isTableCreated) {
            console.log("INFO: Trying to create table...")
            try {
                await this.postgreService.query("CREATE TABLE AppTable(date DATE, name VARCHAR, count INT, distance INT)")
                console.log("INFO: Table created!")
                this.isTableCreated = true

                console.log("INFO: Inserting mock data...")
                let mockData = getMockData(50)
                for (let item of mockData) {
                     this.unsafeInsert(item)
                }

                console.log("INFO: Mock data inserted!")
            } catch (e) {
                console.log("INFO: Table exists!")
            }
        }
    }
    private async unsafeInsert(item: TableItem) {
        await this.postgreService.query("INSERT INTO AppTable(date, name, count, distance) VALUES ('" + item.date + "','" + item.name + "'," + item.count + "," + item.distance + ")")
    }

    async insert(item: TableItem) {
        await this.checkTableCreated()
        await this.unsafeInsert(item)
    }

    async get(page: number) {
        await this.checkTableCreated()
        let rows = (await this.postgreService.query("SELECT * FROM AppTable ORDER BY date")).rows
        let result: Array<any> = []

        for (let i = 0; i < rows.length; i++) {
            if (i >= page * 10 && i < (page * 10) + 10) {
                result.push(rows[i])
            }
        }

        return result
    }
}