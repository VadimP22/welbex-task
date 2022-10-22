import { Client, Pool, QueryResult } from "pg";
import { ConfigurationService } from "./configuration-service";
import { DatabaseCreationService } from "./database-creation-service";

export class PostgreService {
    private client: Client
    private isConnected: boolean
    private isDatabaseCreated: boolean

    constructor(private configurationService: ConfigurationService, private databaseCreationService: DatabaseCreationService) {
        this.isConnected = false
        this.isDatabaseCreated = false

        this.client = new Client({
            user: configurationService.getDbUsername(),
            password: configurationService.getDbPassword(),
            host: configurationService.getDbHost(),
            database: configurationService.getDbName(),
            port: configurationService.getDbPort()
        })
    }

    async query(query: string): Promise<QueryResult<any>> {
        if (!this.isDatabaseCreated) {
            await this.databaseCreationService.create()
            this.isDatabaseCreated = true
        }

        if (!this.isConnected) {
            try {
                await this.client.connect()
                this.isConnected = true
            }
            catch (e) {
                console.log("FATAL: Can't connect to database! ", e)
                process.exit(1)
            }
        }

        console.log("DEBUG: executing " + query)
        return await this.client.query(query)
    }
}