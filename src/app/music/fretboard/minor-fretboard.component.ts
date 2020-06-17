import { Component, Input, SimpleChange } from '@angular/core';
import { MusicKey } from '../music.models';
import { FretboardService } from './fretboard.service';

@Component({
    selector: 'minor-fretboard',
    templateUrl: './minor-fretboard.component.html',
    styleUrls: ['./fretboard.component.css'],
    providers: [FretboardService]
})

export class MinorFretboarComponent {
    @Input() musicKey: MusicKey;

    bgColors: MusicKey;

    constructor(private fretboardService: FretboardService) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChange) {
        this.bgColors = this.fretboardService.updateIconColors(changes['musicKey']['currentValue']);
    }
}
