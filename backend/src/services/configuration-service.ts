export class ConfigurationService {
    constructor() {
        console.log("Enviroment:")
        console.log("PG_USERNAME: ", process.env.PG_USERNAME)
        console.log("PG_PASSWORD: ", process.env.PG_PASSWORD)
        console.log("PG_HOST: ", process.env.PG_HOST)
        console.log("PG_PORT: ", process.env.PG_PORT)
        console.log("PG_DB: ", process.env.PG_DB)
    }

    getDbUsername(): string {
        if (process.env.PG_USERNAME === undefined) {
            return "postgres"
        }

        return process.env.PG_USERNAME as string
    }

    getDbPassword(): string {
        if (process.env.PG_PASSWORD === undefined) {
            return "password"
        }

        return process.env.PG_PASSWORD as string
    }

    getDbHost(): string {
        if (process.env.PG_HOST === undefined) {
            return "127.0.0.1"
        }

        return process.env.PG_HOST as string
    }

    getDbPort(): number {
        if (process.env.PG_PORT === undefined) {
            return 49154
        }

        try {
            return parseInt(process.env.PG_PORT)
        } catch {
            console.log("Error while parsing PG_PORT!")
            return 49154
        }
    }

    getDbName(): string {
        if (process.env.PG_DB === undefined) {
            return "app_database"
        }

        return process.env.PG_DB as string
    }
}