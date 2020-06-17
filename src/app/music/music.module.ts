import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GoogleChartsModule } from 'angular-google-charts';

import { MusicComponent } from './music.component';
import { ChordProgressionComponent } from './chord-progression/chord-progression.component';
import { FretboardComponent } from './fretboard/fretboard.component';
import { CommonService } from '../shared/services/common.service';
import { MinorFretboarComponent } from './fretboard/minor-fretboard.component';

const routes: Routes = [{ path: '', component: MusicComponent }];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        GoogleChartsModule,
    ],
    declarations: [
        ChordProgressionComponent,
        FretboardComponent,
        MinorFretboarComponent,
        MusicComponent
    ],
    providers: [CommonService]
})

export class MusicModule { }

