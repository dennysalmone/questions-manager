import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IState } from '..';

export const feature = createFeatureSelector<IState>('questions')

export const questionSelector = createSelector(
    feature,
    state => state
)