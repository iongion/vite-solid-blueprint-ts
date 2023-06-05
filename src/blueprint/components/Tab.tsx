import classNames from "classnames";
import { JSX, mergeProps, splitProps, createMemo } from "solid-js";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, MaybeElement, Classes, Props, IntentProps } from "@blueprint/core";
import { isIcon, Icon, IconName } from "@blueprint/icons";
import { TagProps } from "./Tag";

export type TabId = string | number;

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

export const Tab: Component<TabProps> = (userProps: TabProps) => {
  const [props, htmlProps] = splitProps(mergeProps(TabPropsDefaults, userProps), [
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
  const createClassList = createMemo(() =>
    classNames(
      Classes.TAB_PANEL,
      {
        // from props
        [Classes.DISABLED]: !!props.disabled,
      },
      // user
      props.class
    )
  );
  const createChildren = () => {
    return props.panel;
  };
  return (
    <div
      // props
      class={createClassList()}
      role="tablist"
      {...htmlProps}
    >
      {createChildren()}
    </div>
  );
};
(Tab as any).displayName = `${DISPLAYNAME_PREFIX}.Tab`;

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
export const TabTitle: Component<TabTitleProps> = (userProps: TabTitleProps) => {
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
          : () => {
              console.debug("Tab title clicked");
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
(TabTitle as any).displayName = `${DISPLAYNAME_PREFIX}.TabTitle`;
