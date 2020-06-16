import { Component, Input, SimpleChange } from '@angular/core';
import { MusicKey } from '../music.models';
import { MusicKeyService } from '../../shared/services/music-key.service';

@Component({
    selector: 'fretboard',
    templateUrl: './fretboard.component.html',
    styleUrls: ['./fretboard.component.css']
})

export class FretboardComponent {
    @Input() musicKey: MusicKey;

    RootColor = '';
    Major2ndColor = '';
    Major3rdColor = '';
    Perfect4thColor = '';
    Perfect5thColor = '';
    Major6thColor = '';
    Major7thColor = '';

    constructor(private musicKeyService: MusicKeyService) { }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChange) {
        this.updateIconColors(changes['musicKey']['currentValue']);
    }

    copyObject(source: object): object {
        const copy = { ...source };
        return copy;
    }

    updateIconColors(musicKey: MusicKey) {
        const musicKeyCopy = this.copyObject(this.musicKeyService.musicKey);

        const backgroundColors: string[] = [];

        // iterate over enumerable properties of object
        for (const interval in musicKeyCopy) {
            musicKeyCopy[interval] = this.musicKeyService.getColor(musicKeyCopy[interval]);
            backgroundColors.push(musicKeyCopy[interval]);
        }

        this.RootColor = backgroundColors[0];
        this.Major2ndColor = backgroundColors[2];
        this.Major3rdColor = backgroundColors[4];
        this.Perfect4thColor = backgroundColors[5];
        this.Perfect5thColor = backgroundColors[7];
        this.Major6thColor = backgroundColors[9];
        this.Major7thColor = backgroundColors[11];
    }
}
