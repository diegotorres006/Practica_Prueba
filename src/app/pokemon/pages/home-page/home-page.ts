import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { PokemonService } from '../../services/pokemon';

interface PokemonItem {
  name: string;
  url: string;
}

interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonItem[];
}

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-page.html',
})
export class HomePageComponent {
  private api = inject(PokemonService);

  offset = signal(0);
  limit = signal(20);

  pokemonResource = rxResource<PokemonList, { start: number; qty: number }>({
    request: () => ({ start: this.offset(), qty: this.limit() }),
    loader: ({ request }: any) => this.api.getPokemons(request.start, request.qty)
  } as any);

  nextPage() {
    this.offset.update(v => v + this.limit());
  }

  prevPage() {
    this.offset.update(v => Math.max(0, v - this.limit()));
  }

  getPokemonId(url: string) {
    const p = url.split('/');
    return p[p.length - 2];
  }
}
