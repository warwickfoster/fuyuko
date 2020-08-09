import {Injectable} from "@angular/core";
import config from "../../../../utils/config.util";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reporting_ItemsWithMissingAttributeInfo} from "../../../../model/reporting.model";
import {ApiResponse} from "../../../../model/api-response.model";
import {map} from "rxjs/operators";

const URL_GET_MISSING_ATTRIBUTE_VALUES = () => `${config().api_host_url}/reporting/missing-attribute-values`;

@Injectable()
export class MissingAttributeValueWidgetService {

    constructor(private httpClient: HttpClient) {}


    getMissingAttributeValues(): Observable<Reporting_ItemsWithMissingAttributeInfo> {
        return this.httpClient
            .get<ApiResponse<Reporting_ItemsWithMissingAttributeInfo>>(URL_GET_MISSING_ATTRIBUTE_VALUES())
            .pipe(
                map((r: ApiResponse<Reporting_ItemsWithMissingAttributeInfo>) => r.payload)
            )
            ;
    }
}