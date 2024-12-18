import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService) {}

  register() {
    this.auth.register(this.username, this.password).subscribe(
      () => alert('Zarejestrowano pomyślnie. Możesz się zalogować.'),
      err => alert('Błąd rejestracji' )
    );
  }
}
