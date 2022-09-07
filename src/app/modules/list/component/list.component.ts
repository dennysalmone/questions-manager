import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { IState } from 'src/app/reducers';
import { DeleteQuestionAction } from 'src/app/reducers/questions/questions.actions';
import { questionSelector } from 'src/app/reducers/questions/questions.selector';
import { QuestionsService } from 'src/app/services/questions.service';
import { ECardType } from '../../shared/enums/enums';
import { IQuestion } from '../../shared/interfaces/interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>;
  public ansQuestions: IQuestion[] = [];
  public nonAnsQuestions: IQuestion[] = [];
  public ECardType = ECardType;

  constructor(private store: Store, private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.getFromStore();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getFromStore(): void {
    this.store.pipe(
      select(questionSelector),
      takeUntil(this.destroy$)
      ).subscribe(
      state => {
        this.setStateDate(state)
      }
    )
  }

  setStateDate(state: IState): void {
    this.ansQuestions = [];
    this.nonAnsQuestions = [];
    let questions: IQuestion[] = Object.values(state)
    questions.forEach(el => {
      if(el.answer.length) {
        this.ansQuestions.push(el)
      } else {
        this.nonAnsQuestions.push(el)
      }
      this.ansQuestions = this.questionsService.sortQuestionsByDate(this.ansQuestions)
      this.nonAnsQuestions = this.questionsService.sortQuestionsByDate(this.nonAnsQuestions)
    })
  }

  deleteItem(id: string): void {
    this.store.dispatch(DeleteQuestionAction({id}))
  }

}
