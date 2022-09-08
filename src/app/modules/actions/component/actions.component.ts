import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AddQuestionAction } from 'src/app/reducers/questions/questions.actions';
import { questionSelector } from 'src/app/reducers/questions/questions.selector';
import { QuestionsService } from 'src/app/services/questions.service';
import { EActionType, EQuestionType } from '../../shared/enums/enums';
import { IQuestion } from '../../shared/interfaces/interfaces';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public EQuestionType = EQuestionType;
  public EActionType = EActionType;
  public openQuestion: FormGroup;
  public singleQuestion: FormGroup;
  public multiQuestion: FormGroup;
  public singleModel: string = '';
  public multiModel: string = '';
  public questions: IQuestion[];
  public queryId: string;
  public uniqId: string;
  public tabIndex: number = 0;

  constructor(private fb: FormBuilder, private questionService: QuestionsService, private store: Store, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.openQuestion = this.fb.group({
      question: ['', [Validators.required]],
    });
    this.singleQuestion = this.fb.group({
      question: ['', [Validators.required]],
      options: [[]],
    });
    this.multiQuestion = this.fb.group({
      question: ['', [Validators.required]],
      options: [[]],
    });

    this.uniqId = this.questionService.uniqId();
    this.getFromStore();
    this.checkQueryParams();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getFromStore(): void {
    this.store
    .pipe(
      select(questionSelector),
      takeUntil(this.destroy$))
    .subscribe(
      state => {
        this.questions = Object.values(state)
      }
    )
  }

  checkQueryParams(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (params) => {
          this.queryId = params['id'];
          if (this.queryId) {
            this.setFromQuery(this.queryId)
          }
        }
      });
  }

  setFromQuery(id: string): void {
    let question!: IQuestion;
    this.questions.forEach(el => {
      if(el.id === id) {
        question = el;
      }
    });

    this.uniqId = id;

    if(question.typeQuestion === EQuestionType.open) {
      this.openQuestion.setValue({
        question: question.title,
      });
      this.tabIndex = 0;
    }
    if(question.typeQuestion === EQuestionType.single) {
      this.singleQuestion.setValue({
        question: question.title,
        options: [...question.options]
      });
      this.tabIndex = 1;
    }
    if(question!.typeQuestion === EQuestionType.multi) {
      this.multiQuestion.setValue({
        question: question.title,
        options: [...question.options]
      });
      this.tabIndex = 2;
    }
  }

  addOptionSingle(): void {
    if(!this.singleModel) return;
    this.singleQuestion.value.options.push(this.singleModel);
    this.singleModel = '';
  }

  addOptionMulti(): void {
    if(!this.multiModel) return;
    this.multiQuestion.value.options.push(this.multiModel); 
    this.multiModel = '';
  }

  removeOptionSingle(index: number): void {
    this.singleQuestion.value.options.splice(index, 1);
  }

  removeOptionMulti(index: number): void {
    this.multiQuestion.value.options.splice(index, 1);
  }

  onSubmitOpen(): void {
    const question: IQuestion = {
      title: this.openQuestion.value.question,
      typeQuestion: EQuestionType.open,
      created: new Date,
      options: [],
      answer: [],
      id: this.uniqId,
    }
    this.dispatchAfterSubmit(question);
  }

  onSubmitSingle(): void {
    const question: IQuestion = {
      title: this.singleQuestion.value.question,
      typeQuestion: EQuestionType.single,
      created: new Date,
      options: this.singleQuestion.value.options,
      answer: [],
      id: this.uniqId,
    }
    this.dispatchAfterSubmit(question);
  }

  onSubmitMulti(): void {
    const question: IQuestion = {
      title: this.multiQuestion.value.question,
      typeQuestion: EQuestionType.multi,
      created: new Date,
      options: this.multiQuestion.value.options,
      answer: [],
      id: this.uniqId,
    }
    this.dispatchAfterSubmit(question);
  }

  dispatchAfterSubmit(question: IQuestion): void {
    this.store.dispatch(AddQuestionAction({question, id: question.id}))
    this.uniqId = this.questionService.uniqId();
    this.router.navigate(['/management'])
  }

}
