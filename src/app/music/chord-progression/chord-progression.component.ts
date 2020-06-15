import { Component, Input, SimpleChange } from '@angular/core';
import { GoogleChartService } from '../../shared/services/google-chart.service';
import { MusicKeyService } from '../../shared/services/music-key.service';
import { GooglePieChart, GooglePieChartOptions } from '../../shared/models/google-pie-chart.model';
import { MusicKey } from '../music.models';
import { interval } from 'rxjs';

@Component({
    selector: 'chord-progression',
    templateUrl: './chord-progression.component.html',
    styleUrls: ['./chord-progression.component.css'],
    providers: [
        GoogleChartService,
        MusicKeyService
    ]
})

export class ChordProgressionComponent {

    @Input() musicKey: MusicKey;
    @Input() showingMajorKey: boolean;

    chartOptions: GooglePieChartOptions;
    data: (string | number)[][];
    type = 'PieChart';

    constructor(private googleChartService: GoogleChartService,
                private musicKeyService: MusicKeyService) { }

    ngOnInit() {
    }

    ngOnChanges() {

        if (!this.showingMajorKey) {
            this.handleProgressionSelected(['Root', 'minor6th', 'minor7th']);
            return;
        }

        this.handleProgressionSelected(['Root', 'Perfect4th', 'Perfect5th']);
    }

    determineStartAngle(intervals: string[]): number {
        let startAngle = 0;
        if (intervals.length === 3)
            startAngle = -60

        if (intervals.length === 4)
            startAngle = -45

        return startAngle;
    }

    getBackgroundColors(intervals: string[]): string[] {
        const backgroundColors: string[] = [];
        intervals.forEach(interval => {
            const note = this.musicKey[interval]
            backgroundColors.push(this.musicKeyService.getColor(note));
        });
        return backgroundColors;
    }

    handleProgressionSelected(intervals: string[]) {

        this.setChartData(intervals);

        this.setChartOptions(this.getBackgroundColors(intervals), this.determineStartAngle(intervals));
    }

    setChartData(intervals: string[]) {
        const dataRequest: string[] = [];
        intervals.forEach(interval => {
            const note = this.musicKey[interval]
            dataRequest.push(note);
        });

        this.data = this.googleChartService.createDataSet(dataRequest);
    }

    setChartOptions(backgroundColors: string[], startAngle: number) {
        this.chartOptions = {
            pieHole: 0.4,
            colors: backgroundColors,
            legend: { position: 'none' },
            height: 300,
            pieSliceText: 'label',
            pieStartAngle: startAngle,
            tooltip: { trigger: 'none' },
            width: 300
        };
    }
}
