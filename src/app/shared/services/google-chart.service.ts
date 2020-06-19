import { Injectable } from '@angular/core';
import { GooglePieChart, GooglePieChartOptions } from '../models/google-pie-chart.model';
import { CommonService } from './common.service';

@Injectable()
export class GoogleChartService {

    constructor(private commonService: CommonService) { }

    pieChart: GooglePieChart;
    // todo: do I still need all of these still?
    readonly cirleOfFifthsDataSet = [
        ['C', 8.33],
        ['G', 8.33],
        ['D', 8.33],
        ['A', 8.33],
        ['E', 8.33],
        ['B', 8.33],
        ['F#', 8.33],
        ['C#', 8.33],
        ['G#', 8.33],
        ['D#', 8.33],
        ['A#', 8.33],
        ['F', 8.33]
    ];

    readonly circleOf5thRowMap: Map<number, number> = new Map<number, number>([
        [0, 3],
        [1, 10],
        [2, 5],
        [3, 0],
        [4, 7],
        [5, 2],
        [6, 9],
        [7, 4],
        [8, 11],
        [9, 6],
        [10, 1],
        [11, 8]
    ]);

    readonly KeyPickerDataSet = [
        ['A', 8.33],
        ['A#', 8.33],
        ['B', 8.33],
        ['C', 8.33],
        ['C#', 8.33],
        ['D', 8.33],
        ['D#', 8.33],
        ['E', 8.33],
        ['F', 8.33],
        ['F#', 8.33],
        ['G', 8.33],
        ['G#', 8.33]
    ];

    readonly majorKeyDataSet = [
        ['R*', 8.33],
        ['', 8.33],
        ['M2*', 8.33],
        ['', 8.33],
        ['M3*', 8.33],
        ['P4', 8.33],
        ['', 8.33],
        ['P5*', 8.33],
        ['', 8.33],
        ['M6*', 8.33],
        ['', 8.33],
        ['M7', 8.33]
    ];

    readonly minorKeyDataSet = [
        ['R*', 8.33],
        ['', 8.33],
        ['M2', 8.33],
        ['m3*', 8.33],
        ['', 8.33],
        ['P4*', 8.33],
        ['', 8.33],
        ['P5*', 8.33],
        ['m6', 8.33],
        ['', 8.33],
        ['m7*', 8.33],
        ['', 8.33]
    ];

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
        return this.circleOf5thRowMap.get(selection);
    }

    getPieChart(): GooglePieChart {
        return this.pieChart;
    }

    getKeyDataSet(keyType = 'major'): (string | number)[][] {

        if (this.pieChart === undefined)
            this.pieChart = new GooglePieChart();

        if (keyType === 'minor') {
            this.pieChart.data = this.minorKeyDataSet;
            return this.pieChart.data;
        }

        if (keyType === 'circleOf5ths') {
            this.pieChart.data = this.cirleOfFifthsDataSet;
            return this.pieChart.data;
        }

        this.pieChart.data = this.majorKeyDataSet;
        return this.pieChart.data;
    }

    getNewPieChart(): GooglePieChart {
        return new GooglePieChart();
    }

    updateChartColors(newColors: string[]): GooglePieChartOptions {
        // get copy of default options
        const optionsCopy: GooglePieChartOptions = this.commonService.copyObject(this.defaultOptions);

        // set new colors
        optionsCopy.colors = newColors;

        // return options with new colors
        return optionsCopy;
    }

    updateChartHeightWidth(height: number, width: number): GooglePieChartOptions {
        // get copy of default options
        const optionsCopy: GooglePieChartOptions = this.commonService.copyObject(this.defaultOptions);

        // set new heigth/width
        optionsCopy.height = height;
        optionsCopy.width = width;

        // return options with new height/width
        return optionsCopy;
    }
}
