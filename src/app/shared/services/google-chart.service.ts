import { Injectable } from '@angular/core';
import { GooglePieChart, GooglePieChartOptions } from '../models/google-pie-chart.model';
import { CommonService } from './common.service';
import { MusicData } from '../../music/data/music-data';

@Injectable()
export class GoogleChartService {

    constructor(private commonService: CommonService) { }

    musicData: MusicData = new MusicData();

    pieChart: GooglePieChart;

    readonly defaultOptions: GooglePieChartOptions = {   
        colors: [
            '#ff0000', '#ff3300', '#ff6500',
            '#f9ed03', '#b6f903', '#059c0e',
            '#04d67b', '#00e6c2', '#0000ff',
            '#5a01ff', '#ab00ff', '#e6008e'
        ],
        legend: { position: 'none' },
        height: 600,
        pieHole: 0.4,
        pieSliceText: 'label',
        pieStartAngle: -14,
        tooltip: { trigger: 'none' },
        width: 600
    };

    readonly PIE_CHART = 'PieChart';

    ngOnInit() {
        this.pieChart = new GooglePieChart();
    }

    createDataSet(keyLabels: string[]): (string | number)[][] {
        const dataSet = [];

        const sliceSize = 100 / keyLabels.length;

        keyLabels.forEach(label => {
            dataSet.push([label, sliceSize]);
        });

        return dataSet;
    }

    getCircleOf5thsMappedNumber(selection: number): number {
        return this.musicData.circleOf5thRowMap.get(selection);
    }

    getPieChart(): GooglePieChart {
        return this.pieChart;
    }

    getKeyDataSet(keyType = 'major'): (string | number)[][] {

        if (this.pieChart === undefined)
            this.pieChart = new GooglePieChart();

        if (keyType === 'minor') {
            this.pieChart.data = this.musicData.minorKeyDataSet;
            return this.pieChart.data;
        }

        if (keyType === 'circleOf5ths') {
            this.pieChart.data = this.musicData.cirleOfFifthsDataSet;
            return this.pieChart.data;
        }

        this.pieChart.data = this.musicData.majorKeyDataSet;
        return this.pieChart.data;
    }

    getNewPieChart(): GooglePieChart {
        return new GooglePieChart();
    }

    updateChartOptions(dimension: number, colors: string[]): GooglePieChartOptions {
        // get copy of default options
        const optionsCopy: GooglePieChartOptions = this.commonService.copyObject(this.defaultOptions);

        // set new colors
        optionsCopy.colors = colors;

        // set new heigth/width
        optionsCopy.height = dimension;
        optionsCopy.width = dimension;

        // return options with new height/width
        return optionsCopy;
    }
}
