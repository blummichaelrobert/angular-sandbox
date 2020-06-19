import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicComponent } from './music/music.component';
import { SolidComponent } from './solid/solid.component';


const routes: Routes = [
    { path: 'music', component: MusicComponent },
    { path: 'solid', component: SolidComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
