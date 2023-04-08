import { Component, OnInit } from '@angular/core';
import { MessageService } from './../../service/message.service';
import { Message } from '../../model/message';
@Component({
  selector: 'app-message-gestion',
  templateUrl: './message-gestion.component.html',
  styleUrls: ['./message-gestion.component.css']
})
export class MessageGestionComponent implements OnInit {
  messages!:Message[];
  constructor(private messageService: MessageService) { 
    this.readMessage();
  }
  ngOnInit() {}
  readMessage(){
    this.messageService.getMessages().subscribe((data) => {
     this.messages = data;
    })    
  }

  deleteMessage(message: any) {
    if (confirm('Are you sure to delete this record?')) {
      this.messageService.deleteMessage(message._id ?? '').subscribe(
        (res) => {
          if (res.message === 'Message deleted successfully!') {
            this.messages.splice(this.messages.indexOf(message), 1);
          }
        },
        (error) => console.log(error) // handle error if any
      );
    }
  }
}  

  

