import {Component, OnDestroy, OnInit} from '@angular/core';
import {Attribute} from '../../model/attribute.model';
import {AttributeService} from '../../service/attribute-service/attribute.service';
import {ViewService} from '../../service/view-service/view.service';
import {View} from '../../model/view.model';
import {finalize, map, tap} from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';
import {Observable, Subscription} from 'rxjs';
import {PaginableApiResponse} from "../../model/api-response.model";
import {
    BulkEditWizardComponentEvent,
    GetJobLogsFn,
    GetPreviewFn, ScheduleBulkEditJobFn
} from "../../component/bulk-edit-wizard-component/bulk-edit-wizard.component";
import {ItemValueAndAttribute, ItemValueOperatorAndAttribute} from "../../model/item-attribute.model";
import {BulkEditPackage} from "../../model/bulk-edit.model";
import {JobAndLogs} from "../../model/job.model";
import {JobsService} from "../../service/jobs-service/jobs.service";
import {BulkEditService} from "../../service/bulk-edit-service/bulk-edit.service";
import {NotificationsService} from "angular2-notifications";
import {LoadingService} from "../../service/loading-service/loading.service";


@Component({
  templateUrl: './bulk-edit.page.html',
  styleUrls: ['./bulk-edit.page.scss']
})
export class BulkEditPageComponent implements OnInit, OnDestroy {

  attributes: Attribute[];
  allViews: View[];

  currentView: View;
  subscription: Subscription;
  getJobLogsFn: GetJobLogsFn;
  getPreviewFn: GetPreviewFn;
  scheduleBulkEditJobFn: ScheduleBulkEditJobFn;


  constructor(private viewService: ViewService,
              private jobsService: JobsService,
              private bulkEditService: BulkEditService,
              private notificationsService: NotificationsService,
              private attributeService: AttributeService,
              private loadingService: LoadingService) {}

  ngOnInit(): void {
      this.getJobLogsFn = (jobId: number, lastLogId: number): Observable<JobAndLogs> => {
          this.loadingService.startLoading();
          return this.jobsService.jobLogs(jobId, lastLogId).pipe(
              finalize(() => this.loadingService.stopLoading())
          );
      };
      this.getPreviewFn = (view: View, changeClauses: ItemValueAndAttribute[], whereClauses: ItemValueOperatorAndAttribute[]): Observable<BulkEditPackage> => {
          this.loadingService.startLoading();
          return this.bulkEditService.previewBuilEdit(view.id, changeClauses, whereClauses).pipe(
              finalize(() => this.loadingService.stopLoading()));
      };
      this.scheduleBulkEditJobFn = (view: View, bulkEditPackage: BulkEditPackage) => {
          this.loadingService.startLoading();
          return this.jobsService.scheduleBulkEditJob(view.id, bulkEditPackage).pipe(
              finalize(() => this.loadingService.stopLoading()));
      };
      this.loadingService.startLoading();
      this.viewService.getAllViews()
          .pipe(
            map((v: View[]) => {
                this.allViews = v;
            }),
            map(() => {
                this.subscription = this.viewService.asObserver()
                    .pipe(
                        map((v: View) => {
                            if (v) {
                                this.loadingService.startLoading();
                                this.currentView = this.allViews ? this.allViews.find((vv: View) => vv.id === v.id) : undefined;
                                this.subscription = this.attributeService.getAllAttributesByView(this.currentView.id)
                                    .pipe(
                                        map((r: PaginableApiResponse<Attribute[]>) => r.payload),
                                        map((a: Attribute[]) => {
                                            this.attributes = a;
                                        }),
                                        finalize(() => {
                                            this.loadingService.stopLoading();
                                        })
                                    ).subscribe();
                            }
                        }),
                    ).subscribe();
            }),
            finalize(() => {
                this.loadingService.stopLoading();
            })
          ).subscribe();
  }

    onViewSelectionChanged($event: MatSelectChange) {
        const view: View = $event.value;
        this.viewService.setCurrentView(view);
    }

    ngOnDestroy(): void {
      if (this.subscription) {
          this.subscription .unsubscribe();
      }
    }

    onBulkEditWizardEvent($event: BulkEditWizardComponentEvent) {
      switch($event.type) {
          case "error": {
              this.notificationsService.error('Error', $event.message);
              break;
          }
      }
    }
}