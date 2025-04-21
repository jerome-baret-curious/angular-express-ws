import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {WebsocketService} from '../services/websocket.service';
import {GreekMythologyService} from '../services/greek-mythology.service';
import {Hero} from '../entities/hero';
import {Monster} from '../entities/monster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  private _websocketService = inject(WebsocketService);
  private _greekMythologyService = inject(GreekMythologyService);
  character: WritableSignal<Hero | Monster | undefined> = signal(undefined);
  messages: WritableSignal<string[]> = signal([]);

  ngOnInit(): void {
    if (Math.random() > 0.5) {
      this._greekMythologyService.getHeroes().subscribe(heroes => {
        this._enterGame(heroes);
      })
    } else {
      this._greekMythologyService.getMonsters().subscribe(monsters => {
        this._enterGame(monsters);
      })
    }

    this._websocketService.getMessages().subscribe(message => {
      this.messages.set(this.messages().concat(message));
    })
  }

  send(msg: string): void {
    this._websocketService.sendMessage(this.character()?.name + ': ' + msg);
  }

  private _enterGame(creatures: (Hero|Monster)[]): void {
    const creature = creatures[this._randomPositiveInt(creatures.length)];
    this.character.set(creature);
    this._websocketService.sendMessage(creature.name + ' has entered');
  }

  private _randomPositiveInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  ngOnDestroy(): void {
    this._websocketService.closeConnection();
  }
}
