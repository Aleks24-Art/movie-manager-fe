import { Component, OnInit } from '@angular/core';
import { Film } from './page/film';
import { FilmService } from './film.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import {Page} from "./page/page";
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  public page: Page;
  public films: Film[];
  public currentPage: number;
  public editFilm: Film;
  public deleteFilm: Film;
  public searchKey: string = '';

  constructor(private filmService: FilmService, private router: Router, private token: TokenStorageService){}

  ngOnInit() {
    if (this.token.getToken() === null) {
      this.router.navigate(['login']);
      return;
    }

    const startPage = 1;
    this.goFilmsPage(startPage, this.searchKey);
  }


  public onAddFilm(addForm: NgForm): void {
    document.getElementById('add-film-form').click();
    this.filmService.addFilm(addForm.value).subscribe(
      (response: Film) => {
        console.log(response);
        this.goFilmsPage(this.currentPage, this.searchKey);
        addForm.reset();
      },
      (error: string) => {
        alert(error);
        addForm.reset();
      }
    );
  }

  public onUpdateFilm(film: Film): void {
    this.filmService.updateFilm(film).subscribe(
      (response: Film) => {
        console.log(response);
        this.goFilmsPage(this.currentPage, this.searchKey);
      },
      (error: string) => {
        alert(error);
      }
    );
  }

  public onDeleteFilm(filmId: number): void {
    console.log('Inside onDeleteFilm()');
    this.filmService.deleteFilm(filmId).subscribe(
      (response: void) => {
        console.log(response);
        this.goFilmsPage(this.currentPage, this.searchKey);
      },
      (error: string) => {
        console.log(error);
        alert(error);
      }
    );
  }

  public goFilmsPage(pageNumber: number, key: string): void {
    console.log(key);
    console.log(pageNumber);
    this.searchKey = key;

    if (key.trim().length === 0) {
      console.log("Try to search with empty string")
      this.filmService.getFilmsPaginated(pageNumber - 1).subscribe(
        (response: Page) => {
          this.page = response;
          this.films = this.page.content;
          this.currentPage = pageNumber;
          console.log(this.page);
        },
        (error: string) => {
          alert(error);
        }
      );
      return;
    }
    console.log("go to func")
    this.filmService.searchFilms(key, pageNumber - 1).subscribe(
      (response: Page) => {
        this.page = response;
        this.films = this.page.content;
        this.currentPage = pageNumber;
        console.log(this.page);
      },
      (error: string) => {
        alert(error);
      }
    );
  }

  public onOpenModal(film: Film, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addFilmModal');
    }
    if (mode === 'edit') {
      this.editFilm = film;
      button.setAttribute('data-target', '#updateFilmModal');
    }
    if (mode === 'delete') {
      this.deleteFilm = film;
      button.setAttribute('data-target', '#deleteFilmModal');
    }
    container.appendChild(button);
    button.click();
  }


  public onShowDetails(filmId: number): void {
    console.log("Do redirect to details");
    this.router.navigate(['film-details', filmId]);
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }
}
