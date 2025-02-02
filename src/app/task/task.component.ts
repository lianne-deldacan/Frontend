import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  
  tasks: any[] = [];
  currentTask: any = {
    name: '',
    description: '',
    status: 'To complete',
    pomodoroCount: 0,
    dateToBeFinished: '',
  };

  // Pomodoro timer properties
  defaultMinutes: number = 25; // Default minutes
  minutes: number = this.defaultMinutes; // Current minutes
  seconds: number = 0; // Current seconds
  customMinutes: number | null = null; // For user input
  private totalSeconds: number = this.defaultMinutes * 60; // Total time in seconds
  private timerInterval: any;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

fetchTasks(): void {
  this.taskService.getTasks().subscribe(
    (response: any) => {
      console.log('Fetched tasks:', response); 
      if (response.success) {
        this.tasks = response.data;
      } else {
        this.tasks = []; 
      }
    },
    (error) => {
      console.error('Error fetching tasks:', error);
      this.tasks = []; 
    }
  );
}

  editTask(task: any): void {
    this.currentTask = { ...task };
  }

  deleteTask(id: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(
        () => {
          this.fetchTasks();
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }

saveTask(): void {
  if (this.currentTask._id) {
    this.taskService.updateTask(this.currentTask._id, this.currentTask).subscribe(
      () => {
        this.fetchTasks();  // Refresh tasks after updating
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  } else {
    this.taskService.createTask(this.currentTask).subscribe(
      () => {
        this.fetchTasks();  // Refresh tasks after creating
      },
      (error) => {
        console.error('Error creating task:', error);
      }
    );
  }
  this.resetTaskForm();
}
  resetTaskForm(): void {
    this.currentTask = {
      name: '',
      description: '',
      status: 'To complete',
      pomodoroCount: 0,
      dateToBeFinished: '',
    };
  }

    // Method to set a custom timer
    // Set a custom timer
  setTimer(): void {
    if (this.customMinutes && this.customMinutes >= 1 && this.customMinutes <= 120) {
      this.minutes = this.customMinutes;
      this.seconds = 0;
      this.totalSeconds = this.customMinutes * 60;
      this.defaultMinutes = this.customMinutes; // Update default to user preference
      this.stopTimer(); // Stop any ongoing timer
    } else {
      alert('Please enter a valid number between 1 and 120.');
    }
  }

  // Start the timer
  startTimer(): void {
    if (!this.totalSeconds) {
      alert('Please set a valid time first!');
      return;
    }

    this.stopTimer(); // Clear any existing timer
    this.timerInterval = setInterval(() => this.countdown(), 1000);
  }

  // Countdown logic
  private countdown(): void {
    if (this.totalSeconds > 0) {
      this.totalSeconds--;
      this.minutes = Math.floor(this.totalSeconds / 60);
      this.seconds = this.totalSeconds % 60;
    } else {
      this.stopTimer();
      alert("Time's up!");
    }
  }

  // Stop the timer
  private stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  // Reset the timer to default values
  resetTimer(): void {
    this.stopTimer();
    this.minutes = this.defaultMinutes;
    this.seconds = 0;
    this.totalSeconds = this.defaultMinutes * 60;
  }
  
}