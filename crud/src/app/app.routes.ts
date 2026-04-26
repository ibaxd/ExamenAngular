import { Routes } from '@angular/router';
import { Item1ListComponent } from './components/item1-list/item1-list';
import { Item2ListComponent } from './components/item2-list/item2-list';
import { Item3ListComponent } from './components/item3-list/item3-list';

export const routes: Routes = [
  { path: '', redirectTo: 'item1', pathMatch: 'full' },
  { path: 'item1', component: Item1ListComponent },
  { path: 'item2', component: Item2ListComponent },
  { path: 'item3', component: Item3ListComponent },
];
