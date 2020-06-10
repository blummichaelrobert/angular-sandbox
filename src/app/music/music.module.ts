import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GoogleChartsModule } from 'angular-google-charts';

import { MusicComponent } from './music.component';

const routes: Routes = [{ path: '', component: MusicComponent }];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        GoogleChartsModule,
    ],
    declarations: [MusicComponent]
})

export class MusicModule { }

