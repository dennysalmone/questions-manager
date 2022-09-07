import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { takeLast } from 'rxjs';
import { IState } from './reducers';
import { SetInitialDataAction } from './reducers/questions/questions.actions';
import { IQuestionState, QUESTIONS_KEY } from './reducers/questions/questions.reducer';
import { questionSelector } from './reducers/questions/questions.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private data: IState = {
    [QUESTIONS_KEY]: {}
  };
  constructor(private store: Store){}

  @HostListener('window:beforeunload') onBeforeUnload() {
    localStorage.setItem('questions', JSON.stringify(this.data))
  }

  ngOnInit(): void {
    this.setDataFormLocalStorage();
    this.store.pipe(
      select(questionSelector)
      ).subscribe(
      (state: IState) => {
        this.data = state
      }
    )
  }

  setDataFormLocalStorage(): void {
    const storage = localStorage.getItem('questions');
    if(!storage) {return};
    const parsed: IQuestionState = JSON.parse(storage);
    const state: IState = {[QUESTIONS_KEY]: {...parsed}}
    this.store.dispatch(SetInitialDataAction(state));
  }

}
