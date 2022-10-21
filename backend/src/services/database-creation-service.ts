import { Client } from "pg";
import { ConfigurationService } from "./configuration-service";

export class DatabaseCreationService {
    private client: Client

    constructor(private configurationService: ConfigurationService) {
        this.client = new Client({
            user: configurationService.getDbUsername(),
            password: configurationService.getDbPassword(),
            host: configurationService.getDbHost(),
            port: configurationService.getDbPort()
        })
    }

    async create() {
        try {
            await this.client.connect()
        } catch {
            console.log("Error! Cant connect to postgresql!")
        }

        console.log("Trying to create database " + this.configurationService.getDbName() + "...")
        try {
            await this.client.query("CREATE DATABASE " + this.configurationService.getDbName())
            console.log("Successfull!")
        } catch {
            console.log("Database exists!")
        }
    }
}