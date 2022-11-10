import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenderDataService {
@Output() sender: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
