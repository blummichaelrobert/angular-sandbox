import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

    copyObject(source: object): object {
        const copy = { ...source };
        return copy;
    }
}
