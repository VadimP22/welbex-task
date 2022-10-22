import { Client, Pool } from "pg";
import { ConfigurationService } from "./configuration-service";

export class DatabaseCreationService {
    private client: Client
    private isDbConnected: boolean

    constructor(private configurationService: ConfigurationService) {
        this.isDbConnected = false
        this.client = new Client({
            user: configurationService.getDbUsername(),
            password: configurationService.getDbPassword(),
            host: configurationService.getDbHost(),
            port: configurationService.getDbPort()
        })
    }

    async create() {
        if (!this.isDbConnected) {
            try {
                await this.client.connect()
            } catch (e) {
                console.log("FATAL: Cant connect to postgresql! ", e)
                process.exit(1)
            }
            this.isDbConnected = true
        }

        console.log("INFO: Trying to create database " + this.configurationService.getDbName() + "...")
        try {
            await this.client.query("CREATE DATABASE " + this.configurationService.getDbName())
            console.log("INFO: Database created!")
        } catch {
            console.log("INFO: Database exists!")
        }
    }
}