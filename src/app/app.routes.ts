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


export const routes: Routes = [
    {
        path: '', component: MainPageComponent
    },
    {
        path: 'presciption', component: PrescriptionsComponent
    },
    {
        path: 'users', component: UserComponent
    },
    {
        path: 'medicines', component: MedicinesComponent
    },
    {
        path: 'add-medicine', component: AddMedicineComponent
    },
    {
        path: 'add-user', component: AddUserComponent
    },
    {
        path: 'calendar', component: CalendarComponent
    },
    {
        path: 'user-details/:id', component: UserDetailsComponent
    },
    {
        path: 'chat', component: ChatComponent
    }

];
