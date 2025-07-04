import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RecipesComponent } from './recipes/recipes.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { PrescriptionsComponent } from './presciptions/presciptions.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import {ChatComponent} from "./chat/chat.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {RoleGuard} from "./auth.guard";
import {KnowledgeComponent} from "./knowledge/knowledge.component";
import {TrendsDashboardComponent} from "./trends-dashboard/trends-dashboard.component";
import {TrendsChartComponent} from "./trends-chart/trends-chart.component";
import {TrendsSummaryComponent} from "./trends-summary/trends-summary.component";
import {TrendsAddMeasurementComponent} from "./trends-add-measurement/trends-add-measurement.component";

import { CeleRozwojoweComponent } from './cele-rozwojowe/cele-rozwojowe.component';

export const routes: Routes = [
    {
        path: '', component: MainPageComponent
    },
    {
        path: 'presciption', component: PrescriptionsComponent, canActivate: [RoleGuard], data: {roles: ['Doctor']}
    },
    {
        path: 'users', component: UserComponent, canActivate: [RoleGuard], data: {roles: ['Doctor']}
    },
    {
        path: 'medicines', component: MedicinesComponent, canActivate: [RoleGuard], data: {roles: ['Doctor']}
    },
    {
        path: 'add-medicine', component: AddMedicineComponent, canActivate: [RoleGuard], data: {roles: ['Doctor']}
    },
    {
        path: 'add-user', component: AddUserComponent
    },
    {
        path: 'calendar', component: CalendarComponent, canActivate: [RoleGuard], data: {roles: ['Doctor', 'Patient']}
    },
    {
        path: 'user-details/:id', component: UserDetailsComponent
    },
    {
        path: 'chat', component: ChatComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
      path: 'knowledge', component: KnowledgeComponent
    },

    {
    path: 'cele-rozwojowe',
    component: CeleRozwojoweComponent
    },
  {
    path: 'trends',
    component: TrendsDashboardComponent,
    children: [
      { path: 'chart', component: TrendsChartComponent },
      { path: 'summary', component: TrendsSummaryComponent },
      { path: 'add', component: TrendsAddMeasurementComponent },
      { path: '', redirectTo: 'chart', pathMatch: 'full' }
    ]
  }


];
