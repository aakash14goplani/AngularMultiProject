import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesComponent } from './messages.component';
import { MessageService } from '../services/message.service';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let mockMessageService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['messages']);

    TestBed.configureTestingModule({
      declarations: [ MessagesComponent ],
      providers: [
        { provide: MessageService, useValue: mockMessageService }
      ]
    });
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
