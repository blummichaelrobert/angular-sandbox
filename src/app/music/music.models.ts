export class MusicKey {
  Root: string;
  minor2nd: string;
  Major2nd: string;
  minor3rd: string;
  Major3rd: string;
  Perfect4th: string;
  diminished5th: string;
  Perfect5th: string;
  minor6th: string;
  Major6th: string;
  minor7th: string;
  Major7th: string;
}

export class MusicNote {
  Name: string;
  Color: string;
}


export class IntervalState {
    showingRoot: boolean;
    showingMinor2: boolean;
    showingMajor2: boolean;
    showingMinor3: boolean;
    showingMajor3: boolean;
    showingPerfect4: boolean;
    showingDim5: boolean;
    showingPerfect5: boolean;
    showingMinor6: boolean;
    showingMajor6: boolean;
    showingMinor7: boolean;
    showingMajor7: boolean;

    constructor() {
        this.showingRoot = true;
        this.showingMinor2 = false;
        this.showingMajor2 = true;
        this.showingMinor3 = true;
        this.showingMajor3 = true;
        this.showingPerfect4 = true;
        this.showingDim5 = false;
        this.showingPerfect5 = true;
        this.showingMinor6 = true;
        this.showingMajor6 = true;
        this.showingMinor7 = true;
        this.showingMajor7 = true;

    }
}
