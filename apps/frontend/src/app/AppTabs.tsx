import { schema } from "../constants/appTabs";
import NavigationTabs from "../shared/ui/NavigationTabs";

export default function AppTabs() {
  return (
    <NavigationTabs
      tabKey={[]}
      schema={schema}
      state={{
        activeKey: "home",
        tabs: [
          { key: "home", tabType: "home" },
          { key: "banks", tabType: "banks" },
          { key: "transactions", tabType: "transactions" },
        ],
      }}
    />
  );
}
