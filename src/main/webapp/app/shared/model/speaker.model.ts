export interface ISpeaker {
  id?: number;
  name?: string;
}

export class Speaker implements ISpeaker {
  constructor(public id?: number, public name?: string) {}
}
