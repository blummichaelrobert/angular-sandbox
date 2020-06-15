import { Component, SimpleChange } from '@angular/core';

import { GoogleChartService } from '../shared/services/google-chart.service';
import { MusicKeyService } from '../shared/services/music-key.service';
import { GooglePieChart, GooglePieChartOptions } from '../shared/models/google-pie-chart.model';
import { MusicKey } from './music.models';

@Component({
    selector: 'music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.css'],
    providers: [
        GoogleChartService,
        MusicKeyService
    ]
})

export class MusicComponent {

    keyVisualBackgroundColors: string[] = [];
    intervalBtnState: IntervalState;
    showingCircleOf5ths = false;

    keyPickerVisual: GooglePieChart = this.googleChartService.getNewPieChart();
    musicKeyVisual: GooglePieChart = this.googleChartService.getNewPieChart();
    musicKey: MusicKey = new MusicKey();

    constructor(
        private googleChartService: GoogleChartService,
        private musicKeyService: MusicKeyService       
    ) { }

    ngOnInit() {
        
        this.setDefaultIntervalButtonState();

        this.intializeKeyPickerChart();

        this.intializeKeyVisualChart();
              
        this.handleKeySelected({ selection: [{ column: 0, row: 0 }] });
    }

    ngOnChanges(changes: SimpleChange) {
        console.log(changes);
    }

    copyObject(source: object): object {
        const copy = { ...source };
        return copy;
    }

    getCurrentBackgroundColors(): string[] {

        const musicKeyCopy = this.copyObject(this.musicKeyService.musicKey);

        const backgroundColors: string[] = [];

        // iterate over enumerable properties of object
        for (const interval in musicKeyCopy) {
            musicKeyCopy[interval] = this.musicKeyService.getColor(musicKeyCopy[interval]);
            backgroundColors.push(musicKeyCopy[interval]);
        }

        return backgroundColors;
    }

    // todo: need to remaps rows if showing cirlcle of 5ths
    handleKeySelected(event: { selection: [{ column: number; row: number }] }) {

        let selection = event.selection[0].row;

        if (this.showingCircleOf5ths) {
            selection = this.googleChartService.getCircleOf5thsMappedNumber(selection);
        }

        this.musicKeyService.setMusicKey(selection.toString());

        // update input for chord progression => 
        this.musicKey = this.musicKeyService.getMusicKey();

        if (!this.intervalBtnState.showingMajorKey) {
            this.musicKeyVisual.data = this.googleChartService.getKeyDataSet('minor');
            this.updateKeyVisualizationColors(this.musicKeyService.minorKeyOmissionIndices);
            this.setIntervalButtonStateProperty('showingMajorKey', false);
            return;
        }

        this.musicKeyVisual.data = this.googleChartService.getKeyDataSet();
        this.updateKeyVisualizationColors(this.musicKeyService.majorKeyOmissionIndices);
    }

    handleKeyVersionSelected(keyType: string) {
        
        this.setMusicKeyVisualData(keyType);

        if (keyType === 'minor') {
            this.setDefaultIntervalButtonState('minor');
            this.musicKeyService.resetOmissions('minor');
            this.updateKeyVisualizationColors(this.musicKeyService.minorKeyOmissionIndices);
            console.log(this.intervalBtnState);
            return;
        }

        this.setDefaultIntervalButtonState();
        this.musicKeyService.resetOmissions();
        this.updateKeyVisualizationColors(this.musicKeyService.majorKeyOmissionIndices);
    }

    handleSecondIntervalClick() {
        this.handleIntervalClick('showing2nd', 2);
    }

    handleMajorThirdIntervalClick() {
        this.handleIntervalClick('showing3rd', 4);
    }

    handleMinorThirdIntervalClick() {
        this.handleIntervalClick('showing3rd', 3);
    }

    handleFourthIntervalClick() {
        this.handleIntervalClick('showing4th', 5);
    }

    handleFifthIntervalClick() {
        this.handleIntervalClick('showing5th', 7);
    }

    handleMajorSixthIntervalClick() {
        this.handleIntervalClick('showing6th', 9);
    }

    handleMinorSixthIntervalClick() {
        this.handleIntervalClick('showing6th', 8);
    }

    handleMajorSeventhIntervalClick() {
        this.handleIntervalClick('showing7th', 11);
    }

    handleMinorSeventhIntervalClick() {
        this.handleIntervalClick('showing7th', 10);
    }

    handleIntervalClick(interval: string, index: number) {
        this.toggleIntervalButton(interval);

        if (this.intervalBtnState.showingMajorKey) {
            this.handleMajorIntervalClick(interval, index);
        }
        else {
            this.handleMinorIntervalClick(interval, index);
        }
    }

    handleMajorIntervalClick(interval: string, index: number) {
        if (this.intervalBtnState[interval])
            this.musicKeyService.removeIndexFromMajorOmissions(index);
        else
            this.musicKeyService.addIndexToMajorOmissions(index);

        this.updateKeyVisualizationColors(this.musicKeyService.majorKeyOmissionIndices);
    }

    handleMinorIntervalClick(interval: string, index: number) {
        this.setMusicKeyVisualData('minor');
        if (this.intervalBtnState[interval])
            this.musicKeyService.removeIndexFromMinorOmissions(index);
        else
            this.musicKeyService.addIndexToMinorOmissions(index);

        this.updateKeyVisualizationColors(this.musicKeyService.minorKeyOmissionIndices);
    }

    handleShowCircleByPerfect5ths() {
        this.showingCircleOf5ths = !this.showingCircleOf5ths;

        if (!this.showingCircleOf5ths) {
            this.intializeKeyPickerChart();
            this.handleKeySelected({ selection: [{ column: 0, row: 0 }] });
            return;
        }

        // grab new data set
        this.keyPickerVisual.data = this.googleChartService.getKeyDataSet('circleOf5ths');

        // grab new colors
        const bgColors: string[] = [];
        this.keyPickerVisual.data.forEach(note => {
            const noteKey = note[0].toString();
            const color = this.musicKeyService.getColor(noteKey);
            bgColors.push(color);
        });

        // set options
        const optionsCopy: GooglePieChartOptions = this.copyObject(this.googleChartService.keyChartOptions);
        optionsCopy.colors = bgColors;

        this.keyPickerVisual.googleChartOptions = optionsCopy;
        console.log(this.keyPickerVisual.googleChartOptions);
        this.handleKeySelected({ selection: [{ column: 0, row: 0 }] });
    }

    intializeKeyPickerChart() {
        this.keyPickerVisual.type = 'PieChart';
        this.keyPickerVisual.data = this.googleChartService.KeyPickerDataSet;
        this.keyPickerVisual.googleChartOptions = this.googleChartService.keyPickerChartOptions;
    }

    intializeKeyVisualChart() {
        this.musicKeyVisual.type = 'PieChart';
        this.musicKeyVisual.data = this.googleChartService.majorKeyDataSet;
        this.musicKeyVisual.googleChartOptions = this.googleChartService.keyChartOptions;;
    }

    setDefaultIntervalButtonState(intervalType= 'major') {

        if (intervalType !== 'major') {
            this.intervalBtnState = {
                showing2nd: true,
                showing3rd: true,
                showing4th: true,
                showing5th: true,
                showing6th: true,
                showing7th: true,
                showingMajorKey: false,
                showingRoot: true
            }; 
        }
        else {
            this.intervalBtnState = {
                showing2nd: true,
                showing3rd: true,
                showing4th: true,
                showing5th: true,
                showing6th: true,
                showing7th: true,
                showingMajorKey: true,
                showingRoot: true
            }; 
        }
        
    }

    setIntervalButtonStateProperty(property: string, state: boolean) {
        this.intervalBtnState[property] = state;
    }

    setMusicKeyVisualData(keyType = 'major') {
        this.musicKeyVisual.data = this.googleChartService.getKeyDataSet(keyType);
    }

    toggleIntervalButton(property: string) {
        this.intervalBtnState[property] = !this.intervalBtnState[property];;
    }

    updateKeyVisualizationColors(indices: number[]) {
        this.keyVisualBackgroundColors = this.getCurrentBackgroundColors();

        this.whiteOutKeyPositions(indices);

        const optionsCopy: GooglePieChartOptions = this.copyObject(this.googleChartService.keyChartOptions);
        optionsCopy.colors = this.keyVisualBackgroundColors;

        this.musicKeyVisual.googleChartOptions = optionsCopy;
    }

    whiteOutKeyPositions(indices: number[]) {
        indices.forEach(index => this.keyVisualBackgroundColors[index] = '#fff');
    }
}

export class IntervalState {
    showingRoot: boolean;
    showing2nd: boolean;
    showing3rd: boolean;
    showing4th: boolean;
    showing5th: boolean;
    showing6th: boolean;
    showing7th: boolean;
    showingMajorKey: boolean;
}
