import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Browser } from '../../shared/browser.model';
import { Device } from '../../shared/device.model';
import { ProjectType } from '../../core/types';

@Injectable({ providedIn: 'root' })
export class FiltersService {
  testNameFilter: BehaviorSubject<string> = new BehaviorSubject(null);
  browserFilter: BehaviorSubject<Browser[]> = new BehaviorSubject([]);
  deviceFilter: BehaviorSubject<Device[]> = new BehaviorSubject([]);
  projectFilter: BehaviorSubject<ProjectType[]> = new BehaviorSubject([]);
  testStateFilter: BehaviorSubject<string[]> = new BehaviorSubject([]);
  customFilter: BehaviorSubject<any[]> = new BehaviorSubject(null);
}
