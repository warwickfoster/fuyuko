import {Component, OnInit} from "@angular/core";
import {PricingStructureGroupAssociation} from "../../model/pricing-structure.model";
import { GroupSearchFn } from '../../component/group-table-component/group-table.component';
import {UserManagementService} from "../../service/user-management-service/user-management.service";
import {finalize, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {Group} from "../../model/group.model";
import {PricingStructureService} from "../../service/pricing-structure-service/pricing-structure.service";
import {PricingStructureGroupAssociationComponentEvent} from "../../component/pricing-component/pricing-structure-group-association.component";
import {ApiResponse} from "../../model/api-response.model";
import {toNotifications} from "../../service/common.service";
import {NotificationsService} from "angular2-notifications";
import {LoadingService} from "../../service/loading-service/loading.service";


@Component({
    templateUrl: './pricing-structure-partner-association.page.html',
    styleUrls: ['./pricing-structure-partner-association.page.scss']
})
export class PricingStructurePartnerAssociationPageComponent implements OnInit {

    loading: boolean;
    pricingStructureGroupAssociations: PricingStructureGroupAssociation[];
    groupSearchFnsMap: Map<number /* pricingStructureId */, GroupSearchFn>;

    constructor(private userManagementService: UserManagementService,
                private notificationsService: NotificationsService,
                private pricingStructureService: PricingStructureService,
                private loadingService: LoadingService) {}

    ngOnInit(): void {
        this.reload();
    }

    reload() {
        this.loading = true;
        this.loadingService.startLoading();
        this.groupSearchFnsMap = new Map();
        this.pricingStructureService.getPricingStructureGroupAssociation()
            .pipe(
                tap((r: PricingStructureGroupAssociation[]) => {
                    this.pricingStructureGroupAssociations = r;
                    for (const _r of r) {
                        this.groupSearchFnsMap.set(_r.pricingStructure.id, (group: string): Observable<Group[]> => {
                            return this.userManagementService.findGroupsNotAssociatedWithPricingStructure(_r.pricingStructure.id, group);
                        })
                    }
                    this.loading = false;
                }),
                finalize(() => {
                    this.loading = false;
                    this.loadingService.stopLoading();
                })
            ).subscribe();
    }


    onPricingStructureGroupAssociationEvent($event: PricingStructureGroupAssociationComponentEvent) {
        switch($event.type) {
            case "link": {
                this.pricingStructureService.linkPricingStructureGroup($event.pricingStructure.id, $event.group.id)
                    .pipe(
                        tap((r: ApiResponse) => {
                            const g: Group = $event.group;
                            const a: PricingStructureGroupAssociation = this.pricingStructureGroupAssociations.find((a: PricingStructureGroupAssociation) => a.pricingStructure.id === $event.pricingStructure.id);
                            this.userManagementService.findGroupsAssociatedWithPricingStructure($event.pricingStructure.id, '').pipe(
                                tap((g: Group[]) => {
                                    a.groups = g;
                                })
                            ).subscribe();
                            toNotifications(this.notificationsService, r);
                        })
                    ).subscribe();
                break;
            }
            case 'unlink': {
                this.pricingStructureService.unlinkPricingStructureGroup($event.pricingStructure.id, $event.group.id).pipe(
                    tap((r: ApiResponse) => {
                        const g: Group = $event.group;
                        const a: PricingStructureGroupAssociation = this.pricingStructureGroupAssociations.find((a: PricingStructureGroupAssociation) => a.pricingStructure.id === $event.pricingStructure.id);
                        this.userManagementService.findGroupsAssociatedWithPricingStructure($event.pricingStructure.id, '').pipe(
                            tap((g: Group[]) => {
                                a.groups = g;
                            })
                        ).subscribe();
                        toNotifications(this.notificationsService, r);
                    })
                ).subscribe();
                break;
            }
        }
    }

    reloadClicked($event: MouseEvent) {
        this.reload();
    }
}