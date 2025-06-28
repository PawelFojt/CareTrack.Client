import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrendAnalysis } from "../models/health-trend.model";
import { TrendsService } from "../services/trends.service";
import { UserService, User } from "../services/user.service";
import {CommonModule, DecimalPipe} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-trends-summary',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DecimalPipe,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './trends-summary.component.html',
  styleUrl: './trends-summary.component.css'
})
export class TrendsSummaryComponent implements OnInit {
  selectedPatientId: number | null = null;
  selectedPeriod: string = 'month';
  analysis: TrendAnalysis | null = null;
  patients: User[] = [];

  constructor(
    private trendsService: TrendsService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients(): void {
    this.userService.getUsers()
      .subscribe({
        next: (response) => {
          if (!response.isError && response.value) {
            this.patients = response.value;
          }
        },
        error: (error) => {
          console.error('Błąd podczas pobierania listy pacjentów:', error);
        }
      });
  }

  loadAnalysis() {
    if (this.selectedPatientId) {
      this.trendsService.getTrendAnalysis(this.selectedPatientId, this.selectedPeriod)
        .subscribe({
          next: (result) => {
            if (!result.isError && result.value) {
              this.analysis = result.value;
            } else {
              console.error('Błąd w odpowiedzi:', result.message);
              this.analysis = null;
            }
          },
          error: (error) => {
            console.error('Błąd podczas pobierania analizy:', error);
            this.analysis = null;
          }
        });
    }
  }

  abs(value: number): number {
    return Math.abs(value);
  }

  getBMICategory(bmi: number): string {
    if (bmi < 18.5) return 'Niedowaga';
    if (bmi < 25) return 'Prawidłowa masa ciała';
    if (bmi < 30) return 'Nadwaga';
    return 'Otyłość';
  }

  getBloodPressureCategory(bp: { systolic: number, diastolic: number }): string {
    if (bp.systolic < 120 && bp.diastolic < 80) return 'Optymalne';
    if (bp.systolic < 130 && bp.diastolic < 85) return 'Prawidłowe';
    if (bp.systolic < 140 && bp.diastolic < 90) return 'Wysokie prawidłowe';
    return 'Podwyższone';
  }

  getHeartRateCategory(hr: number): string {
    if (hr < 60) return 'Bradykardia';
    if (hr <= 100) return 'Prawidłowe';
    return 'Tachykardia';
  }

  getPeriodLabel(): string {
    const labels = {
      'week': 'ostatni tydzień',
      'month': 'ostatni miesiąc',
      'year': 'ostatni rok'
    };
    return labels[this.selectedPeriod as keyof typeof labels];
  }
}
