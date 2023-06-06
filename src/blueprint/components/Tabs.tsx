import classNames from "classnames";
import { mergeProps, splitProps, createMemo, createSignal, For } from "solid-js";
import type { JSX } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Props, isElementOfType } from "@blueprint/core";
import type { UIComponent } from "@blueprint/core";
import { TabId, Tab, TabProps } from "./Tab";
import { TabTitle } from "./TabTitle";

export type TabElement = UIComponent<TabProps & { children: JSX.Element }>;
export const TAB_SELECTOR = `.${Classes.TAB}`;

interface ITabsProps extends Props {
  animate?: boolean;
  defaultSelectedTabId?: TabId;
  id: TabId;
  large?: boolean;
  renderActiveTabPanelOnly?: boolean;
  selectedTabId?: TabId;
  vertical?: boolean;
  fill?: boolean;
  onChange?(newTabId: TabId, prevTabId: TabId | undefined, event: MouseEvent): void;
}

export type TabsProps = ITabsProps;

export function isTabElement(child: any): child is TabElement {
  console.debug("Check child", child, "is Tab");
  return isElementOfType(child, Tab);
}

export const TabsPropsDefaults: Partial<TabsProps> = {
  animate: true,
  large: false,
  renderActiveTabPanelOnly: false,
  vertical: false,
  fill: false,
};

export const Tabs: UIComponent<TabsProps> = (userProps: TabsProps) => {
  const [indicatorWrapperStyle] = createSignal<JSX.CSSProperties>({});
  const [props, htmlProps] = splitProps(mergeProps(TabsPropsDefaults, userProps), [
    // props list
    "animate",
    "defaultSelectedTabId",
    "id",
    "large",
    "renderActiveTabPanelOnly",
    "selectedTabId",
    "vertical",
    "fill",
    "onChange",
    "class",
    "children",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      Classes.TABS,
      {
        // from props
        [Classes.VERTICAL]: !!props.vertical,
        [Classes.FILL]: !!props.fill,
        [Classes.DISABLED]: !!props.disabled,
      },
      // user
      props.class
    )
  );
  const createTabListClasses = createMemo(() =>
    classNames(
      Classes.TAB_LIST,
      {
        // from props
        [Classes.LARGE]: !!props.vertical,
      },
      // user
      props.class
    )
  );
  const createTabIndicator = createMemo(() => {
    if (props.animate) {
      return (
        <div class={Classes.TAB_INDICATOR_WRAPPER} style={indicatorWrapperStyle()}>
          <div class={Classes.TAB_INDICATOR} />
        </div>
      );
    }
  });
  const onTabClick = () => {};
  const createTabTitles = createMemo(() => {
    const children = Array.isArray(props.children) ? props.children : [props.children];
    const titles = children.map((c) => (c as any).props.title);
    console.debug(">> createTabTitles children", children, titles);
    return (
      <For each={children}>
        {(child) => {
          if (isTabElement(child)) {
            // const element = child as TabElement;
            return <TabTitle parentId={props.id} onClick={onTabClick} selected={false} />;
          }
        }}
      </For>
    );
  });
  const createTabPanels = createMemo(() => {
    const children = Array.isArray(props.children) ? props.children : [props.children];
    console.debug(">> createTabPanels children", children);
    return (
      <For each={children}>
        {(child) => {
          if (isTabElement(child)) {
            return (
              <div role="tabpanel" class={classNames(Classes.TAB_PANEL, props.class)}>
                {child}
              </div>
            );
          }
        }}
      </For>
    );
  });
  return (
    <div
      // props
      class={createClassList()}
      {...htmlProps}
    >
      <div role="tablist" class={createTabListClasses()}>
        {createTabIndicator()}
        {createTabTitles()}
      </div>
      {createTabPanels()}
    </div>
  );
};
Tabs.displayName = `${DISPLAYNAME_PREFIX}.Tabs`;
