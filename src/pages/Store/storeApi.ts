import { APIRequestContext } from "@playwright/test";
import { BaseAPI } from "../BaseAPI";

export class StoreApi extends BaseAPI{
    constructor(request: APIRequestContext, baseUrl: string){
        super(request, baseUrl)
    }
    
}