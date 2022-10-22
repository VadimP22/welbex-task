export class ConfigurationService {
    constructor() {
        console.log("DEBUG: Configuration:")
        console.log("DEBUG: dbUsername: ", this.getDbUsername())
        console.log("DEBUG: dbPassword: ", this.getDbPassword())
        console.log("DEBUG: dbHost: ", this.getDbHost())
        console.log("DEBUG: dbPort: ", this.getDbPort())
        console.log("DEBUG: dbName: ", this.getDbName())
    }

    getDbUsername(): string {
        return process.env.PG_USERNAME || "postgres"
    }

    getDbPassword(): string {
        return process.env.PG_PASSWORD || "password"
    }

    getDbHost(): string {
        return process.env.PG_HOST || "127.0.0.1"
    }

    getDbPort(): number {
        if (process.env.PG_PORT === undefined) {
            return 49153
        }

        try {
            return parseInt(process.env.PG_PORT)
        } catch {
            console.log("Error while parsing PG_PORT!")
            return 49153
        }
    }

    getDbName(): string {
        return process.env.PG_DB || "app_database"
    }
}