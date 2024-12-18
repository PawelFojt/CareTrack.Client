import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user = '';
  message = '';
  messages: { user: string; text: string }[] = [];

  constructor(
    private chatService: ChatService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const loggedInUser = this.auth.getLoggedInUser();
    if (loggedInUser) {
      this.user = loggedInUser;
    }

    this.chatService.startConnection().then(() => {
      this.chatService.onMessageReceived((user, message) => {
        this.messages.push({ user, text: message });
      });
    });
  }

  sendMessage() {
    if (this.user && this.message) {
      this.chatService.sendMessage(this.user, this.message).then(() => {
        this.message = '';
      });
    }
  }
}
