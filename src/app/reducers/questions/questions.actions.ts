import { createAction, props } from '@ngrx/store';
import { IQuestion } from 'src/app/modules/shared/interfaces/interfaces';
import { IState } from '..';

export enum EActions {
    addQuestion = '[Questions] addQuestion',
    deleteQuestion = '[Questions] deleteQuestion',
    setInitialData = '[Questions] setInitialData',
}

export const AddQuestionAction = createAction(EActions.addQuestion, props<{ question: IQuestion, id: string }>()); 
export const DeleteQuestionAction = createAction(EActions.deleteQuestion, props<{ id: string }>()); 
export const SetInitialDataAction = createAction(EActions.setInitialData, props<IState>()); 