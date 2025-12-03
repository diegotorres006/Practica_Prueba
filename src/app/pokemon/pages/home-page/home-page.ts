import { Component, inject, signal } from '@angular/core';
import { PokemonService } from '../../services/pokemon';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-page.html',
})
export class HomePageComponent {
  private pokemonService = inject(PokemonService);

  offset = signal(0);
  limit = signal(20);


  pokemonResource = rxResource<any, any>({
    request: () => ({ offset: this.offset(), limit: this.limit() }),
    loader: ({ request }: any) => {
      return this.pokemonService.getPokemons(request.offset, request.limit);
    },
  } as any);

  nextPage() {
    this.offset.update(v => v + 20);
  }

  prevPage() {
    this.offset.update(v => Math.max(0, v - 20));
  }
  
  getPokemonId(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }
}