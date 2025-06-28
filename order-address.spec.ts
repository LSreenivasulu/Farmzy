import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAddress } from './order-address';

describe('OrderAddress', () => {
  let component: OrderAddress;
  let fixture: ComponentFixture<OrderAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderAddress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderAddress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
