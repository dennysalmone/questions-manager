import { Injectable } from '@angular/core';
import { IQuestion } from '../modules/shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor() { }

  getDataFromLocalStorage(): any {
    return localStorage.getItem('questions')
  }

  setDataToLocalStorage(data: any): void {
    localStorage.setItem('questions', data)
  }

  uniqId(): string {
    return Math.random().toString(16).slice(2)
  }

  sortQuestionsByDate (question: IQuestion[]): IQuestion[] {
    question.sort(function (a, b) {
      if (a.created > b.created) {
        return 1;
      }
      if (a.created < b.created) {
        return -1;
      }
      return 0;
    });
    return question;
  }

}
