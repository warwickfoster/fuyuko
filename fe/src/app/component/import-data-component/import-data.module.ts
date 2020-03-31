import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialsModule} from '../../app-materials.module';
import {ImportDataComponent} from './import-data.component';
import {DataTableModule} from '../data-table-component/data-table.module';
import {NotificationMessageListingModule} from '../notification-message-listing-component/notification-message-listing.module';
import {AttributeTableModule} from '../attribute-table-component/attribute-table.module';
import {PricingModule} from '../pricing-component/pricing.module';
import {CustomImportWizardComponent} from "./custom-import-wizard.component";
import {CustomImportListComponent} from "./custom-import-list.component";
import {ViewModule} from "../view-component/view.module";
import {CustomImportInputFormComponent} from "./custom-import-input-form.component";

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppMaterialsModule,
        DataTableModule,
        NotificationMessageListingModule,
        AttributeTableModule,
        PricingModule,
        ViewModule,
    ],
    declarations: [
        ImportDataComponent,
        CustomImportWizardComponent,
        CustomImportListComponent,
        CustomImportInputFormComponent,
    ],
    exports: [
        ImportDataComponent,
        CustomImportWizardComponent,
        CustomImportListComponent,
        CustomImportInputFormComponent,
    ]
})
export class ImportDataModule {

}
