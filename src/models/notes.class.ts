export class Note {
  title: string;
  description: string;
  customIdName?: string;
  constructor(data?: Partial<Note>) {
    Object.assign(this, data);
  }
}
