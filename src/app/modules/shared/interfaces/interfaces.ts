import { EQuestionType } from "../enums/enums";

export interface IQuestion {
    title: string,
    typeQuestion: EQuestionType,
    created: Date,
    options: string[],
    answer: string[],
    id: string,
}