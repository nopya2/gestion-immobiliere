import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/shared/guard/auth.guard';

import { RoleEnum } from '@app/shared/enumerations/role.enum';

import { ProfileComponent } from './profile/profile.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { MembersComponent } from './members/members.component';
import { PricingComponent } from './pricing/pricing.component';
import { SettingComponent } from './setting/setting.component';
import { BlogGridComponent } from './blog/blog-grid/blog-grid.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';
import { UserComponent } from './user/user.component';
import { ManagerComponent } from './manager/manager.component';
import { EmployeeComponent } from './employee/employee.component';
import { EtablishmentComponent } from './etablishment/etablishment.component';
import { EtablishmentShowComponent } from './etablishment/etablishment-show/etablishment-show.component';
import { PermissionComponent } from './permission/permission.component';
import { ModuleComponent } from './module/module.component';
import { RoleComponent } from './role/role.component';
import { TypeConstructionListComponent } from './type-construction/components/list/list.component';
import { TypeProduitListComponent } from './type-produit/components/list/list.component';
import { OperationTypeListComponent } from './operation-type/components/list/list.component';
import { OwnerListComponent } from './owner/components/list/list.component';
import { CustomerListComponent } from './customer/components/list/list.component';
import { ProductListComponent } from './product/components/list/list.component';

const routes: Routes = [
    {
        path: 'products',
        data: {
            title: "Gestion des produits"
        },
        children: [
            {
                path: '',
                component: ProductListComponent,
                data: {
                    title: 'Liste'
                }
            }
        ]
    },
    {
        path: 'owners',
        component: OwnerListComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Gestion des propriétaires',
        }
    },
    {
        path: 'customers',
        component: CustomerListComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Gestion des clients',
        }
    },
    {
        path: 'types-construction',
        component: TypeConstructionListComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Gestion des types de construction',
        }
    },
    {
        path: 'types-produit',
        component: TypeProduitListComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Gestion des types de produit',
        }
    },
    {
        path: 'operation-types',
        component: OperationTypeListComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Gestion des types d\'opération',
        }
    },
    {
        path: 'users',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Gestion des utilisateurs',
        }
    },
    {
        path: 'roles',
        component: RoleComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Gestion des rôles'
        }
    },
    {
        path: 'modules',
        component: ModuleComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Gestion des modules'
        }
    },
    {
        path: 'permissions',
        component: PermissionComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Gestion des permissions'
        }
    },
    {
        path: 'etablishments',
        data: {
            title: "Gestion des établissements"
        },
        children: [
            {
                path: '',
                component: EtablishmentComponent,
                data: {
                    title: 'Liste'
                }
            },
            {
                path: 'show/:id',
                component: EtablishmentShowComponent,
                data: {
                    title: 'Détails'
                }
            }
        ]
    },
    {
        path: 'managers',
        component: ManagerComponent,
        data: {
            title: 'Gestion des responsables d\'établissement'
        }
    },
    {
        path: 'employees',
        component: EmployeeComponent,
        data: {
            title: 'Gestion des employés'
        }
    },
    {
        path: 'profile',
        component: ProfileComponent,
        data: {
            title: 'Profile'
        }
    },
    {
        path: 'invoice',
        component: InvoiceComponent,
        data: {
            title: 'Invoice'
        }
    },
    {
        path: 'members',
        component: MembersComponent,
        data: {
            title: 'Members',
            headerDisplay: "none"
        }
    },
    {
        path: 'pricing',
        component: PricingComponent,
        data: {
            title: 'Pricing'
        }
    },
    {
        path: 'setting',
        component: SettingComponent,
        data: {
            title: 'Setting',
            headerDisplay: "none"
        }
    },
    {
        path: 'blog',
        data: {
            title: 'Blog '
        },
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            }, 
            {
                path: 'blog-grid',
                component: BlogGridComponent,
                data: {
                    title: 'Blog Grid'
                }
            },
            {
                path: 'blog-list',
                component: BlogListComponent,
                data: {
                    title: 'Blog List'
                }
            },
            {
                path: 'blog-post',
                component: BlogPostComponent,
                data: {
                    title: 'Blog Post'
                }
            }
        ]    
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule { }
