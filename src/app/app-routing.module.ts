import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import {DashboardComponent} from './Features/dashboard/dashboard.component'
import { GridComponent } from './Features/grid/grid.component';
const routes: Routes = [
  { path:'',component: LoginComponent},
  // { path: ':userid', component:LoginComponent},
  { path: 'customerdata', loadChildren: () => import('./Features/dashboard/dashboard.module').then(m => m.DashboardModule), data:{title : 'Customers'}},
  { path :'customerslist2',loadChildren: () => import('./Features/grid/grid.module').then(m => m.GridModule)},
  { path: 'customerslist', loadChildren: () => import('./Features/grid-view/grid-view.module').then(m => m.GridViewModule) },
  { path: 'jobtitle', loadChildren: () => import('./Features/Admin/jobtitle/jobtitle.module').then(m => m.JobtitleModule) },
  { path: 'roles', loadChildren: () => import('./Features/Admin/roles/roles.module').then(m => m.RolesModule) },
  { path: 'adminmodules', loadChildren: () => import('./Features/Admin/admin-modules/admin-modules.module').then(m => m.AdminModulesModule) },
  { path: 'reportfilter', loadChildren: () => import('./Features/reportfilter/reportfilter.module').then(m => m.ReportfilterModule) },
  { path: 'leftPanel', loadChildren: () => import('./Layout/left-panel/left-panel.module').then(m => m.LeftPanelModule) },
  { path: 'messenger', loadChildren: () => import('./Features/messenger/messenger.module').then(m => m.MessengerModule) },
  { path: 'dashboard', loadChildren: () => import('./Features/dashboard-new/dashboard-new.module').then(m => m.DashboardNewModule), data:{title : 'DashBoard'} },
  { path: 'sentmsg', loadChildren: () => import('./Features/sent-msg/sent-msg.module').then(m => m.SentMsgModule) },
  { path: 'Accelfi', loadChildren: () => import('./Features/accelfi/accelfi.module').then(m => m.AccelfiModule) },
  { path: 'customersnew', loadChildren: () => import('./Features/customers-new/customers-new.module').then(m => m.CustomersNewModule) },
  // { path: 'xiomicon', loadChildren: () => import('./Features/xiomicon/xiomicon.module').then(m => m.XiomiconModule) },

  //{path :'',loadChildren: () => import('./Features/grid/grid.module').then(m => m.GridModule)},
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
