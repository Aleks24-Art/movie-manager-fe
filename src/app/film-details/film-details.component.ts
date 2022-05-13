import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Film} from "../film-list/page/film";
import {FilmService} from "../film-list/film.service";
import {FilmDetails} from "./film-details";
import { Location } from '@angular/common'
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {

  id: number
  film: Film
  filmDetails: FilmDetails

  constructor(private route: ActivatedRoute, private filmService: FilmService,
              private location: Location, private token: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.token.getToken() === null) {
      this.router.navigate(['login']);
      return;
    }

    console.log("Init FilmListComponent");
    this.id = this.route.snapshot.params['id'];

    this.filmService.getFilmDetails(this.id).subscribe( data => {
      console.log(data);
      this.filmDetails = data;
    });
  }

  public goToFilmList(): void {
    console.log("Do redirect to details");
    this.location.back();
  }
}
