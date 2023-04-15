import { Component } from '@angular/core';
import { MessageService } from './../../service/message.service';
import { Message } from '../../model/message';
@Component({
  selector: 'app-reclamation-list',
  templateUrl: './reclamation-list.component.html',
  styleUrls: ['./reclamation-list.component.css']
})
export class ReclamationListComponent {
  messages: Message[] = [];
  selectedMessage: Message | null = null;
  isNew = false;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.messageService.getMessages().subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      },
      (error: any) => {
        console.error('Failed to get messages', error);
      }
    );
  }


  deleteMessage(id: string): void {
    this.messageService.deleteMessage(id).subscribe(
      () => {
        this.messages = this.messages.filter(message => message._id !== id);
      },
      (error: any) => {
        console.error(`Failed to delete message with ID: ${id}`, error);
      }
    );
  }


}
