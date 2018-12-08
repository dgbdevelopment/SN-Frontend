import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { SendedComponent } from './components/sended/sended.component';
import { ReceivedComponent } from './components/received/received.component';
import { AddComponent } from './components/add/add.component';
import { UserGuard } from '../services/user.guard';


const messageRoutes: Routes = [
   {
      path: 'mensajes',
      component: MainComponent,
      canActivate: [UserGuard],
      children: [
         {path: '', redirectTo: 'recibidos', pathMatch: 'full'},
         {path: 'enviar', component: AddComponent},
         {path: 'recibidos', component: ReceivedComponent},
         {path: 'enviados', component: SendedComponent}
      ]
   }
];

@NgModule({
   imports: [
      RouterModule.forChild(messageRoutes)
   ],
   exports: [
      RouterModule
   ]
})
export class MessagesRoutingModule {}

/*export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(messageRoutes);*/
