import { Injectable } from "@angular/core";
import { MusicKey } from '../music.models';
import { CommonService } from '../../shared/services/common.service';
import { MusicService } from '../../shared/services/music-key.service';

@Injectable()

export class FretboardService {

    constructor(private commonService: CommonService,
                private musicKeyService: MusicService) { }

    updateIconColors(musicKey: MusicKey): MusicKey {
        const musicKeyCopy = this.commonService.copyObject(musicKey);

        const backgroundColors: string[] = [];

        // iterate over enumerable properties of object
        for (const interval in musicKeyCopy) {
            musicKeyCopy[interval] = this.musicKeyService.getColor(musicKeyCopy[interval]);
            backgroundColors.push(musicKeyCopy[interval]);
        }

        return this.musicKeyService.setMusicKeyProps(backgroundColors);
    }
}
