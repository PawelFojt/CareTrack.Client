import { Component, OnInit } from '@angular/core';
import { KnowledgeService, KnowledgeItem } from '../services/knowledge.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-knowledge',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.css']
})
export class KnowledgeComponent implements OnInit {
  knowledgeItems: KnowledgeItem[] = [];

  username: string | null = null;

  newTitle = '';
  newDescription = '';
  newType: number = 0;
  newUrl = '';

  editMode = false;
  editItemId: number | null = null;
  editTitle = '';
  editDescription = '';
  editType: number = 0;
  editUrl = '';

  constructor(private knowledgeService: KnowledgeService, private auth: AuthService) {}

  ngOnInit(): void {
    this.username = this.auth.getLoggedInUser();
    this.loadItems();
  }

  loadItems() {
    this.knowledgeService.getAll().subscribe(items => {
      this.knowledgeItems = items.sort((a, b) => a.id - b.id);
    });
  }

  addNewItem() {
    if (!this.newTitle || !this.newDescription) {
      alert('Uzupełnij tytuł i opis.');
      return;
    }

    if (!this.username) {
      alert('Musisz być zalogowany, aby dodać zasób.');
      return;
    }

    const newItem = {
      title: this.newTitle,
      description: this.newDescription,
      type: Number(this.newType),
      url: this.newUrl,
      author: this.username
    };

    this.knowledgeService.addKnowledgeItem(newItem).subscribe(
      item => {
        this.newTitle = '';
        this.newDescription = '';
        this.newType = 0;
        this.newUrl = '';
        this.loadItems();
      },
      err => alert('Błąd podczas dodawania elementu.')
    );
  }

  deleteItem(id: number, author: string) {
    if (!this.username || this.username !== author) {
      alert('Nie możesz usunąć tego elementu, nie jesteś autorem.');
      return;
    }

    if (confirm('Czy na pewno chcesz usunąć ten element?')) {
      this.knowledgeService.deleteKnowledgeItem(id, author).subscribe(
        () => this.loadItems(),
        err => alert('Błąd podczas usuwania elementu.')
      );
    }
  }

  startEdit(item: KnowledgeItem) {
    if (!this.username || this.username !== item.author) {
      alert('Nie możesz edytować tego elementu, nie jesteś autorem.');
      return;
    }
    this.editMode = true;
    this.editItemId = item.id;
    this.editTitle = item.title;
    this.editDescription = item.description;
    this.editType = item.type;
    this.editUrl = item.url;
  }

  cancelEdit() {
    this.editMode = false;
    this.editItemId = null;
    this.editTitle = '';
    this.editDescription = '';
    this.editType = 0;
    this.editUrl = '';
  }

  saveEdit() {
    if (!this.editItemId || !this.editTitle || !this.editDescription) {
      alert('Uzupełnij tytuł i opis.');
      return;
    }

    if (!this.username) {
      alert('Musisz być zalogowany, aby edytować zasób.');
      return;
    }

    const updatedItem = {
      title: this.editTitle,
      description: this.editDescription,
      type: Number(this.editType),
      url: this.editUrl,
      author: this.username
    };

    this.knowledgeService.updateKnowledgeItem(this.editItemId, updatedItem).subscribe(
      () => {
        this.cancelEdit();
        this.loadItems();
      },
      err => alert('Błąd podczas aktualizacji elementu.')
    );
  }
}
