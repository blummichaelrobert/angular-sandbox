import { Injectable } from '@angular/core';
import { MusicKey, IntervalState } from '../../music/music.models';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from './common.service';
import { MusicData } from '../../music/data/music-data';

@Injectable({
    providedIn: 'root',
})
export class MusicService {

    musicKey$ = new BehaviorSubject<MusicKey>(null);
    musicData: MusicData = new MusicData();
    intervalState: IntervalState = new IntervalState();
    keyOmissionIndices: number[] = [1, 3, 6, 8, 10];
    showingMajorKey = true;

    constructor(private commonService: CommonService) { }

    addIndexToOmissions(index: number) {
        this.keyOmissionIndices.push(index);
    }

    getCurrentBackgroundColors(): string[] {

        const musicKeyCopy = this.commonService.copyObject(this.getMusicKey());

        const backgroundColors: string[] = [];

        // iterate over enumerable properties of object
        for (const interval in musicKeyCopy) {
            musicKeyCopy[interval] = this.getColor(musicKeyCopy[interval]);
            backgroundColors.push(musicKeyCopy[interval]);
        }

        return backgroundColors;
    }

    getColor(key: string): string {
        return this.musicData.colorMap.get(key);
    }

    getMusicKey(): MusicKey { return this.musicKey$.getValue(); }

    nextMusicKey(rawMusicKey: string[]) {

        this.musicKey$.next(this.setMusicKeyProps(rawMusicKey));
    }

    removeIndexFromOmissions(filter: number) {
        this.keyOmissionIndices = this.keyOmissionIndices.filter(index => index !== filter);
    }

    setMajorIntervalInitialState() {
        this.intervalState = {
            showingRoot: true,
            showingMinor2: false,
            showingMajor2: true,
            showingMinor3: false,
            showingMajor3: true,
            showingPerfect4: true,
            showingDim5: false,
            showingPerfect5: true,
            showingMinor6: false,
            showingMajor6: true,
            showingMinor7: false,
            showingMajor7: true
        };
    }

    setMinorIntervalIntialState() {
        this.intervalState = {
            showingRoot: true,
            showingMinor2: false,
            showingMajor2: true,
            showingMinor3: true,
            showingMajor3: false,
            showingPerfect4: true,
            showingDim5: false,
            showingPerfect5: true,
            showingMinor6: true,
            showingMajor6: false,
            showingMinor7: true,
            showingMajor7: false
        };
    }

    setShowingMajorKey(currentState: boolean) {
        this.showingMajorKey = currentState;
    }

    setMusicKey(selection: string) {

        const rawMusicKey: string[] = this.musicData.chromaticMap.get(selection);

        this.nextMusicKey(rawMusicKey);
    }

    setMusicKeyProps(rawMusicKey: string[]): MusicKey {
        return {
            Root: rawMusicKey[0],
            minor2nd: rawMusicKey[1],
            Major2nd: rawMusicKey[2],
            minor3rd: rawMusicKey[3],
            Major3rd: rawMusicKey[4],
            Perfect4th: rawMusicKey[5],
            diminished5th: rawMusicKey[6],
            Perfect5th: rawMusicKey[7],
            minor6th: rawMusicKey[8],
            Major6th: rawMusicKey[9],
            minor7th: rawMusicKey[10],
            Major7th: rawMusicKey[11]
        };
    }

    toggleIntervalStateProperty(property: string) {
        this.intervalState[property] = !this.intervalState[property];
    }
}
