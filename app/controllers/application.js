import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

class Todo {
  @tracked id;
  @tracked title;
  @tracked isCompleted;

  constructor(id, title, isCompleted) {
    this.id = id;
    this.title = title;
    this.isCompleted = isCompleted;
  }
}

export default class ApplicationController extends Controller {
  @tracked newTodoTitle = '';
  @tracked todos = [
    new Todo(1, 'Umyć okna', false),
    new Todo(2, 'Stworzyć aplikację MVC', true),
    new Todo(3, 'Zaliczyć semestr', false),
  ];

  @action
  updateNewTodoTitle(event) {
    this.newTodoTitle = event.target.value;
  }

  @action
  addTodo(event) {
    event.preventDefault();
    if (this.newTodoTitle.trim()) {
      this.todos = [
        ...this.todos,
        new Todo(Date.now(), this.newTodoTitle, false),
      ];
      this.newTodoTitle = '';
    }
  }

  @action
  toggleCompletion(todo) {
    todo.isCompleted = !todo.isCompleted;
    this.todos = [...this.todos];
  }

  @action
  removeTodo(todo) {
    this.todos = this.todos.filter((t) => t.id !== todo.id);
  }
}
