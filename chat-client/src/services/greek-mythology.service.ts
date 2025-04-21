import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Hero} from '../entities/hero';
import {Monster} from '../entities/monster';

@Injectable({
  providedIn: 'root'
})
export class GreekMythologyService {
  private _http = inject(HttpClient);

  getHeroes(): Observable<Hero[]> {
    return this._http.get<{ heroes: Hero[] }>('https://localhost:3000/heroes').pipe(map(result => result.heroes));
  }

  getMonsters(): Observable<Monster[]> {
    return this._http.get<{
      monsters: Monster[]
    }>('https://localhost:3000/monsters').pipe(map(result => result.monsters));
  }
}
