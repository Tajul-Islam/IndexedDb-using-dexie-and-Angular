import { Component, OnInit } from '@angular/core';
import {IndexedDbStorageService} from '../indexed-db-storage.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  playerList: any;
  private playerListSub: Subscription;
  constructor(private storageService: IndexedDbStorageService) { }

  ngOnInit(): void {
    this.storageService.getDataFromDB();
    this.playerListSub = this.storageService.playerList.subscribe(players => {
      this.playerList = players;
    });
  }
}
