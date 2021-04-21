import {Component, OnInit} from '@angular/core';
import {IndexedDbStorageService} from './indexed-db-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'learningIndexedDb';
  constructor(private storageService: IndexedDbStorageService) {
  }
  ngOnInit() {
    this.storageService.createDB();
    this.storageService.storeDataInDB();
  }
}
