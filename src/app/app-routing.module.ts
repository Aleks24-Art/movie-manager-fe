import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FilmDetailsComponent} from "./film-details/film-details.component";
import {HomeComponent} from './home/home.component';

import {FilmListComponent} from "./film-list/film-list.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {path: '', redirectTo: 'films', pathMatch: 'full'},
  {path: 'films', component: FilmListComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'film-details/:id', component: FilmDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
