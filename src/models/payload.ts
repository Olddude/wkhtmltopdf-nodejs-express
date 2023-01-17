export interface IPayload<T> {
  readonly data: T;
}

export class AnyPayload implements IPayload<any> {
  readonly data: any = AnyPayload.name;
}
