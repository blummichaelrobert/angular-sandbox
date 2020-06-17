import { Component, Input, SimpleChange } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { MusicKey } from '../music.models';
import { MusicKeyService } from '../../shared/services/music-key.service';


@Component({
    selector: 'minor-fretboard',
    templateUrl: './minor-fretboard.component.html',
    styleUrls: ['./fretboard.component.css'],
    providers: [MusicKeyService]
})

export class MinorFretboarComponent {
    @Input() musicKey: MusicKey;

    bgColors: MusicKey;

    constructor(private commonService: CommonService,
                private musicKeyService: MusicKeyService) { }

    ngOnInit() {
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

        this.bgColors = this.musicKeyService.setMusicKeyProps(backgroundColors);
    }
}
