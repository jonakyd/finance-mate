import { create } from "zustand";
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { v4 as uuid } from "uuid";
import {
  getDefaultTabState,
  type NavigationState,
} from "../types/navigationTabs";

type TabType = keyof NavigationState;

type Tab = {
  key: string;
  tabType: TabType;
};

type ControllerTab = Tab & {
  activeKey: string;
  order: Tab[];
};

type ProviderState = {
  levels: ControllerTab[];
  tabs: { [K in TabType]: Record<string, NavigationState[K]> };
};
type UseNavigationFunc<T extends TabType> = {
  getTabState: () => NavigationState[T];
  addNewTab: (
    newTabType: TabType,
    o?: {
      shouldSwitchToNewTab?: boolean;
      initialNaviState?: NavigationState[T];
    },
  ) => void;
  removeTabs: (targetTabKey: string) => void;
  // updateTabState: (newState: NavigationTabs[T]) => void;
};

const defaultTabs = {
  home: {},
  banks: {},
  transactions: {},
  accounts: {},
};

const NavigationContext = createContext<{
  tabLevels: ProviderState;
  setTabLevels: (f: (state: ProviderState) => ProviderState) => void;
}>({
  tabLevels: { levels: [], tabs: defaultTabs },
  setTabLevels: (state) => state,
});

export default function NavigationProvider({
  children,
  initialTabLevels,
}: PropsWithChildren<{ initialTabLevels: ControllerTab[] }>) {
  const [tabLevels, setTabLevels] = useState<ProviderState>({
    levels: initialTabLevels,
    tabs: defaultTabs,
  });

  return (
    <NavigationContext.Provider value={{ tabLevels, setTabLevels }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation<T extends TabType>(
  tabType: T,
  tabKey: string[],
): UseNavigationFunc<T> {
  const { tabLevels, setTabLevels } = useContext(NavigationContext);

  const getTabState = () => {
    debugger;
    const level = tabLevels.levels[tabKey.length - 1];
    const lastKey = tabKey.at(-1);

    if (level && lastKey) {
      return tabLevels.tabs[tabType][lastKey] ?? {};
    }
    return {};
  };

  const addNewTab: UseNavigationFunc<T>["addNewTab"] = (
    newTabType,
    { shouldSwitchToNewTab = true, initialNaviState } = {},
  ) => {
    setTabLevels(({ levels, tabs }) => {
      const newTabKey = `${newTabType}-${uuid()}`;
      const naviState = initialNaviState ?? getDefaultTabState()[newTabType];
      const lastLevel = levels.at(-1)!;

      return {
        levels: [
          ...levels.slice(0, -1),
          {
            ...lastLevel,
            activeKey: shouldSwitchToNewTab ? newTabKey : lastLevel.activeKey,
            order: [
              ...lastLevel.order,
              { key: newTabKey, tabType: newTabType },
            ],
          },
        ],
        tabs: {
          ...tabs,
          [newTabType]: { ...tabs[newTabType], [newTabKey]: naviState },
        },
      };
    });
  };

  const removeTabs = (targetTabKey: string) => {
    setTabLevels(({ levels, tabs }) => {
      const newLevels = [];

      for (const level of levels) {
        // Remove the tab from this level
        const tabExists = level.order.find(
          (order) => order.key === targetTabKey,
        );
        if (tabExists) {
          const newOrder = level.order.filter(
            ({ key }) => key !== targetTabKey,
          );
          const newActiveKey =
            level.activeKey === targetTabKey ?
              newOrder.at(-1)?.key || "" // Switch to last tab
            : level.activeKey;

          newLevels.push({
            activeKey: newActiveKey,
            order: newOrder,
          });

          return {
            levels: newLevels,
            tabs: {
              ...tabs,
              [tabExists.tabType]: {
                ...tabs[tabExists.tabType],
                [targetTabKey]: undefined,
              },
            },
          };
        }
        // Traverse deeper levels
        else {
          newLevels.push(level);
        }
      }
      return { levels, tabs };
    });
  };

  return { getTabState, addNewTab, removeTabs };
}
