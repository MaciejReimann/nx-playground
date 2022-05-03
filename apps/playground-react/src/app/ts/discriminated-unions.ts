export {};

interface Cat {
  weight: number;
  whiskers: number;
  ANIMAL_TYPE: 'CAT';
}
interface Dog {
  weight: number;
  friendly: boolean;
  ANIMAL_TYPE: 'DOG';
}

let animal: Dog | Cat = {} as any;

if (animal.ANIMAL_TYPE === 'DOG') {
  console.log(animal.friendly);
} else {
  console.log(animal.whiskers);
}

// exhaustiveness / Exhaustive Type Checking
// when compiler checks that you're not leaving a possibility unchecked
type Invoice = {
  type: 'invoice';
  number: string;
  date: Date;
  positions: {
    name: string;
    price: number;
    quantity: number;
  }[];
  rebate: number;
};

type Bill = {
  type: 'bill';
  date: Date;
  totalPrice: number;
};

type DebtPayment = { type: 'debt'; amount: number; due: Date };

type CompanyPurchase = Invoice | Bill;
type CompanyPurchaseWithDebt = CompanyPurchase | DebtPayment;

const getPrice = (purchase: CompanyPurchase): number => {
  switch (purchase.type) {
    case 'invoice':
      return purchase.positions.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

    case 'bill':
      return purchase.totalPrice;

    // exhaustiveness check
    default:
      let x: never = purchase;
      throw new Error(
        `${(purchase as CompanyPurchase).type} is not supported!`
      );
  }
};
