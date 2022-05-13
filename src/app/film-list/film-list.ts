import {Film} from "./page/film";
import {FilmMember} from "./film-member";

export interface FilmList {
  film: Film;
  countries: string[];
  directBy: FilmMember[];
  topCast: FilmMember[];
}
