import { Tabs, type TabsProps } from "antd";
import type { JSXElementConstructor, ReactElement } from "react";
import type { NavigationState } from "../types/navigationTabs";

type Unpack<T> = T extends Array<infer U> ? U : T;

type TabComponent = {
  component: JSXElementConstructor<{ tabKey: string[] }>;
  label: JSXElementConstructor<{ tabKey: string[] }> | ReactElement;
  closable?: boolean;
};

export type TabSchema<
  S extends Record<string, Record<string, unknown>> = NavigationState,
> = {
  [K in keyof S]: TabComponent;
};

export type TabLevelState<T extends string> = {
  activeKey: string;
  tabs: { key: string; tabType: T }[];
};

type Props<S extends Record<T, Record<string, unknown>>, T extends string> = {
  tabKey: string[]; // used for nested tabs
  schema: TabSchema<S>;
  state: TabLevelState<T>;
};

export default function NavigationTabs<
  S extends Record<T, Record<string, unknown>>,
  T extends string,
>({ tabKey, schema, state: { activeKey, tabs } }: Props<S, T>) {
  const items = tabs.map<Unpack<NonNullable<TabsProps["items"]>>>(
    ({ key, tabType }) => {
      const {
        component: TabComponent,
        label: TabLabel,
        closable = false,
      } = schema[tabType];

      return {
        key,
        children: <TabComponent tabKey={[...tabKey, key]} />,
        label:
          typeof TabLabel === "function" ?
            <TabLabel tabKey={[...tabKey, key]} />
          : TabLabel,
        closable,
      };
    },
  );

  return <Tabs activeKey={activeKey} items={items} />;
}
