

export class MusicData {

    readonly chromaticMap: Map<string, string[]> = new Map([
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

    readonly colorMap: Map<string, string> = new Map([
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

    readonly intervalMap: Map<number, string> = new Map([
        [0, 'showingRoot'],
        [1, 'showingMinor2'],
        [2, 'showingMajor2'],
        [3, 'showingMinor3'],
        [4, 'showingMajor3'],
        [5, 'showingPerfect4'],
        [6, 'showingDim5'],
        [7, 'showingPerfect5'],
        [8, 'showingMinor6'],
        [9, 'showingMajor6'],
        [10, 'showingMinor7'],
        [11, 'showingMajor7']
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

    readonly majorKeyOmissionIndices: number[] = [1, 3, 6, 8, 10];

    readonly minorKeyOmissionIndices: number[] = [1, 4, 6, 9, 11];

    readonly majorKeyDataSet = [
        ['I*', 8.33],
        ['m2', 8.33],
        ['ii*', 8.33],
        ['m3', 8.33],
        ['iii*', 8.33],
        ['IV', 8.33],
        ['d5', 8.33],
        ['V*', 8.33],
        ['m6', 8.33],
        ['vi*', 8.33],
        ['m7', 8.33],
        ['dim', 8.33]
    ];

    readonly minorKeyDataSet = [
        ['i*', 8.33],
        ['M2', 8.33],
        ['dim', 8.33],
        ['III*', 8.33],
        ['M3', 8.33],
        ['iv*', 8.33],
        ['d5', 8.33],
        ['v*', 8.33],
        ['VI', 8.33],
        ['M6', 8.33],
        ['VII*', 8.33],
        ['M7', 8.33]
    ];
}
