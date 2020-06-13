import { Component, Input, SimpleChange } from '@angular/core';
import { GoogleChartService } from '../../shared/services/google-chart.service';
import { MusicKeyService } from '../../shared/services/music-key.service';
import { GooglePieChart, GooglePieChartOptions } from '../../shared/models/google-pie-chart.model';

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

    constructor(private googleChartService: GoogleChartService) { }

    @Input() chartData: GooglePieChart;

    type = 'PieChart';

    keyPickerChartOptions: GooglePieChartOptions;

    ngOnInit() {
    }

    ngOnChanges(change: SimpleChange) {
        this.keyPickerChartOptions = {
            pieHole: 0.4,
            colors: change['chartData']['currentValue']['googleChartOptions']['colors'],
            legend: { position: 'none' },
            height: 300,
            pieSliceText: 'label',
            pieStartAngle: -15,
            tooltip: { trigger: 'none' },
            width: 300
        };
    }

    handleClick() {
        const data = this.googleChartService.createDataSet(['A', 'D', 'E']);
    }
}
