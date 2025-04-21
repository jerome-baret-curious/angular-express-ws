import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private _socket$: WebSocketSubject<string> = webSocket('wss://localhost:3000');

  sendMessage(message: string) {
    this._socket$.next(message);
  }

  getMessages(): Observable<string> {
    return this._socket$.asObservable();
  }

  closeConnection() {
    this._socket$.complete();
  }
}
