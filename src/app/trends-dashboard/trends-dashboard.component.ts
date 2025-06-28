import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-trends-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './trends-dashboard.component.html',
  styleUrl: './trends-dashboard.component.css'
})
export class TrendsDashboardComponent {

}
