import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { QUESTIONS_KEY, IQuestionState, questionReducer } from './questions/questions.reducer';

export interface IState {
  [QUESTIONS_KEY]: IQuestionState;
}

export const reducers: ActionReducerMap<IState, any> = {
  [QUESTIONS_KEY]: questionReducer,
};

export const getQuestionsState = (state: IState): IQuestionState => state[QUESTIONS_KEY];
export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : [];