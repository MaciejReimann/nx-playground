type Currency = 'EUR' | 'PLN';

//

class Money {
  private constructor(
    private readonly value: number,
    private readonly currency: Currency
  ) {}

  static from(value: number, currency: Currency) {
    return new Money(value, currency);
  }

  multiply(factor: number) {
    return new Money(this.value * factor, this.currency);
  }

  add(money: Money) {
    if (this.currency !== money.currency) {
      throw new Error('Cannot add different currencies');
    }
    return new Money(this.value + money.value, this.currency);
  }

  valueOf() {
    return this.value;
  }
}

// Alternatively, opaque type:
type MoneyOpaqueType = number & { readonly type: unique symbol };

// Opaque types may only be created in the file where the opaque type was defined.
// Which means you can export one function, createUserName(),
// that makes sure your user name is in the correct format and returns an opaque UserName type.
// https://calebmer.com/tangents/opaque-types-in-typescript.html#:~:text=My%20favorite%20feature%20in%20Flow,returns%20an%20opaque%20UserName%20type.
type UserName = string & { _opaque: typeof UserName };

declare const UserName: unique symbol;

// Error! `string` is not assignable to `UserName`.
// @ts-expect-error
const notUserName: UserName = 'Hello, world!';

// OK
const userName: UserName = createUserName('calebmer');

function createUserName(name: string): UserName {
  if (/^[a-zA-Z0-9_-]+$/.test(name)) {
    return name as UserName;
  } else {
    throw new Error('Not a user name!');
  }
}
