import {Film} from "../film-list/page/film";
import {FilmMember} from "../film-list/film-member";

export interface FilmDetails {
  film: Film;
  countries: string[];
  directBy: FilmMember[];
  topCast: FilmMember[];
  plot: string;
}
