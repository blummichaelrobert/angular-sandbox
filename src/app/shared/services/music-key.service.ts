import { Injectable } from '@angular/core';
import { MusicKey, IntervalState } from '../../music/music.models';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root',
})
export class MusicKeyService {

    constructor(private commonService: CommonService) { }

    private intervalState: IntervalState = {
        showingRoot: true,
        showingMinor2: false,
        showingMajor2: true,
        showingMinor3: true,
        showingMajor3: true,
        showingPerfect4: true,
        showingDim5: false,
        showingPerfect5: true,
        showingMinor6: true,
        showingMajor6: true,
        showingMinor7: true,
        showingMajor7: true
    };

    intervalState$ = new BehaviorSubject<IntervalState>(null);

    musicKey$ = new BehaviorSubject<MusicKey>(null);

    chromaticMap: Map<string, string[]> = new Map([
        ['0', ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']],
        ['1', ['A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A']],
        ['2', ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#']],
        ['3', ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']],
        ['4', ['C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C']],
        ['5', ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#']],
        ['6', ['D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D']],
        ['7', ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#']],
        ['8', ['F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E']],
        ['9', ['F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F']],
        ['10', ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#']],
        ['11', ['G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G']]
    ]);

    noteMap: Map<number, string> = new Map([
        [1, 'A'],
        [2, 'A#'],
        [3, 'B'],
        [4, 'C'],
        [5, 'C#'],
        [6, 'D'],
        [7, 'D#'],
        [8, 'E'],
        [9, 'F'],
        [10, 'F#'],
        [11, 'G'],
        [12, 'G#']
    ]);

    colorMap: Map<string, string> = new Map([
        ['A', '#ff0000'],
        ['A#', '#ff3300'],
        ['B', '#ff6500'],
        ['C', '#f9ed03'],
        ['C#', '#b6f903'],
        ['D', '#059c0e'],
        ['D#', '#04d67b'],
        ['E', '#00e6c2'],
        ['F', '#0000ff'],
        ['F#', '#5a01ff'],
        ['G', '#ab00ff'],
        ['G#', '#e6008e']
    ]);

    majorKeyOmissionIndices: number[] = [1, 3, 6, 8, 10];

    minorKeyOmissionIndices: number[] = [1, 4, 6, 9, 11];

    addIndexToMajorOmissions(index: number) {
        this.majorKeyOmissionIndices.push(index);
    }

    addIndexToMinorOmissions(index: number) {
        this.minorKeyOmissionIndices.push(index);
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
        return this.colorMap.get(key);
    }

    getMusicKey(): MusicKey { return this.musicKey$.getValue(); }

    nextMusicKey(rawMusicKey: string[]) {

        this.musicKey$.next(this.setMusicKeyProps(rawMusicKey));
    }

    removeIndexFromMajorOmissions(filter: number) {
        this.majorKeyOmissionIndices = this.majorKeyOmissionIndices.filter(index => index !== filter);
    }

    removeIndexFromMinorOmissions(filter: number) {
        this.minorKeyOmissionIndices = this.minorKeyOmissionIndices.filter(index => index !== filter);
    }

    setMusicKey(selection: string) {

        const rawMusicKey: string[] = this.chromaticMap.get(selection);

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

    resetOmissions(type = 'major') {
        if (type !== 'major') {
            this.minorKeyOmissionIndices = [1, 4, 6, 9, 11];
            return;
        }

        this.majorKeyOmissionIndices = [1, 3, 6, 8, 10];
    }

    toggleIntervalStateProperty(property: string) {

        this.intervalState[property] = !this.intervalState[property];
        console.log(this.intervalState$.getValue());
        this.intervalState$.next(this.intervalState);
    }
}
