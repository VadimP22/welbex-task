import { FrontendRequest } from "../frontend-request";
import { TableService } from "./table-service";

export class FrontendRequestExecutorService {
    constructor(private tableService: TableService) {}

    async execute(request: FrontendRequest) {
        if (request.haveFilter) {
            return await this.tableService.getFiltered(request.page, request.sortColumn, request.sortOrder, request.filterType, request.filterColumn, request.value)
        }

        return await this.tableService.get(request.page, request.sortColumn, request.sortOrder)
    }
}