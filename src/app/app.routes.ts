import { Routes } from '@angular/router';
import { AuthLoginComponent } from './auth/login-page/login-page';
import { HomePageComponent } from './pokemon/pages/home-page/home-page';
import { PokemonService } from './pokemon/services/pokemon';
import { PokemonDetailPageComponent } from './pokemon/pages/pokemon-detail-page/pokemon-detail-page';

export const routes: Routes = [
  { path: 'login', component: AuthLoginComponent },
  
  { path: 'home', component: HomePageComponent },
  

  { path: 'pokemon/:id', component: PokemonDetailPageComponent },
  

  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'login' } 
];