export class Message {
   constructor(
      public _id: string,
      public emitter: string,
      public receiver: string,
      public text: string,
      public created_at: Date,
      public viewed: boolean
   ) {}
}
