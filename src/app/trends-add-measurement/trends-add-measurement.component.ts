import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService, User } from '../services/user.service';
import { TrendsService } from '../services/trends.service';
import { HealthTrend } from '../models/health-trend.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-trends-add-measurement',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './trends-add-measurement.component.html',
  styleUrl: './trends-add-measurement.component.css'
})
export class TrendsAddMeasurementComponent implements OnInit {
  measurementForm: FormGroup;
  patients: User[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private trendsService: TrendsService,
    private snackBar: MatSnackBar
  ) {
    this.measurementForm = this.fb.group({
      patientId: ['', Validators.required],
      measurementDate: [new Date(), Validators.required],
      weight: ['', [Validators.required, Validators.min(0), Validators.max(500)]],
      bmi: ['', [Validators.min(0), Validators.max(100)]],
      bloodPressureSystolic: ['', [Validators.min(0), Validators.max(300)]],
      bloodPressureDiastolic: ['', [Validators.min(0), Validators.max(200)]],
      heartRate: ['', [Validators.min(0), Validators.max(300)]],
      notes: ['']
    });
  }

  ngOnInit(): void {
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
          this.showError('Błąd podczas pobierania listy pacjentów');
        }
      });
  }

  getErrorMessage(controlName: string): string {
    const control = this.measurementForm.get(controlName);
    if (!control) return '';

    if (control.errors?.['required']) {
      return 'To pole jest wymagane';
    }
    if (control.errors?.['min'] || control.errors?.['max']) {
      switch(controlName) {
        case 'weight': return 'Prawidłowy zakres: 0-500 kg';
        case 'bmi': return 'Prawidłowy zakres: 0-100';
        case 'bloodPressureSystolic': return 'Prawidłowy zakres: 0-300 mmHg';
        case 'bloodPressureDiastolic': return 'Prawidłowy zakres: 0-200 mmHg';
        case 'heartRate': return 'Prawidłowy zakres: 0-300 uderzeń/min';
        default: return 'Nieprawidłowa wartość';
      }
    }
    return '';
  }
  onSubmit(): void {
    if (this.measurementForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const measurement: HealthTrend = this.measurementForm.value;

      this.trendsService.addHealthMeasurement(measurement)
        .subscribe({
          next: () => {
            this.showSuccess('Pomiar został dodany');
            this.resetForm();
          },
          error: (error) => {
            this.showError('Błąd podczas dodawania pomiaru');
          },
          complete: () => {
            this.isSubmitting = false;
          }
        });
    }
  }

  resetForm(): void {
    this.measurementForm.reset({
      measurementDate: new Date()
    });
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
