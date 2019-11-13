import { Moment } from 'moment';
import { ISpeaker } from 'app/shared/model/speaker.model';

export interface IConference {
  id?: number;
  name?: string;
  schedule?: Moment;
  speaker?: ISpeaker;
}

export class Conference implements IConference {
  constructor(public id?: number, public name?: string, public schedule?: Moment, public speaker?: ISpeaker) {}
}
