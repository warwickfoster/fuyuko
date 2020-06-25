import {Component, OnDestroy, OnInit} from '@angular/core';
import {AttributeService} from '../../service/attribute-service/attribute.service';
import {ItemService} from '../../service/item-service/item.service';
import {combineLatest, forkJoin, Subscription, concat, Observable} from 'rxjs';
import {concatAll, concatMap, finalize, map, tap} from 'rxjs/operators';
import {Item, ItemSearchType, TableItem} from '../../model/item.model';
import {Attribute} from '../../model/attribute.model';
import {TableItemAndAttributeSet} from '../../model/item-attribute.model';
import {ViewService} from '../../service/view-service/view.service';
import {View} from '../../model/view.model';
import {DataTableComponentEvent} from '../../component/data-table-component/data-table.component';
import {toTableItem} from '../../utils/item-to-table-items.util';
import {ItemSearchComponentEvent} from '../../component/item-search-component/item-search.component';
import {ApiResponse, PaginableApiResponse} from '../../model/api-response.model';
import {toNotifications} from '../../service/common.service';
import {NotificationsService} from 'angular2-notifications';
import {CarouselComponentEvent} from "../../component/carousel-component/carousel.component";
import {Pagination} from "../../utils/pagination.utils";
import {PaginationComponentEvent} from "../../component/pagination-component/pagination.component";
import {LoadingService} from "../../service/loading-service/loading.service";
import {AuthService} from "../../service/auth-service/auth.service";
import {FormBuilder, FormControl} from "@angular/forms";


export type DataListTypes = 'ALL' | 'FAVOURITE';

@Component({
  templateUrl: './view-data-tabular.page.html',
  styleUrls: ['./view-data-tabular.page.scss']
})
export class ViewDataTabularPageComponent implements OnInit, OnDestroy {

  itemAndAttributeSet: TableItemAndAttributeSet;
  favouritedItemIds: number[];
  done: boolean;


  pagination: Pagination;
  search: string;
  searchType: ItemSearchType;
  currentView: View;
  subscription: Subscription;
  formControlDataListTypes: FormControl;

  constructor(private attributeService: AttributeService,
              private notificationService: NotificationsService,
              private viewService: ViewService,
              private itemService: ItemService,
              private loadingService: LoadingService,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
      this.pagination = new Pagination();
      this.favouritedItemIds = [];
      this.formControlDataListTypes = this.formBuilder.control('ALL', []);
  }

  ngOnInit(): void {
    this.search = '';
    this.searchType = 'basic';
    this.subscription = this.viewService.asObserver().subscribe((currentView: View) => {
      this.currentView = currentView;
      if (this.currentView) {
        this.reload();
      } else {
        this.done = true;
      }
    });
    this.formControlDataListTypes.valueChanges.pipe(
        tap((v: string) => {
            this.reload();
        })
    ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  reload() {
    this.done = false;
    this.loadingService.startLoading();
    const viewId = this.currentView.id;
    const userId = this.authService.myself().id;
    forkJoin([
      // all attributes in view
      this.attributeService.getAllAttributesByView(viewId)
          .pipe(map((r: PaginableApiResponse<Attribute[]>) => r.payload)),


      (this.search && this.searchType) ?
          // search in view
          (this.formControlDataListTypes.value === 'ALL' ?
            this.itemService.searchForItems(viewId, this.searchType, this.search, this.pagination.limitOffset()) :          // search for all items
            this.itemService.searchForFavouriteItems(viewId, userId,                                  // search for favourite items
                this.searchType, this.search, this.pagination.limitOffset()))

          :

          // non - search in view
          (this.formControlDataListTypes.value === 'ALL' ?
            this.itemService.getAllItems(viewId, this.pagination.limitOffset()) :                                           // get all items
            this.itemService.getFavouriteItems(viewId, userId, this.pagination.limitOffset()))       // get all favourite items
      ,


      // all favourite item ids of this user in view
      this.itemService.getFavouriteItemIds(viewId, userId)
    ]).pipe(
      map( (r: [Attribute[], PaginableApiResponse<Item[]>, number[]]) => {
       const attributes: Attribute[] = r[0];
       const items: Item[] = r[1].payload;
       this.pagination.update(r[1]);
       const tableItems: TableItem[] = toTableItem(items);
       this.itemAndAttributeSet = {
         attributes,
         tableItems,
       };
       this.favouritedItemIds = r[2];
       this.done = true;
      }),
      finalize(() => {
          this.done = true;
          this.loadingService.stopLoading();
      })
    ).subscribe();
  }


  onDataTableEvent($event: DataTableComponentEvent) {
    const o: Observable<ApiResponse>[] = [];
    if ($event.newItems && $event.newItems.length) {
        o.push(this.itemService.saveTableItems(this.currentView.id, $event.newItems));
    }
    if ($event.modifiedItems && $event.modifiedItems.length) {
        o.push(this.itemService.saveItems(this.currentView.id, $event.modifiedItems as any));
    }
    if ($event.deletedItems && $event.deletedItems.length) {
        o.push(this.itemService.deleteTableItems(this.currentView.id, $event.deletedItems));
    }
    switch ($event.type) {
      case 'modification': {
          concat(...o).pipe(
              tap((r: ApiResponse) => {
                  toNotifications(this.notificationService, r);
                  this.reload();
              })
          ).subscribe();
          break;
      }
      case 'reload': {
          this.reload();
          break;
      }
      case 'favourite': {
          this.itemService.addFavouriteItems(
              this.currentView.id,
              this.authService.myself().id,
              $event.favouritedItems.map((i: TableItem) => i.id))
              .pipe(
                  tap((r: ApiResponse) => {
                     toNotifications(this.notificationService, r);
                     this.reload();
                  })
              ).subscribe();
          break;
      }
      case 'unfavourite': {
          this.itemService.removeFavouriteItems(
              this.currentView.id,
              this.authService.myself().id,
              $event.favouritedItems.map((i: TableItem) => i.id))
              .pipe(
                  tap((r: ApiResponse) => {
                      toNotifications(this.notificationService, r);
                      this.reload();
                  })
              ).subscribe();
          break;
      }
    }
  }

  onDataTableSearchEvent($event: ItemSearchComponentEvent) {
    this.search = $event.search;
    this.searchType = $event.type;
    this.reload();
  }

  onCarouselEvent($event: CarouselComponentEvent) {
    switch ($event.type) {
      case "upload":
          this.itemService.uploadItemImage($event.itemId, $event.file).pipe(
              tap((r: ApiResponse) => {
                toNotifications(this.notificationService, r);
                this.reload();
              })
          ).subscribe();
        break;
      case "markAsPrimary":
        this.itemService.markItemImageAsPrimary($event.itemId, $event.image.id).pipe(
            tap((r: ApiResponse) => {
              toNotifications(this.notificationService, r);
              this.reload();
            })
        ).subscribe();
        break;
      case "delete":
        this.itemService.deleteItemImage($event.itemId, $event.image.id).pipe(
            tap((r: ApiResponse) => {
              toNotifications(this.notificationService, r);
              this.reload();
            })
        ).subscribe();
        break;
    }
  }

    onPaginationEvent($event: PaginationComponentEvent) {
      this.pagination.updateFromPageEvent($event.pageEvent);
      this.reload();
    }
}
