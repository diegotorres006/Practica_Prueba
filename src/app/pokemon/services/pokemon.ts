import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  getPokemons(offset: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetail(idOrName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idOrName}`);
  }
}