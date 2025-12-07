import HomeLabel from "../pages/home/HomeLabel";
import HomePage from "../pages/home/HomePage";
import TransactionListLabel from "../pages/transactions/TransactionListLabel";
import TransactionListPage from "../pages/transactions/TransactionListPage";
import type { TabSchema } from "../shared/ui/NavigationTabs";

export const schema: TabSchema = {
  home: {
    component: HomePage,
    label: HomeLabel,
  },
  banks: {
    component: TransactionListPage,
    label: TransactionListLabel,
    closable: true,
  },
  transactions: {
    component: TransactionListPage,
    label: TransactionListLabel,
    closable: true,
  },
};
