import { Component, SimpleChange, HostListener } from '@angular/core';

import { GoogleChartService } from '../shared/services/google-chart.service';
import { MusicKeyService } from '../shared/services/music-key.service';
import { GooglePieChart } from '../shared/models/google-pie-chart.model';
import { MusicKey } from './music.models';
import { CommonService } from '../shared/services/common.service';

@Component({
    selector: 'music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.css'],
    providers: [
        CommonService,
        GoogleChartService
    ]
})

export class MusicComponent {

    intervalBtnState: IntervalStateLocal;
    showingCircleOf5ths = false;

    keyPickerVisual: GooglePieChart = this.googleChartService.getNewPieChart();
    musicKeyVisual: GooglePieChart = this.googleChartService.getNewPieChart();
    musicKey: MusicKey = new MusicKey();

    // todo: is this the best place for this?
    currentChartDimension = 600;

    // todo: is this the best place for this?
    intervalMap: Map<number, string> = new Map([
        [0, 'showingRoot'],
        [2, 'showing2nd'],
        [3, 'showing3rd'],
        [4, 'showing3rd'],
        [5, 'showing4th'],
        [7, 'showing5th'],
        [8, 'showing6th'],
        [9, 'showing6th'],
        [10, 'showing7th'],
        [11, 'showing7th']
    ]);

    constructor(
        private commonService: CommonService,
        private googleChartService: GoogleChartService,
        public  musicKeyService: MusicKeyService       
    ) { }

    ngOnInit() {
        
        this.setDefaultIntervalButtonState();

        this.intializeKeyPickerChart();

        this.intializeKeyVisualChart();
              
        this.handleKeySelected({ selection: [{ column: 0, row: 0 }] }); // setting colors here

        const innerWidth = window.innerWidth;

        this.onResize({ target: { innerWidth: innerWidth } }); // resetting colors, setting height width here
    }

    ngOnChanges(changes: SimpleChange) {
        console.log(changes);
    }

    determineViableSelection(selection: number): boolean {
        if (selection === 1 || selection === 6)
            return false;

        if (this.intervalBtnState.showingMajorKey) {
            if (selection === 3 || selection === 8 || selection === 10)
                return false;
        }

        if (!this.intervalBtnState.showingMajorKey) {
            if (selection === 4 || selection === 9 || selection === 11) {
                return false;
            }
        }

        return true;
    }

    getInterval(interval: number) {
        return this.intervalMap.get(interval);
    }

    handleIntervalSelectedFromChart(event: { selection: [{ column: number; row: number }] }) {
        const selection = event.selection[0].row;

        if (this.determineViableSelection(selection)) {
            const interval = this.getInterval(selection);

            this.handleIntervalClick(interval, selection);
        } else { // user clicked an empty spot on visual.
            return;
        }
    }

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
            return;
        }

        this.setDefaultIntervalButtonState();
        this.musicKeyService.resetOmissions();
        this.updateKeyVisualizationColors(this.musicKeyService.majorKeyOmissionIndices);
    }

    handleIntervalClick(interval: string, index: number) {
        this.musicKeyService.toggleIntervalStateProperty('showingMajor2');
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
        // toggle property
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

        // update => set options
        this.keyPickerVisual.googleChartOptions = this.googleChartService.updateChartOptions(this.currentChartDimension, bgColors);

        this.handleKeySelected({ selection: [{ column: 0, row: 0 }] });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        console.log(event.target.innerWidth);
        const screenWidth = event.target.innerWidth;

        this.currentChartDimension = screenWidth / 3.44;

        const kpBGColors = this.googleChartService.defaultOptions.colors;
        let bgColors = this.musicKeyService.getCurrentBackgroundColors();

        if (this.intervalBtnState.showingMajorKey)
            bgColors = this.whiteOutKeyPositions(this.musicKeyService.majorKeyOmissionIndices, bgColors);
        else
            bgColors = this.whiteOutKeyPositions(this.musicKeyService.minorKeyOmissionIndices, bgColors);

        this.keyPickerVisual.googleChartOptions = this.googleChartService.updateChartOptions(this.currentChartDimension, kpBGColors);
        this.musicKeyVisual.googleChartOptions = this.googleChartService.updateChartOptions(this.currentChartDimension, bgColors);
    }

    intializeKeyPickerChart() {
        this.keyPickerVisual.type = this.googleChartService.PIE_CHART;
        this.keyPickerVisual.data = this.googleChartService.KeyPickerDataSet;
        this.keyPickerVisual.googleChartOptions = this.googleChartService.defaultOptions;
    }

    intializeKeyVisualChart() {
        this.musicKeyVisual.type = this.googleChartService.PIE_CHART;
        this.musicKeyVisual.data = this.googleChartService.majorKeyDataSet;
        this.musicKeyVisual.googleChartOptions = this.googleChartService.defaultOptions;
        this.updateKeyVisualizationColors(this.musicKeyService.majorKeyOmissionIndices);
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

        let bgColors = this.musicKeyService.getCurrentBackgroundColors();
        bgColors = this.whiteOutKeyPositions(indices, bgColors);

        this.musicKeyVisual.googleChartOptions = this.googleChartService.updateChartOptions(this.currentChartDimension, bgColors);
    }

    whiteOutKeyPositions(indices: number[], bgColors: string[]): string[] {
        indices.forEach(index => bgColors[index] = '#fff');
        return bgColors;
    }
}

export class IntervalStateLocal {
    showingRoot: boolean;
    showing2nd: boolean;
    showing3rd: boolean;
    showing4th: boolean;
    showing5th: boolean;
    showing6th: boolean;
    showing7th: boolean;
    showingMajorKey: boolean;
}

export class MockWindowEvent {
        target: { innerWidth: number };
}
