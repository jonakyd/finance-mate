export type ControllerTabState = {
  accounts: { accountId?: string };
  banks: { bankId?: string };
  transactions: { transactionId?: string };
};

export type ControllerState = {
  home: {
    accounts: NavigationState["accounts"];
    banks: NavigationState["banks"];
    transactions: NavigationState["transactions"];
  };
};

export type NavigationState = ControllerTabState & ControllerState;

export const getDefaultTabState = (): NavigationState => {
  return {
    home: {
      accounts: {},
      banks: {},
      transactions: {},
    },
    accounts: {},
    banks: {},
    transactions: {},
  };
};
