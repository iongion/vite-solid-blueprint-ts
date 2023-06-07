import classNames from "classnames";
import { JSX, mergeProps, splitProps, createMemo, onMount } from "solid-js";

import { DISPLAYNAME_PREFIX, MaybeElement, Classes, Props } from "@blueprint/core";
import type { UIComponent } from "@blueprint/core";
import { IconName } from "@blueprint/icons";

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

export const Tab: UIComponent<TabProps> = (userProps: TabProps) => {
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
  let tabRef: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined;
  onMount(() => {
    console.debug("tabRef", tabRef);
  });
  return (
    <div
      ref={tabRef}
      // props
      class={createClassList()}
      role="tablist"
      {...htmlProps}
    >
      {createChildren()}
    </div>
  );
};
Tab.displayName = `${DISPLAYNAME_PREFIX}.Tab`;
Object.defineProperty(Tab, "displayName", {
  value: Tab.displayName,
  writable: false,
});
