import classNames from "classnames";
import { mergeProps, splitProps, createMemo, createSignal, For, children, createEffect, on } from "solid-js";
import type { JSX } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Props, IntentProps, MaybeElement } from "@blueprint/core";
import type { UIComponent } from "@blueprint/core";
import { isIcon, Icon, IconName } from "@blueprint/icons";

import { TagProps } from "./Tag";

export type TabId = string | number;
export const TAB_SELECTOR = `.${Classes.TAB}`;

// Tab component
interface ITabProps extends Omit<JSX.SelectHTMLAttributes<HTMLDivElement>, "id" | "title" | "onClick" | "children">, Props {
  id?: TabId;
  panel?: MaybeElement;
  panelClassName?: string;
  title?: string | MaybeElement;
  icon?: IconName | MaybeElement;
  tagContent?: TagProps["children"];
  tagProps?: Omit<TagProps, "children">;
}

export type TabProps = ITabProps;
export const TabPropsDefaults: TabProps = {
  id: undefined,
  panel: undefined,
  panelClassName: undefined,
  title: undefined,
  icon: undefined,
  tagContent: undefined,
  tagProps: undefined,
  class: undefined,
  disabled: false,
};
export const Tab: UIComponent<TabProps> = (userProps: TabProps) => {
  return { props: mergeProps(TabPropsDefaults, userProps), type: Tab } as unknown as JSX.Element;
};
Tab.displayName = `${DISPLAYNAME_PREFIX}.Tab`;
export function isTab(v: unknown): v is { props: Parameters<typeof Tab>[0] } {
  return !!(v && typeof v === "object" && "type" in v && v.type === Tab);
}

// TabExpander component
export const TabExpander: UIComponent = () => <div class={Classes.FLEX_EXPANDER} />;
TabExpander.displayName = `${DISPLAYNAME_PREFIX}.TabExpander`;

// TabTitle component
interface ITabTitleProps extends IntentProps, TabProps {
  onClick: (id: TabId, event: MouseEvent) => void;
  parentId: TabId;
  selected: boolean;
}
export type TabTitleProps = ITabTitleProps;
export const TabTitlePropsDefaults: Partial<TabTitleProps> = {
  selected: false,
};
export function generateTabPanelId(parentId: TabId, tabId: TabId) {
  return `${Classes.TAB_PANEL}_${parentId}_${tabId}`;
}
export function generateTabTitleId(parentId: TabId, tabId: TabId) {
  return `${Classes.TAB}-title_${parentId}_${tabId}`;
}
export const TabTitle: UIComponent<TabTitleProps> = (userProps: TabTitleProps) => {
  const [props, htmlProps] = splitProps(mergeProps(TabTitlePropsDefaults, userProps), [
    // props list
    "id",
    "panel",
    "panelClassName",
    "title",
    "icon",
    "tagContent",
    "tagProps",
    "intent",
    "children",
    "class",
    "disabled",
    //
    "parentId",
    "onClick",
    "selected",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      Classes.TAB,
      {
        // from props
        [Classes.DISABLED]: !!props.disabled,
      },
      // user
      props.class
    )
  );
  const createIcon = () => {
    return isIcon(props.icon) ? <Icon icon={props.icon as IconName} intent={props.intent} class={Classes.TAB_ICON} /> : undefined;
  };
  const createChildren = () => {
    return props.children;
  };
  return (
    <div
      // props
      class={createClassList()}
      role="tab"
      aria-controls={generateTabPanelId(props.parentId, props.id || "")}
      aria-disabled={props.disabled}
      aria-expanded={props.selected}
      aria-selected={props.selected}
      data-tab-id={props.id}
      id={generateTabTitleId(props.parentId, props.id || "")}
      tabIndex={props.disabled ? undefined : props.selected ? 0 : -1}
      onClick={
        props.disabled
          ? undefined
          : (e) => {
              if (props.id) {
                props.onClick(props.id, e);
              } else {
                console.warn("Tab requires id to be set", props);
              }
            }
      }
      {...htmlProps}
    >
      {createIcon()}
      {props.title}
      {createChildren()}
    </div>
  );
};
TabTitle.displayName = `${DISPLAYNAME_PREFIX}.TabTitle`;

// TabPanel component
interface ITabPanelProps extends Props {
  parentId: TabId;
  id: TabId;
  panel?: MaybeElement;
  panelClassName?: string;
  active?: boolean;
}
export type TabPanelProps = ITabPanelProps;
export const TabPanelPropsDefaults: Partial<TabPanelProps> = {
  active: false,
};
export const TabPanel: UIComponent<TabPanelProps> = (userProps) => {
  const [props, htmlProps] = splitProps(mergeProps(TabPanelPropsDefaults, userProps), [
    // props list
    "id",
    "parentId",
    "panel",
    "panelClassName",
    "active",
    "class",
    "children",
    "disabled",
  ]);
  const createTabPanelId = createMemo(() => generateTabPanelId(props.parentId, props.id));
  const createAriaLabeledBy = createMemo(() => generateTabTitleId(props.parentId, props.id));
  const createClassList = createMemo(() => classNames(Classes.TAB_PANEL, props.panelClassName));
  return (
    <div role="tabpanel" class={createClassList()} id={createTabPanelId()} aria-labelledby={createAriaLabeledBy()} aria-hidden={!props.active} {...htmlProps}>
      {props.panel || props.children}
    </div>
  );
};

// Tabs component

interface ITabsProps extends Props {
  animate?: boolean;
  id: TabId;
  large?: boolean;
  renderActiveTabPanelOnly?: boolean;
  selectedTabId?: TabId;
  vertical?: boolean;
  fill?: boolean;
  onChange?(newTabId: TabId, prevTabId: TabId | undefined, event: MouseEvent): void;
}
export type TabsProps = ITabsProps;
export const TabsPropsDefaults: Partial<TabsProps> = {
  animate: true,
  large: false,
  renderActiveTabPanelOnly: true,
  vertical: false,
  fill: false,
};

export const Tabs: UIComponent<TabsProps> & { Expander: UIComponent } = (userProps: TabsProps) => {
  const [indicatorWrapperStyle] = createSignal<JSX.CSSProperties>({});
  const [props, htmlProps] = splitProps(mergeProps(TabsPropsDefaults, userProps), [
    // props list
    "animate",
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
  const [getSelected, setSelected] = createSignal<TabId | undefined>(props.selectedTabId);
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
  const getChildren = children(() => props.children);
  const getTabProps = createMemo(() => (getChildren.toArray() as unknown[]).filter(isTab).map(({ props }) => props));
  const createTabListClasses = createMemo(() =>
    classNames(
      Classes.TAB_LIST,
      {
        // from props
        [Classes.LARGE]: !!props.large,
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
  const onTabClick = (tab: TabId, e: MouseEvent) => {
    if (props.onChange) {
      const prevTabId = getSelected();
      props.onChange(tab, prevTabId, e);
      if (!e.defaultPrevented) {
        setSelected(tab);
      }
    } else {
      setSelected(tab);
    }
  };
  createEffect(
    on(
      () => props.selectedTabId,
      () => {
        setSelected(props.selectedTabId);
      }
    )
  );
  return (
    <div class={createClassList()} {...htmlProps}>
      <div role="tablist" class={createTabListClasses()}>
        {createTabIndicator()}
        <For each={getTabProps()}>
          {(tabProps) => {
            return (
              <TabTitle
                // title props
                disabled={props.disabled}
                id={tabProps.id}
                parentId={props.id}
                onClick={onTabClick}
                selected={tabProps.id === getSelected()}
                title={tabProps.title}
              />
            );
          }}
        </For>
      </div>
      <For each={getTabProps()}>
        {(allTabProps) => {
          const [tabProps, htmlProps] = splitProps(allTabProps, [
            // props list
            "id",
            "panel",
            "panelClassName",
            "title",
            "icon",
            "tagContent",
            "tagProps",
            "children",
            "class",
            "disabled",
          ]);
          const isActive = createMemo(() => {
            return tabProps.id === getSelected();
          });
          const canRender = createMemo(() => {
            const onlyActive = props.renderActiveTabPanelOnly;
            return onlyActive ? isActive() : true;
          });
          return (
            <>
              {canRender() ? (
                <TabPanel
                  // props
                  parentId={props.id}
                  id={tabProps.id as TabId}
                  active={isActive()}
                  panel={tabProps.panel}
                  panelClassName={tabProps.panelClassName}
                  {...htmlProps}
                >
                  {tabProps.children}
                </TabPanel>
              ) : undefined}
            </>
          );
        }}
      </For>
    </div>
  );
};
Tabs.displayName = `${DISPLAYNAME_PREFIX}.Tabs`;
Tabs.Expander = TabExpander;
