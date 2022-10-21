import express from "express"
import { ConfigurationService } from "./services/configuration-service";
import { DatabaseCreationService } from "./services/database-creation-service";
import { PostgreService } from "./services/postgre-service";


const app = express()
const configurationService = new ConfigurationService()
const databaseCreationService = new DatabaseCreationService(configurationService)
const postgreService = new PostgreService(configurationService, databaseCreationService)


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
    console.log("App is listening on port 8088")
})