import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { DeleteQuestionAction } from 'src/app/reducers/questions/questions.actions';
import { questionSelector } from 'src/app/reducers/questions/questions.selector';
import { ECardType } from '../../shared/enums/enums';
import { IQuestion } from '../../shared/interfaces/interfaces';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>;
  public questions: IQuestion[] = [];
  public ECardType = ECardType;

  constructor(private store: Store) { }

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
        this.questions = Object.values(state)
      }
    )
  }

  deleteItem(id: string): void {
    this.store.dispatch(DeleteQuestionAction({id}))
  }

}
