import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import { Chart, ChartConfiguration } from 'chart.js/auto';
import {HealthTrend} from "../models/health-trend.model";
import {TrendsService} from "../services/trends.service";
import {User, UserService} from "../services/user.service";
import {CommonModule} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";

@Component({
  selector: 'app-trends-chart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggle,
    MatButtonToggleGroup

  ],
  templateUrl: './trends-chart.component.html',
  styleUrl: './trends-chart.component.css'
})
export class TrendsChartComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  patients: User[] = [];
  selectedPatientId: number | null = null;
  selectedMetric: 'weight' | 'bloodPressure' | 'heartRate' = 'weight';
  trends: HealthTrend[] = [];
  chart: Chart | null = null;

  constructor(
    private userService: UserService,
    private trendsService: TrendsService
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


  loadTrends() {
    if (this.selectedPatientId) {
      this.trendsService.getPatientTrends(this.selectedPatientId)
        .subscribe({
          next: (result) => {
            this.trends = result.value || [];
            this.updateChart();
          },
          error: (error) => {
            console.error('Błąd podczas pobierania trendów:', error);
            this.trends = [];
          }
        });
    }
  }


  switchChartType(metric: 'weight' | 'bloodPressure' | 'heartRate') {
    this.selectedMetric = metric;
    this.updateChart();
  }

  private updateChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    const dates = this.trends.map(t => new Date(t.measurementDate).toLocaleDateString());

    let chartData: ChartConfiguration;

    switch (this.selectedMetric) {
      case 'weight':
        chartData = {
          type: 'line',
          data: {
            labels: dates,
            datasets: [{
              label: 'Waga (kg)',
              data: this.trends.map(t => t.weight),
              borderColor: '#007bff',
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: false,
                title: {
                  display: true,
                  text: 'Waga (kg)'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Data'
                }
              }
            }
          }
        };
        break;

      case 'bloodPressure':
        const systolicData = this.trends
          .map(t => t.bloodPressureSystolic ?? null);
        const diastolicData = this.trends
          .map(t => t.bloodPressureDiastolic ?? null);

        chartData = {
          type: 'line',
          data: {
            labels: dates,
            datasets: [
              {
                label: 'Skurczowe',
                data: systolicData,
                borderColor: '#dc3545',
                tension: 0.1
              },
              {
                label: 'Rozkurczowe',
                data: diastolicData,
                borderColor: '#28a745',
                tension: 0.1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: false,
                title: {
                  display: true,
                  text: 'Ciśnienie krwi (mmHg)'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Data'
                }
              }
            }
          }
        };
        break;

      case 'heartRate':
        const heartRateData = this.trends
          .map(t => t.heartRate ?? null);

        chartData = {
          type: 'line',
          data: {
            labels: dates,
            datasets: [{
              label: 'Tętno (uderzenia/min)',
              data: heartRateData,
              borderColor: '#fd7e14',
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: false,
                title: {
                  display: true,
                  text: 'Tętno (uderzenia/min)'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Data'
                }
              }
            }
          }
        };
        break;
    }

    this.chart = new Chart(ctx, chartData);
  }
}



