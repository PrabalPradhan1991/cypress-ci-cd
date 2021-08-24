class EventEmitter {
  private name: string;
  private callbacks: Record<string, Function> = {};

  constructor(uname: string) {
    this.name = uname;
  }

  on(event: string, cb: Function): void {
    this.callbacks[event] = cb;
  }

  emit(event: string, data: any): void {
    const fn = this.callbacks[event];
    if (fn) {
      fn(data);
      return;
    }
  }

  remove(event: string): void {}
}

export const EventBus = new EventEmitter("REACT_EVENT_BUS");
