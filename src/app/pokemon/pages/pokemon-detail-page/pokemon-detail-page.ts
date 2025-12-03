import { Component, inject, input } from '@angular/core';
import { PokemonService } from '../../services/pokemon';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pokemon-detail-page.html'
})
export class PokemonDetailPageComponent {
  id = input.required<string>(); 

  private pokemonService = inject(PokemonService);

  pokemonResource = rxResource<any, any>({
    request: () => ({ id: this.id() }),
    loader: ({ request }: any) => {
      return this.pokemonService.getPokemonDetail(request.id);
    }
  } as any);
}