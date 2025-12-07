import { schema } from "../constants/appTabs";
import { useNavigation } from "../shared/ui/NavigationProvider";
import NavigationTabs from "../shared/ui/NavigationTabs";

type Props = { tabKey: string[] };

export default function AppTabs({ tabKey }: Props) {
  const state = useNavigation("home", tabKey);
  const d = state.getTabState();
  console.log("AppTabs render", { d });

  return <NavigationTabs tabKey={tabKey} schema={schema} state={state} />;
}
