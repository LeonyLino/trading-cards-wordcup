import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface HeaderData {
    username: string;
    team: string;
    countryCode: string;
    owned: number;
    total: number;
}

@Injectable({
    providedIn: 'root'
})
export class HeaderService {

    private headerDataSubject = new BehaviorSubject<HeaderData>({
        username: '',
        team: '',
        countryCode: '',
        owned: 0,
        total: 0
    });

    headerData$ = this.headerDataSubject.asObservable();

    update(data: HeaderData) {
        this.headerDataSubject.next(data);
    }
}