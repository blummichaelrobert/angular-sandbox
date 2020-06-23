import { Component, Input, SimpleChange } from '@angular/core';
import { MusicKey, IntervalState } from '../music.models';
import { FretboardService } from './fretboard.service';

@Component({
    selector: 'fretboard',
    templateUrl: './fretboard.component.html',
    styleUrls: ['./fretboard.component.css'],
    providers: [FretboardService]
})

export class FretboardComponent {
    @Input() intervalState: IntervalState;
    @Input() musicKey: MusicKey;

    bgColors: MusicKey;

    constructor(private fretboardService: FretboardService) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChange) {
        this.bgColors = this.fretboardService.updateIconColors(changes['musicKey']['currentValue']);
    }
}
