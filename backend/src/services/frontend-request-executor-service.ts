import { FrontendRequest } from "../frontend-request";
import { TableService } from "./table-service";

export class FrontendRequestExecutorService {
    constructor(private tableService: TableService) {}

    async execute(request: FrontendRequest) {
        return await this.tableService.get(request.page)
    }
}