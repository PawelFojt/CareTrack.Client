import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7081/chathub')
      .build();
  }

  startConnection(): Promise<void> {
    return this.hubConnection.start();
  }

  sendMessage(user: string, message: string): Promise<void> {
    return this.hubConnection.invoke('SendMessage', user, message);
  }

  onMessageReceived(callback: (user: string, message: string) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }
}
