export abstract class DomainEvent {
  public readonly occurredAt: Date;

  constructor() {
    this.occurredAt = new Date();
  }

  abstract getAggregateId(): string;
}

export interface DomainEventHandler<T extends DomainEvent> {
  handle(event: T): Promise<void>;
}
