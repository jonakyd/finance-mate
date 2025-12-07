type Node<T extends string> = {
  type: T;
  key: string;
};

type TabType = string;

type TabState = Node<TabType> & {
  parent: Node<TabType> | null; // null for root tabs
};

type TabControllerState = TabState & {
  activeKey: string | null; // null if no children
  children: Node<TabType>[];
};

type TabStore = {
  tabs: Record<TabType, Record<string, TabState | TabControllerState>>;
};

// n(1)
type GetTab = (tabKey: Node<TabType>) => TabState | TabControllerState;

// n(1)
type AddNewTab = (
  tabKey: Node<TabType>,
  options: {
    newTabType: TabType;
    newTabState?: TabState | TabControllerState;
    targetController?: "current" | "root" | Node<TabType>;
    shouldSwitchToNewTab?: boolean;
  },
) => void;

/*
  // Find the parent tab depending on shouldAddToRoot
  const { newTabType, newTabState, targetController } = options;
  const { parent } = getTab(tabKey)
  const targetParent = targetController === "root" ? null : parent

  const newTab = createTab({
    parent: targetParent,
    type: newTabType,
    initialState: newTabState
  })
  // Insert newTab to store
  // Insert newTab to targetParent's children
  // Call setActiveTab() based on shouldSwitchToNewTab
*/

// n(1)
type SetActiveTab = (
  tabKey: Node<TabType>,
  options: {
    activeKey: string;
    targetController?: "current" | "root" | Node<TabType>;
  },
) => void;

/*
// Find the parent controller
// update activeKey of the parent controller
// throw error if activeKey not found in children
*/

type RemoveTab = (
  tabKey: Node<TabType>,
  options: {
    removedKey: string;
    targetController?: "current";
  },
) => void;
/*
  // Find the removed tab
  // Find the parent controller
  // remove removedKey from children
  // if activeKey is removedKey, set activeKey to the last child 
  // throw error if removedKey not found in children
  // recursively remove all removed child tabs from store
*/

type UpdateTab = (
  tabKey: Node<TabType>,
  options: { newState: Partial<TabState> },
) => void;

type UpdateTabWithSameDomain = (
  tabKey: Node<TabType>,
  options: { newState: Partial<TabState> },
) => void;
