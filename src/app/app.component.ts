import { AfterViewChecked, AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Message } from './models/message.model';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef | undefined;
  messages:Message[]=[]

  messageForm = this.formBuilder.group({
    userName:['',[Validators.required]],
    message:['',[Validators.required]],
  })

 constructor(private chatService:ChatService,private formBuilder:FormBuilder){
    this.chatService.hubConnection.start().then(()=> console.log("connection started"));
    this.chatService.hubConnection.on("ReceiveMessage", (user, message) => { 
      let tempMessage = new Message(user, message)
      if(user == this.currentUsrName()){
        tempMessage.mine = true;
      }
      this.messages.push(tempMessage)
      
    });
 }
  ngAfterViewChecked(): void {
    this.scrollToBottom(); 
  }
  scrollToBottom(): void {
    try {
      if(this.myScrollContainer){
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      }
    } catch(err) { }                 
}

 sendMessage(){
  let userName = this.messageForm.controls["userName"].value;
  let message = this.messageForm.controls["message"].value;
  
  this.chatService.sendMessage(userName,message)  
  this.messageForm.controls["message"].setValue("")

 }

currentUsrName(){
   return this.messageForm.controls["userName"].value
 }

}
