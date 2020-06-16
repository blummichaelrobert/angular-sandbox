import { Component, Input, SimpleChange } from '@angular/core';
import { MusicKey } from '../music.models';
import { MusicKeyService } from '../../shared/services/music-key.service';
import { CommonService } from '../../shared/services/common.service';

@Component({
    selector: 'fretboard',
    templateUrl: './fretboard.component.html',
    styleUrls: ['./fretboard.component.css'],
    providers: [CommonService]
})

export class FretboardComponent {
    @Input() musicKey: MusicKey;

    bgColors: MusicKey;

    RootColor = '';
    Major2ndColor = '';
    Major3rdColor = '';
    Perfect4thColor = '';
    Perfect5thColor = '';
    Major6thColor = '';
    Major7thColor = '';

    constructor(private commonService: CommonService,
                private musicKeyService: MusicKeyService) { }

    ngOnInit() {
        this.bgColors = {
            Root: '',
            minor2nd: '',
            Major2nd: '',
            minor3rd: '',
            Major3rd: '',
            Perfect4th: '',
            diminished5th: '',
            Perfect5th: '',
            minor6th: '',
            Major6th: '',
            minor7th: '',
            Major7th: ''
        };
    }

    ngOnChanges(changes: SimpleChange) {
        this.updateIconColors(changes['musicKey']['currentValue']);
    }

    updateIconColors(musicKey: MusicKey) {
        const musicKeyCopy = this.commonService.copyObject(musicKey);

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
