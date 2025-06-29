import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Celebration {
  id: number;
  left: string;
  delay: number;
}

@Component({
  standalone: true,
  selector: 'app-cele-rozwojowe',
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="top-controls">
        <button class="add-btn" (click)="addGoal()">➕ Dodaj cel</button>
      </div>

      <h1>🎯 Twoje cele rozwojowe</h1>
      <p class="intro">Cele pomagają Ci dbać o dobrostan. Śledź swój postęp!</p>

      <div class="summary">
        Masz {{ goals.length }} cel(e). Ukończone: {{ completedCount }} ✅
      </div>

      <div *ngIf="goals.length === 0" class="no-goals">
        Brak zdefiniowanych celów. Dodaj coś inspirującego ✨
      </div>

      <div *ngFor="let goal of goals" class="goal-card" [class.completed]="goal.completed">
        <div class="goal-header">
          <h2>{{ goal.title }}</h2>
          <div class="btn-group">
            <button class="increment-btn" (click)="incrementProgress(goal)">Udało mi się!</button>
            <button class="delete-btn" (click)="deleteGoal(goal)">🗑️</button>
          </div>
        </div>
        <p class="description">{{ goal.description }}</p>

        <div class="progress-bar">
          <div class="progress-fill" [style.width.%]="goal.progress"></div>
        </div>
        <p class="progress-text">Postęp: {{ goal.progress }}%</p>

        <p *ngIf="goal.completed" class="completed-text">✅ Cel ukończony!</p>

        <!-- Celebratory emojis -->
        <ng-container *ngIf="goal.celebrations">
          <div *ngFor="let c of goal.celebrations" class="celebration" [style.left]="c.left" [style.animationDelay]="c.delay + 's'">🎉</div>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    /* Container styling */
    .container {
      max-width: 700px;
      margin: 3rem auto;
      padding: 1.5rem;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #fafafa;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .top-controls {
      text-align: right;
      margin-bottom: 1rem;
    }
    .add-btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 20px;
      background: linear-gradient(120deg, #66bb6a, #57a05b);
      color: #fff;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s, transform 0.2s;
    }
    .add-btn:hover { background: linear-gradient(120deg, #81c784, #6fbf6f); }
    .add-btn:active { transform: scale(0.95); }

    /* Header texts */
    h1 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: #333;
    }
    .intro {
      text-align: center;
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 2rem;
    }

    /* Summary */
    .summary {
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #444;
      text-align: center;
    }
    .no-goals {
      text-align: center;
      font-size: 1rem;
      color: #888;
      margin: 2rem 0;
    }

    /* Goal cards */
    .goal-card {
      background: #fff;
      border-radius: 10px;
      padding: 1.2rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: transform 0.3s, box-shadow 0.3s;
      position: relative;
      overflow: hidden;
    }
    .goal-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    }
    .goal-card.completed { border-left: 6px solid #4caf50; }

    /* Header inside card */
    .goal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.7rem;
    }
    .btn-group { display: flex; gap: 0.5rem; }
    .goal-header h2 {
      font-size: 1.3rem;
      margin: 0;
      color: #2c3e50;
    }

    /* Description */
    .description {
      font-size: 1rem;
      color: #555;
      margin-bottom: 1rem;
    }

    /* Progress bar */
    .progress-bar {
      width: 100%;
      height: 12px;
      background: #e0e0e0;
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #3f51b5, #5c6bc0);
      transition: width 0.5s ease-in-out;
    }
    .progress-text {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 0.8rem;
      text-align: right;
    }

    /* Buttons inside card */
    .increment-btn {
      padding: 0.4rem 0.8rem;
      border: none;
      border-radius: 20px;
      background: linear-gradient(120deg, #42a5f5, #478ed1);
      color: #fff;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.3s, transform 0.2s;
    }
    .increment-btn:hover { background: linear-gradient(120deg, #5bb8fb, #6da5e0); }
    .increment-btn:active { transform: scale(0.95); }

    .delete-btn {
      padding: 0.3rem 0.5rem;
      border: none;
      border-radius: 6px;
      background: rgba(255,87,34,0.1);
      color: #ff5722;
      cursor: pointer;
      transition: background 0.3s;
    }
    .delete-btn:hover { background: rgba(255,87,34,0.2); }

    /* Completed text */
    .completed-text {
      font-size: 1rem;
      color: #4caf50;
      font-weight: 600;
      text-align: center;
      margin-top: 0.5rem;
    }

    /* Celebrations */
    .celebration {
      position: absolute;
      bottom: 10%;
      font-size: 2rem;
      transform: translateY(0) scale(0);
      animation: floatUp 2s ease-out forwards;
      pointer-events: none;
    }
    @keyframes floatUp {
      0% { opacity: 1; transform: translateY(0) scale(0.5); }
      50% { opacity: 1; transform: translateY(-100px) scale(1.2); }
      100% { opacity: 0; transform: translateY(-200px) scale(1); }
    }
  `]
})
export class CeleRozwojoweComponent {
  goals = [
    { id: 1, title: "Poprawa jakości snu", description: "Kłaść się spać przed 23:00 przez 2 tygodnie.", progress: 60, completed: false, celebrations: null },
    { id: 2, title: "Regularna aktywność fizyczna", description: "Ćwiczyć minimum 3 razy w tygodniu przez miesiąc.", progress: 90, completed: false, celebrations: null },
    { id: 3, title: "Medytacja", description: "Medytować codziennie przez 10 minut przez 10 dni.", progress: 100, completed: true, celebrations: null },
  ];

  get completedCount(): number {
    return this.goals.filter(g => g.completed).length;
  }

  incrementProgress(goal: any) {
    if (goal.completed) return;
    goal.progress = Math.min(goal.progress + 10, 100);
    if (goal.progress === 100) {
      goal.completed = true;
      this.launchCelebration(goal);
    }
  }

  launchCelebration(goal: any) {
    const count = 15;
    goal.celebrations = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 80 + 10 + '%',
      delay: Math.random() * 0.5
    } as Celebration));
    setTimeout(() => goal.celebrations = null, 2600);
  }

  addGoal() { /* placeholder */ }
  deleteGoal(goal: any) { /* placeholder */ }
}
