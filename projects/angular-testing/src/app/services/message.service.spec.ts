import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(MessageService);
    service = new MessageService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update lenght of array on adding message', () => {
    const message: string = 'Hello';
    const initialMessageArrayLength: number = service.messages.length;

    service.add(message);

    const finalMessageArrayLength: number = service.messages.length;
    expect(finalMessageArrayLength).toBeGreaterThan(initialMessageArrayLength);
  });

  it('should reset lenght of array to 0 on clearing all messages', () => {
    service.add('Hello');
    const initialMessageArrayLength: number = service.messages.length;

    service.clear();

    const finalMessageArrayLength: number = service.messages.length;
    expect(finalMessageArrayLength).toBeLessThan(initialMessageArrayLength);
    expect(finalMessageArrayLength).toEqual(0);
  });
});
