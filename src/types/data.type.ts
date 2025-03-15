import { BalanceType } from './balance.type';
import { BudgetType } from './budget.type';
import { TransactionType } from './transaction.type';
import { PotType } from './pot.type';

export type DataType = {
  balance: BalanceType;
  transactions: TransactionType[];
  budgets: BudgetType[];
  pots: PotType[];
}