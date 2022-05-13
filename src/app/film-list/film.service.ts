import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {Film} from './page/film';
import {environment} from 'src/environments/environment';
import {FilmDetails} from "../film-details/film-details";
import {Page} from "./page/page";
import {UtilService} from "../util.service";

@Injectable({providedIn: 'root'})
export class FilmService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiServerUrl}/api/v1/films/all`)
      .pipe(catchError(UtilService.handleError));
  }

  public addFilm(film: Film): Observable<Film> {
    return this.http.post<Film>(`${this.apiServerUrl}/api/v1/films`, film)
      .pipe(catchError(UtilService.handleError));
  }

  public updateFilm(film: Film): Observable<Film> {
    return this.http.put<Film>(`${this.apiServerUrl}/api/v1/films`, film)
      .pipe(catchError(UtilService.handleError));
  }

  public deleteFilm(filmId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/v1/films/${filmId}`)
      .pipe(catchError(UtilService.handleError));
  }

  public getFilmDetails(filmId: number): Observable<FilmDetails> {
    return this.http.get<FilmDetails>(`${this.apiServerUrl}/api/v1/films/details/${filmId}`)
      .pipe(catchError(UtilService.handleError));
  }

  public getFilmsPaginated(pageNumber: number): Observable<Page> {
    const size = 8;
    return this.http.get<Page>(`${this.apiServerUrl}/api/v1/films/?page=${pageNumber}&size=${size}`)
      .pipe(catchError(UtilService.handleError));
  }

  public searchFilms(title: string, pageNumber: number): Observable<Page> {
    const size = 8;
    return this.http.get<Page>(`${this.apiServerUrl}/api/v1/films/search/${title}?page=${pageNumber}&size=${size}`)
      .pipe(catchError(UtilService.handleError));
  }
}
