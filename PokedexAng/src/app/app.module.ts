import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokeCardComponent } from './poke-card/poke-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    PokeCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
