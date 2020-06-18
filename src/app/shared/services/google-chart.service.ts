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

    readonly chromaticDataSet = [
        ['Root', 8.33],
        ['m2', 8.33],
        ['M2', 8.33],
        ['m3', 8.33],
        ['M3', 8.33],
        ['P4', 8.33],
        ['d5', 8.33],
        ['P5', 8.33],
        ['m6', 8.33],
        ['M6', 8.33],
        ['m7', 8.33],
        ['M7', 8.33]
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

    readonly keyPickerChartOptions = {
        pieHole: 0.4,
        colors: [
            '#ff0000', '#ff3300', '#ff6500',
            '#f9ed03', '#b6f903', '#059c0e',
            '#04d67b', '#00e6c2', '#0000ff',
            '#5a01ff', '#ab00ff', '#e6008e'
        ],
        legend: { position: 'none' },
        height: 500,
        pieSliceText: 'label',
        pieStartAngle: -15,
        tooltip: { trigger: 'none' },
        width: 500
    };

    readonly chromaticChartOptions = {
        pieHole: 0.4,
        colors: [
            '#ff0000', '#ff3300', '#ff6500',
            '#f9ed03', '#b6f903', '#059c0e',
            '#04d67b', '#00e6c2', '#0000ff',
            '#5a01ff', '#ab00ff', '#e6008e'
        ],
        legend: { position: 'none' },
        height: 500,
        pieSliceText: 'label',
        pieStartAngle: -15,
        tooltip: { trigger: 'none' },
        width: 500
    };

    readonly keyChartOptions = {
        pieHole: 0.4,
        colors: [
            '#ff0000', '#ffffff', '#ff6500',
            '#ffffff', '#b6f903', '#059c0e',
            '#ffffff', '#00e6c2', '#ffffff',
            '#5a01ff', '#ffffff', '#e6008e'
        ],
        legend: { position: 'none' },
        height: 600,
        pieSliceText: 'label',
        pieStartAngle: -14,
        tooltip: { trigger: 'none' },
        width: 600
    };

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

    updateChartOptions(chartType: string, height: number, width: number): GooglePieChartOptions {

        let optionsCopy: object;
        switch (chartType) {
            case 'keyPicker':
                optionsCopy = this.commonService.copyObject(this.keyPickerChartOptions);
                optionsCopy['height'] = height;
                optionsCopy['width'] = width;
                return optionsCopy;
                break;
            default:
                return new GooglePieChartOptions();
        }

    }
}
