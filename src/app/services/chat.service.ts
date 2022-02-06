import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'; 

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

    hubConnection:signalR.HubConnection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl("https://localhost:7294/chatHub"
    // , {
    //   skipNegotiation: true,
    //   transport: signalR.HttpTransportType.WebSockets
    // }
    )   // mapping to the chathub as in startup.cs
    .build();

   sendMessage(userName:string,message:string){
    this.hubConnection
      .invoke('SendMessage', userName, message)
      .catch(err => console.error(err));
  }
}
