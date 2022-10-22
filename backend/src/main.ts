import express from "express"
import { Pool } from "pg";
import { parseQueryParams } from "./parse-query-params";
import { ConfigurationService } from "./services/configuration-service";
import { DatabaseCreationService } from "./services/database-creation-service";
import { FrontendRequestExecutorService } from "./services/frontend-request-executor-service";
import { PostgreService } from "./services/postgre-service";
import { TableService } from "./services/table-service";


const app = express()
const configurationService = new ConfigurationService()
const databaseCreationService = new DatabaseCreationService(configurationService)
const postgreService = new PostgreService(configurationService, databaseCreationService)
const tableService = new TableService(postgreService)
const frontendRequestExecutorService = new FrontendRequestExecutorService(tableService)


//params: page, order, filter, column, value
app.get("/api/v1", async (req, res) => {
    console.log("DEBUG: query params: ", req.query)

    let frontendRequest = parseQueryParams(req.query)
    console.log("DEBUG: parsed", frontendRequest)

    try {
        let result = await frontendRequestExecutorService.execute(frontendRequest)
        res.send(result)
    } catch (e) {
        res.status(404)
        res.send(e)
    }
    
})

app.get("/", async (req, res) => {
    try {
        await postgreService.query("CREATE TABLE Foo(id INT)")
    }
    catch {}
    res.send({string: "HTML will be there"})
})

app.get("/js", async (req, res) => {
    res.send("Js will be there")
})

app.get("/css", async (req, res) => {
    res.send("CSS will be there")
})



app.listen(8088, () => {
    console.log("INFO: App is listening on port 8088")
})