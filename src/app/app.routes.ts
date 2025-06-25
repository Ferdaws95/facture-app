import { Routes } from '@angular/router';
import { FactureList } from './facture-list/facture-list';

export const routes: Routes = [

{
path :'', component: FactureList, title:'Liste des factures' , data:{isMenu:true},
},
];
