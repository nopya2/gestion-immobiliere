import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { StoreModule } from '@ngrx/store';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzImageModule } from 'ng-zorro-antd/image';

import { ProfileComponent } from './profile/profile.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { MembersComponent } from './members/members.component';
import { PricingComponent } from './pricing/pricing.component';
import { SettingComponent } from './setting/setting.component';
import { BlogGridComponent } from './blog/blog-grid/blog-grid.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserResetPwdComponent } from './user/user-reset-pwd/user-reset-pwd.component';
import { EtablishmentComponent } from './etablishment/etablishment.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerAddComponent } from './manager/manager-add/manager-add.component';
import { ManagerResetPwdComponent } from './manager/manager-reset-pwd/manager-reset-pwd.component';
import { EtablishmentAddComponent } from './etablishment/etablishment-add/etablishment-add.component';

//Reducers
import { countryReducer } from '../shared/store/country.reducer';

const antdModule = [
    NzCardModule,
    NzSkeletonModule,
    NzAvatarModule,
    NzPaginationModule,
    NzDividerModule,
    NzButtonModule,
    NzListModule,
    NzTableModule,
    NzRadioModule,
    NzRateModule,
    NzTabsModule,
    NzTagModule,
    NzFormModule,
    NzDatePickerModule,
    NzSelectModule,
    NzSwitchModule,
    NzUploadModule,
    NzToolTipModule,
    NzModalModule,
    NzMessageModule,
    NzInputModule,
    NzCheckboxModule,
    NgxMaskModule.forRoot(),
    NzBadgeModule,
    NzIconModule,
    NzPopoverModule,
    StoreModule.forRoot({ countries: countryReducer }),
    NzImageModule
]

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        PagesRoutingModule,
        ...antdModule
    ],
    declarations: [
        ProfileComponent,
        InvoiceComponent,
        MembersComponent,
        PricingComponent,
        SettingComponent,
        BlogGridComponent,
        BlogListComponent,
        BlogPostComponent,
        UserComponent,
        UserAddComponent,
        UserResetPwdComponent,
        EtablishmentComponent,
        ManagerComponent,
        ManagerAddComponent,
        ManagerResetPwdComponent,
        EtablishmentAddComponent
    ],
    providers: [
    ]
})

export class PagesModule {}