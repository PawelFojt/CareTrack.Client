export interface HealthTrend {
  id?: number;
  patientId: number;
  measurementDate: Date;
  weight: number;
  bmi?: number | null;
  bloodPressureSystolic?: number | null;
  bloodPressureDiastolic?: number | null;
  heartRate?: number | null;
  notes?: string | null;
}


export interface TrendAnalysis {
  period: string;
  averageWeight: number;
  weightChange: number;
  averageBMI?: number;
  averageBloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  averageHeartRate?: number;
}
