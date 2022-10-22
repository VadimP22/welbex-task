import express from "express"
import path from "path";
import { parseQueryParams } from "./parse-query-params";
import { ConfigurationService } from "./services/configuration-service";
import { DatabaseCreationService } from "./services/database-creation-service";
import { FrontendRequestExecutorService } from "./services/frontend-request-executor-service";
import { PostgreService } from "./services/postgre-service";
import { TableService } from "./services/table-service";


const app = express()
app.use(express.static(path.join(__dirname, 'build')));

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
        res.send({rows: result})
    } catch (e) {
        console.log("ERROR: ", e)
        res.status(404)
        res.send(e)
    }
    
})


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8088, () => {
    console.log("INFO: App is listening on port 8088")
})