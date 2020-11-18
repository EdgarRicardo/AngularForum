export class Topic{
  constructor(
    public _id: String,
    public title: string,
    public content: string,
    public code: string,
    public lang: string,
    public date: string,
    public user: any,
    public comments: any
    ){}
}
