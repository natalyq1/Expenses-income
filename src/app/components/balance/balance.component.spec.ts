import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceComponent } from './balance.component';

describe('BalanceComponent', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalanceComponent],
    });
    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    //Monta y recarga el componente
    fixture.detectChanges();
    //Obtiene el template
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    //puede evaluar 2 cosas en una misma funcion
    //esto sale en consola
    console.log(component);

    expect(component).toBeTruthy(); //.toBeFalsy()---espera que el component tenga un valor, si lo tiene debe ser true
    const numero: number = 5;
    expect(numero).toEqual(5);
    //console.log(compiled); // LOG: <div id="root0" _nghost-a-c1385894702="" ng-version="16.1.2"><!--bindings={}--></div>
  });

  /* it('suma2', () => {
    const numero: number = 5;
    expect(numero).toEqual(3);
  });*/
  it('should display amount, income and expenses', () => {
    //establece el valor de una propiedad del componente
    component.balance = {
      amount: 100,
      income: 150,
      expenses: 50,
    };

    //Monta y recarga el componente
    fixture.detectChanges();
    console.log(compiled); //LOG: <div id="root0" _nghost-a-c1385894702="" ng-version="16.1.2"><div _ngcontent-a-c1385894702="" class="balance"><d......

    //Ejecuta la prueba para verificar el valor de amount
    const amountElement = compiled.querySelector('h2');
    console.log(amountElement); //LOG: <h2 _ngcontent-a-c1385894702="">$100.00</h2>
    expect (amountElement?.textContent).toBe('$100.00')

    const incomeElement = compiled.querySelector('div:nth-child(1) h3')
    console.log(incomeElement);
    expect(incomeElement?.textContent).toBe('$150.00');

    const expensesElement = compiled.querySelector('div.balance__expenses>h3');
    console.log(expensesElement);
    expect(expensesElement?.textContent).toBe('$50.00');

  });
  it('should have the right amount, income and expenses', () => {
    component.balance= {
      amount: 200,
      income: 300,
      expenses: 100
    };
    fixture.detectChanges()
    expect(component.balance.amount).toBe(
      component.balance.income- component.balance.expenses
    )
  });

});
