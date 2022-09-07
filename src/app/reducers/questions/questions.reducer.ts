import { createReducer, on } from '@ngrx/store';
import { IQuestion } from 'src/app/modules/shared/interfaces/interfaces';

import { AddQuestionAction, DeleteQuestionAction, SetInitialDataAction } from 'src/app/reducers/questions/questions.actions';

export const QUESTIONS_KEY = 'questions';

export interface IQuestionState {
  [key: string]: IQuestion
}

export const initialState: IQuestionState = {};

export const questionReducer = createReducer(
  initialState,
  on(AddQuestionAction, (state, payload) => {
    return {
      ...state,
      [payload.id]: payload.question
    };
  }),
  on(DeleteQuestionAction, (state, { id }) => {
    const newState = {...state};
    delete newState[id];
    return newState;
  }),
  on(SetInitialDataAction, (_state, state) => {
    return {...state.questions};
  }),
);
