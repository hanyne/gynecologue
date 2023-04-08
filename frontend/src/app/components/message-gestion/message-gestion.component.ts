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

  readMessage() {
    this.messageService.getMessages().subscribe((data) => {
      this.messages = data;
    });
  }

  onDelete(message: Message) {
    if (message && message._id && confirm(`Are you sure you want to delete the article "${message.nom}"?`)) {
      this.messageService.deleteMessage(message._id).subscribe(
        () => {
          const index = this.messages.findIndex(a => a._id === message._id);
          this.messages.splice(index, 1);
        },
        (err) => console.error(err)
      );
    }
  }
}
