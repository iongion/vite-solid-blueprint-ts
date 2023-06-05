import classNames from "classnames";
import { mergeProps, splitProps, createMemo } from "solid-js";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, IntentProps } from "@blueprint/core";
import { isIcon, Icon, IconName } from "@blueprint/icons";
import { TabId, TabProps } from "./Tab";

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
