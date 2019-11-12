import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, NgModule, Provider} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginPageComponent} from './page/login-page/login.page';
import {Theme, ThemeService} from './service/theme-service/theme.service';
import {LoginLayoutComponent} from './layout/login-layout/login.layout';
import {AppMaterialsModule} from './app-materials.module';
import {BackgroundImageService} from './service/background-image-service/background-image.service';
import {RegisterPageComponent} from './page/register-page/register.page';
import {GenLayoutComponent} from './layout/gen-layout/gen.layout';
import {BulkEditPageComponent} from './page/bulk-edit-page/bulk-edit.page';
import {HelpCenterPageComponent} from './page/help-center-page/help-center.page';
import {ProfilePageComponent} from './page/profile-page/profile.page';
import {SettingsPageComponent} from './page/settings-page/settings.page';
import {FileNotFoundPageComponent} from './page/file-not-found-page/file-not-found.page';
import {BulkEditHelpPageComponent} from './page/bulk-edit-help-page/bulk-edit-help.page';
import {HelpCenterHelpPageComponent} from './page/help-center-help-page/help-center-help.page';
import {ProfileHelpPageComponent} from './page/profile-help-page/profile-help.page';
import {SettingsHelpPageComponent} from './page/settings-help-page/settings-help.page';
import {UserHelpPageComponent} from './page/user-help-page/user-help.page';
import {ViewHelpPageComponent} from './page/view-help-page/view-help.page';
import {ImportPageComponent} from './page/import-page/import.page';
import {ImportHelpPageComponent} from './page/import-help-page/import-help.page';
import {ExportPageComponent} from './page/export-page/export.page';
import {ExportHelpPageComponent} from './page/export-help-page/export-help.page';
import {NotificationComponent} from './component/notification-component/notification.component';
import {NotificationDialogComponent} from './component/notification-component/notification-dialog.component';
import {OverlayContainer} from '@angular/cdk/overlay';
import {AvatarComponent} from './component/avatar-component/avatar.component';
import {AvatarDialogComponent} from './component/avatar-component/avatar-dialog.component';
import {AvatarService} from './service/avatar-service/avatar.service';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import {Icons, NotificationAnimationType, Options, Position, SimpleNotificationsModule} from 'angular2-notifications';
import {ProfileInfoComponent} from './component/profile-info-component/profile-info.component';
import {PasswordComponent} from './component/password-component/password.component';
import {UserRolePageComponent} from './page/user-role-page/user-role.page';
import {UserGroupPageComponent} from './page/user-group-page/user-group.page';
import {UserPeoplePageComponent} from './page/user-people-page/user-people.page';
import {SideNavComponent} from './component/side-nav-component/side-nav.component';
import {UserLayoutComponent} from './layout/user-gen-layout/user-gen.layout';
import {HelpCenterLayoutComponent} from './layout/help-center-gen-layout/help-center-gen.layout';
import {ImportExportLayoutComponent} from './layout/import-export-gen-layout/import-export-gen.layout';
import {ViewLayoutComponent} from './layout/view-gen-layout/view-gen.layout';
import {PricingHelpPageComponent} from './page/pricing-help-page/pricing-help.page';
import {PricingPageComponent} from './page/pricing-page/pricing.page';
import {DashboardLayoutComponent} from './layout/dashboard-layout/dashboard.layout';
import {DashboardPageComponent} from './page/dashboard-page/dashboard.page';
import {UserManagementService} from './service/user-management-service/user-management.service';
import {GroupTableComponent} from './component/group-table-component/group-table.component';
import {UserTableComponent} from './component/user-table-component/user-table.component';
import {SendInviteComponent} from './component/send-invite-component/send-invite.component';
import {UserSearchTableComponent} from './component/user-search-table-component/user-search-table.component';
import {ViewAttributesPageComponent} from './page/view-attributes-page/view-attributes.page';
import {ViewDataTabularPageComponent} from './page/view-data-tabular-page/view-data-tabular.page';
import {ViewDataThumbnailPageComponent} from './page/view-data-thumbnail-page/view-data-thumbnail.page';
import {ViewDataListPageComponent} from './page/view-data-list-page/view-data-list.page';
import {ViewRulesPageComponent} from './page/view-rules-page/view-rules.page';
import {ViewViewsPageComponent} from './page/view-views-page/view-views.page';
import {ViewService} from './service/view-service/view.service';
import {AuthService} from './service/auth-service/auth.service';
import {AuthGuard} from './guard/auth-guard/auth.guard';
import {AppNotification} from './model/notification.model';
import {AppNotificationService} from './service/app-notification-service/app-notification.service';
import {AttributeTableComponent} from './component/attribute-table-component/attribute-table.component';
import {EditAttributeDialogComponent} from './component/attribute-table-component/edit-attribute-dialog.component';
import {AttributeService} from './service/attribute-service/attribute.service';
import {AttributeTableModule} from './component/attribute-table-component/attribute-table.module';
import {DataTableModule} from './component/data-table-component/data-table.module';
import {ItemService} from './service/item-service/item.service';
import {DataEditorModule} from './component/data-editor-component/data-editor.module';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {ItemSearchComponent} from './component/item-search-component/item-search.component';
import {ItemSearchModule} from './component/item-search-component/item-search.module';
import {RuleService} from './service/rule-service/rule.service';
import {RulesModule} from './component/rules-component/rules.module';
import {CounterService} from './service/counter-service/counter.service';
import {DataThumbnailModule} from './component/data-thumbnail-component/data-thumbnail.module';
import {DataListModule} from './component/data-list-component/data-list.module';
import {CarouselComponent} from './component/carousel-component/carousel.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProfilingInterceptor} from './interceptor/profiling.interceptor';
import {ErrorPageComponent} from './page/error-page/error.page';
import {GlobalErrorhandler} from './error-handler/global.errorhandler';
import {CarouselModule} from './component/carousel-component/carousel.module';
import {ViewModule} from './component/view-component/view.module';
import {BulkEditWizardModule} from './component/bulk-edit-wizard-component/bulk-edit-wizard.module';
import {DATE_FORMAT} from './model/item.model';
import {BulkEditService} from './service/bulk-edit-service/bulk-edit.service';
import {JobsPageComponent} from './page/jobs-page/jobs.page';
import {JobsHelpPageComponent} from './page/jobs-help-page/jobs-help.page';
import {JobsService} from './service/jobs-service/jobs.service';
import {JobsModule} from './component/jobs-component/jobs.module';
import {UtilsModule} from './utils/utils.module';
import {PricingModule} from './component/pricing-component/pricing.module';
import {PricingStructureService} from './service/pricing-structure-service/pricing-structure.service';
import {ImportDataModule} from './component/import-data-component/import-data.module';
import {ExportDataModule} from './component/export-data-component/export-data.module';
import {ImportDataService} from './service/import-data-service/import-data.service';
import {ExportDataService} from './service/export-data-service/export-data.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SettingsService} from './service/settings-service/settings.service';
import {tap} from 'rxjs/operators';
import {User} from './model/user.model';
import {SettingsModule} from './component/settings-component/settings.module';
import {ForumPageComponent} from './page/forum-page/forum.page';
import {ForumHelpPageComponent} from './page/forum-help-page/forum-help.page';
import {HelpCenterModule} from './component/help-center-component/help-center.module';
import {HelpCenterService} from './service/help-center-service/help-center.service';
import {ForumService} from './service/forum-service/forum.service';
import {AllForumsPageComponent} from './page/forum-page/all-forums.page';
import {AllTopicsInForumPageComponent} from './page/forum-page/all-topics-in-forum.page';
import {AllPostsInTopicPageComponent} from './page/forum-page/all-posts-in-topic.page';
import {ForumModule} from './component/forum-component/forum.module';
import {DashboardModule} from './component/dashboard-component/dashboard.module';
import {DashboardService} from './service/dashboard-service/dashboard.service';
import {DashboardWidgetService} from './service/dashboard-service/dashbowd-widget.service';
import {ActivatePageComponent} from './page/activate-page/activate.page';
import {UserInvitationPageComponent} from './page/user-invitation-page/user-invitation.page';
import {ActivationService} from './service/activation-service/activation.service';
import {UserActivationPageComponent} from './page/user-activation-page/user-activation.page';
import {InvitationService} from './service/invitation-service/invitation.service';

const appInitializer = (settingsService: SettingsService, authService: AuthService) => {
  return () => {
    authService.asObservable()
      .pipe(
        tap((u: User) => {
        if (u == null) { // logout
          settingsService.destroyRuntimeSettings().subscribe();
        } else { // login
          settingsService.getRuntimeSettings(u).subscribe();
        }
      })
      ).subscribe();
  };
};

@NgModule({
  declarations: [
    AppComponent,

    // layouts
    LoginLayoutComponent,
    DashboardLayoutComponent,
    GenLayoutComponent,
    UserLayoutComponent,
    HelpCenterLayoutComponent,
    ImportExportLayoutComponent,
    ViewLayoutComponent,

    // pages
    LoginPageComponent,
    DashboardPageComponent,
    RegisterPageComponent,
    ActivatePageComponent,
    BulkEditPageComponent,
    BulkEditHelpPageComponent,
    HelpCenterPageComponent,
    HelpCenterHelpPageComponent,
    ProfilePageComponent,
    ProfileHelpPageComponent,
    SettingsPageComponent,
    SettingsHelpPageComponent,
    UserRolePageComponent,
    UserGroupPageComponent,
    UserPeoplePageComponent,
    UserInvitationPageComponent,
    UserActivationPageComponent,
    UserHelpPageComponent,
    ViewHelpPageComponent,
    ImportPageComponent,
    ImportHelpPageComponent,
    ExportHelpPageComponent,
    ExportPageComponent,
    PricingPageComponent,
    PricingHelpPageComponent,
    FileNotFoundPageComponent,
    ViewAttributesPageComponent,
    ViewDataTabularPageComponent,
    ViewDataThumbnailPageComponent,
    ViewDataListPageComponent,
    ViewRulesPageComponent,
    ViewViewsPageComponent,
    JobsPageComponent,
    JobsHelpPageComponent,
    ForumPageComponent,
    ForumHelpPageComponent,
    AllForumsPageComponent,
    AllTopicsInForumPageComponent,
    AllPostsInTopicPageComponent,
    ErrorPageComponent,

    // components
    NotificationComponent,
    NotificationDialogComponent,
    AvatarComponent,
    AvatarDialogComponent,
    ProfileInfoComponent,
    PasswordComponent,
    SideNavComponent,
    GroupTableComponent,
    UserTableComponent,
    UserSearchTableComponent,
    SendInviteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppMaterialsModule,
    AngularFileUploaderModule,
    FlexLayoutModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot({
      position: ['bottom', 'center'],
      timeOut: 2000,
      showProgressBar: true,
      pauseOnHover: true,
      lastOnBottom: true,
      clickToClose: true,
      clickIconToClose: true,
      maxLength: 0,
      theClass: 'message-toast',
      animate: NotificationAnimationType.Fade
    } as Options),

    // custom modules
    AttributeTableModule,
    DataTableModule,
    DataEditorModule,
    ItemSearchModule,
    RulesModule,
    DataThumbnailModule,
    DataListModule,
    CarouselModule,
    ViewModule,
    BulkEditWizardModule,
    JobsModule,
    UtilsModule,
    PricingModule,
    ImportDataModule,
    ExportDataModule,
    SettingsModule,
    HelpCenterModule,
    ForumModule,
    DashboardModule,
  ],
  providers: [
    {provide: ThemeService, useClass: ThemeService} as Provider,
    {provide: BackgroundImageService, useClass: BackgroundImageService} as Provider,
    {provide: AppNotificationService, useClass: AppNotificationService} as Provider,
    {provide: AvatarService, useClass: AvatarService} as Provider,
    {provide: UserManagementService, useClass: UserManagementService} as Provider,
    {provide: ViewService, useClass: ViewService} as Provider,
    {provide: AuthService, useClass: AuthService} as Provider,
    {provide: AuthGuard, useClass: AuthGuard} as Provider,
    {provide: AttributeService, useClass: AttributeService} as Provider,
    {provide: ItemService, useClass: ItemService} as Provider,
    {provide: RuleService, useClass: RuleService} as Provider,
    {provide: CounterService, useClass: CounterService} as Provider,
    {provide: BulkEditService, useClass: BulkEditService} as Provider,
    {provide: JobsService, useClass: JobsService} as Provider,
    {provide: PricingStructureService, useClass: PricingStructureService} as Provider,
    {provide: ImportDataService, useClass: ImportDataService} as Provider,
    {provide: ExportDataService, useClass: ExportDataService} as Provider,
    {provide: SettingsService, useClass: SettingsService} as Provider,
    {provide: HelpCenterService, useClass: HelpCenterService} as Provider,
    {provide: ForumService, useClass: ForumService} as Provider,
    {provide: DashboardService, useClass: DashboardService} as Provider,
    {provide: DashboardWidgetService, useClass: DashboardWidgetService} as Provider,
    {provide: ActivationService, useClass: ActivationService} as Provider,
    {provide: InvitationService, useClass: InvitationService} as Provider,

    {provide: APP_INITIALIZER, useFactory: appInitializer,  multi: true, deps: [SettingsService, AuthService] } as Provider,
    {provide: DateAdapter, useClass: MomentDateAdapter} as Provider,
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT},
    {provide: HTTP_INTERCEPTORS, useClass: ProfilingInterceptor, multi: true} as Provider,
    // {provide: HTTP_INTERCEPTORS, useClass: ExceptionHandling, multi: true} as Provider,
    {provide: ErrorHandler, useClass: GlobalErrorhandler} as Provider,
  ],
  entryComponents: [
    NotificationDialogComponent,
    AvatarDialogComponent,
    EditAttributeDialogComponent,
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

