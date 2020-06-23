import { Component, SimpleChange, HostListener } from '@angular/core';

import { GoogleChartService } from '../shared/services/google-chart.service';
import { MusicService } from '../shared/services/music-key.service';
import { GooglePieChart } from '../shared/models/google-pie-chart.model';
import { MusicKey } from './music.models';
import { CommonService } from '../shared/services/common.service';
import { MusicData } from './data/music-data';

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

    showingCircleOf5ths = false;

    musicData: MusicData = new MusicData();

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
        public  musicService: MusicService       
    ) { }

    ngOnInit() {

        this.musicService.setMajorIntervalState();       

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

        if (this.musicService.showingMajorKey) {
            if (selection === 3 || selection === 8 || selection === 10)
                return false;
        }

        if (!this.musicService.showingMajorKey) {
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

        this.musicService.setMusicKey(selection.toString());

        // update input for chord progression => 
        this.musicKey = this.musicService.getMusicKey();

        if (!this.musicService.showingMajorKey) {
            this.musicKeyVisual.data = this.googleChartService.getKeyDataSet('minor');
            this.updateKeyVisualizationColors(this.musicService.minorKeyOmissionIndices);
            return;
        }

        this.musicKeyVisual.data = this.googleChartService.getKeyDataSet();
        this.updateKeyVisualizationColors(this.musicService.majorKeyOmissionIndices);
    }

    handleKeyVersionSelected(keyType: string) {
        
        this.setMusicKeyVisualData(keyType);

        if (keyType === 'minor') {
            this.musicService.resetOmissions('minor');
            this.updateKeyVisualizationColors(this.musicService.minorKeyOmissionIndices);
            return;
        }

        this.musicService.resetOmissions();
        this.updateKeyVisualizationColors(this.musicService.majorKeyOmissionIndices);
    }

    handleIntervalClick(interval: string, index: number) {

        // update music service
        // update fretboard
        this.musicService.toggleIntervalStateProperty(interval);

        // update music key visual

        
        console.log(interval);
        
        // this.toggleIntervalButton(interval);

        if (this.musicService.showingMajorKey) {
            this.handleMajorIntervalClick(interval, index);
        }
        else {
            this.handleMinorIntervalClick(interval, index);
        }
    }

    handleMajorIntervalClick(interval: string, index: number) {
        if (this.musicService.intervalState[interval])
            this.musicService.removeIndexFromMajorOmissions(index);
        else
            this.musicService.addIndexToMajorOmissions(index);

        this.updateKeyVisualizationColors(this.musicService.majorKeyOmissionIndices);
    }

    handleMinorIntervalClick(interval: string, index: number) {
        this.setMusicKeyVisualData('minor');
        if (this.musicService.intervalState[interval])
            this.musicService.removeIndexFromMinorOmissions(index);
        else
            this.musicService.addIndexToMinorOmissions(index);

        this.updateKeyVisualizationColors(this.musicService.minorKeyOmissionIndices);
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
            const color = this.musicService.getColor(noteKey);
            bgColors.push(color);
        });

        // update => set options
        this.keyPickerVisual.googleChartOptions = this.googleChartService.updateChartOptions(this.currentChartDimension, bgColors);

        this.handleKeySelected({ selection: [{ column: 0, row: 0 }] });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        const screenWidth = event.target.innerWidth;

        this.currentChartDimension = screenWidth / 3.44;

        const kpBGColors = this.googleChartService.defaultOptions.colors;
        let bgColors = this.musicService.getCurrentBackgroundColors();

        if (this.musicService.showingMajorKey)
            bgColors = this.whiteOutKeyPositions(this.musicService.majorKeyOmissionIndices, bgColors);
        else
            bgColors = this.whiteOutKeyPositions(this.musicService.minorKeyOmissionIndices, bgColors);

        this.keyPickerVisual.googleChartOptions = this.googleChartService.updateChartOptions(this.currentChartDimension, kpBGColors);
        this.musicKeyVisual.googleChartOptions = this.googleChartService.updateChartOptions(this.currentChartDimension, bgColors);
    }

    intializeKeyPickerChart() {
        this.keyPickerVisual.type = this.googleChartService.PIE_CHART;
        this.keyPickerVisual.data = this.musicData.KeyPickerDataSet;
        this.keyPickerVisual.googleChartOptions = this.googleChartService.defaultOptions;
    }

    intializeKeyVisualChart() {
        this.musicKeyVisual.type = this.googleChartService.PIE_CHART;
        this.musicKeyVisual.data = this.musicData.majorKeyDataSet;
        this.musicKeyVisual.googleChartOptions = this.googleChartService.defaultOptions;
        this.updateKeyVisualizationColors(this.musicService.majorKeyOmissionIndices);
    }

    setMusicKeyVisualData(keyType = 'major') {
        this.musicKeyVisual.data = this.googleChartService.getKeyDataSet(keyType);
    }

    updateKeyVisualizationColors(indices: number[]) {

        let bgColors = this.musicService.getCurrentBackgroundColors();
        bgColors = this.whiteOutKeyPositions(indices, bgColors);

        this.musicKeyVisual.googleChartOptions = this.googleChartService.updateChartOptions(this.currentChartDimension, bgColors);
    }

    whiteOutKeyPositions(indices: number[], bgColors: string[]): string[] {
        indices.forEach(index => bgColors[index] = '#fff');
        return bgColors;
    }
}


