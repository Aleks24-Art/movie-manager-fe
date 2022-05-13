import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FilmService } from './film-list/film.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {FilmDetailsComponent} from "./film-details/film-details.component";
import { AppRoutingModule } from './app-routing.module';
import {FilmListComponent} from "./film-list/film-list.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import {httpInterceptorProviders} from "./auth/auth-interceptor";
import {HomeComponent} from "./home/home.component";


@NgModule({
  declarations: [
    AppComponent,
    FilmDetailsComponent,
    FilmListComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [FilmService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
