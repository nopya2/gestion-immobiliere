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
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { QuillModule } from 'ngx-quill'

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
import { EtablishmentAddComponent } from './etablishment/etablishment-add/etablishment-add.component';

//Reducers
import { countryReducer } from '../shared/store/country.reducer';
import { EtablishmentShowComponent } from './etablishment/etablishment-show/etablishment-show.component';
import { AddManagerEtablishmentComponent } from './etablishment/add-manager-etablishment/add-manager-etablishment.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeAddComponent } from './employee/employee-add/employee-add.component';
import { EmployeeResetPwdComponent } from './employee/employee-reset-pwd/employee-reset-pwd.component';
import { PermissionComponent } from './permission/permission.component';
import { PermissionModalComponent } from './permission/permission-modal/permission-modal.component';
import { ModuleComponent } from './module/module.component';
import { ModuleModalComponent } from './module/module-modal/module-modal.component';
import { RoleComponent } from './role/role.component';
import { RoleModalComponent } from './role/role-modal/role-modal.component';
import { DiplomaComponent } from './diploma/diploma.component';
import { DiplomaModalComponent } from './diploma/diploma-modal/diploma-modal.component';
import { FacultyComponent } from './faculty/faculty.component';
import { FacultyModalComponent } from './faculty/faculty-modal/faculty-modal.component';
import { FacultyAddDiplomaModalComponent } from './faculty/faculty-add-diploma-modal/faculty-add-diploma-modal.component';
import { LevelTypeComponent } from './level-type/level-type.component';
import { LevelTypeModalComponent } from './level-type/level-type-modal/level-type-modal.component';
import { LevelComponent } from './level/level.component';
import { LevelModalComponent } from './level/level-modal/level-modal.component';
import { CycleComponent } from './cycle/cycle.component';
import { CycleModalComponent } from './cycle/cycle-modal/cycle-modal.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentModalComponent } from './department/department-modal/department-modal.component';
import { LevelShowComponent } from './level/level-show/level-show.component';

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
    NzImageModule,
    NzTypographyModule,
    NzAlertModule
]

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        PagesRoutingModule,
        QuillModule.forRoot(),
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
        EtablishmentAddComponent,
        EtablishmentShowComponent,
        AddManagerEtablishmentComponent,
        EmployeeComponent,
        EmployeeAddComponent,
        EmployeeResetPwdComponent,
        PermissionComponent,
        PermissionModalComponent,
        ModuleComponent,
        ModuleModalComponent,
        RoleComponent,
        RoleModalComponent,
        DiplomaComponent,
        DiplomaModalComponent,
        FacultyComponent,
        FacultyModalComponent,
        FacultyAddDiplomaModalComponent,
        LevelTypeComponent,
        LevelTypeModalComponent,
        LevelComponent,
        LevelModalComponent,
        CycleComponent,
        CycleModalComponent,
        DepartmentComponent,
        DepartmentModalComponent,
        LevelShowComponent
    ],
    providers: [
    ]
})

export class PagesModule {}