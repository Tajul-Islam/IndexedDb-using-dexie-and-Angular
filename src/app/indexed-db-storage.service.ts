import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbStorageService {
  db: any;
  playerList = new Subject<any>();
  constructor() { }

  async createDB(){
    this.db = new Dexie('PlayersDatabase');
    await this.db.version(1).stores({
      players: '++id, name, &email, &phoneNumber, address.country,currentClub'
    });
    await this.db.open().catch((e) => {
      console.error('Open failed: ' + e.stack);
    });
  }

  storeDataInDB(){
    this.db.transaction('rw', this.db.players, async () => {
      await this.db.players.add({
        name: 'Zlatan',
        email: 'zlatan.ibrahimovic@gmail.com',
        phoneNumber: '01825711956',
        address: {
          city: 'Malmö',
          country: 'Sweden'
        },
        currentClub: 'Milan'
      });
    }).catch ((e) => {
    });
  }

  getDataFromDB(){
     this.db.transaction('rw', this.db.players, async () => {
      const data = [];
      this.db.players
        .each((player) => {
         data.push(player);
        });
      this.playerList.next(data);
    }).catch ((e) => {
      console.error(e.message);
    });
  }

}
