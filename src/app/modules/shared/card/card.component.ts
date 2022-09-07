import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddQuestionAction } from 'src/app/reducers/questions/questions.actions';
import { ECardType, EQuestionType } from '../enums/enums';
import { IQuestion } from '../interfaces/interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() question: IQuestion;
  @Input() cardType: ECardType;
  @Output() deleteQuestion: EventEmitter<void> = new EventEmitter<void>();
  public ECardType = ECardType;
  public EQuestionType = EQuestionType;
  public answerToggle: boolean = false;
  public answersGroup: FormGroup;
  
  constructor(private store: Store,  private router: Router) { 
  }

  ngOnInit(): void {
    this.answersGroup = this.toFormGroup();
  }

  toFormGroup(): FormGroup {

    if(this.question.typeQuestion !== EQuestionType.multi) {
      return new FormGroup({
        text: new FormControl('')
      });
    }

    const group: any = {};
    this.question.options.forEach((option, index) => {
      group[index] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  deleteQuest(): void {
    this.deleteQuestion.emit();
  }

  addAnswer(): void {

    let newQuestion: IQuestion = {...this.question};
    newQuestion.answer = [];

    if (newQuestion.typeQuestion === EQuestionType.open) {
      let text: string = this.answersGroup.value.text;
      if(!text) return;
      newQuestion.answer = [...newQuestion.answer, text];
    }
    if (newQuestion.typeQuestion === EQuestionType.single) {
      let text: string = this.answersGroup.value.text;
      if(!text) return;
      newQuestion.answer = [...newQuestion.answer, text]
    }
    if (newQuestion.typeQuestion === EQuestionType.multi) {
      Object.values(this.answersGroup.value).forEach((el, index) => {
        if(el) {
          const text: string = newQuestion.options[index]
          newQuestion.answer = [...newQuestion.answer, text]
        }
        if(!newQuestion.answer.length) return;
      })
    }

    this.onChangeDispatch(newQuestion);
  }

  editQuest(): void {
    this.router.navigate(['/actions'], {queryParams: {id: this.question.id}});
  }

  removeAnswer(): void {
    let newQuestion: IQuestion = {...this.question};
    newQuestion.answer = [];
    this.onChangeDispatch(newQuestion);
  }

  toggleAnswer(): void {
    this.answerToggle = !this.answerToggle
  }

  onChangeDispatch(newQuestion: IQuestion): void {
    const obj = { 
      question: newQuestion, 
      id: newQuestion.id 
    };
    this.store.dispatch(AddQuestionAction(obj));
  }

}
