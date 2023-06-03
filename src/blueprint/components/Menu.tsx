import classNames from "classnames";
import { mergeProps, splitProps, children, createMemo } from "solid-js";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, MaybeElement, Props } from "@blueprint/core";
import { ActionProps } from "@blueprint/tools/actions";
import { Icon, IconName } from "@blueprint/icons";

// MenuDivider
export type MenuDividerProps = Omit<Props, "children">;
export const MenuDividerPropsDefaults: MenuDividerProps = {};
export const MenuDivider: Component<MenuDividerProps> = (userProps) => {
  const [props, htmlProps] = splitProps(mergeProps(MenuDividerPropsDefaults, userProps), [
    // props list
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      Classes.MENU_DIVIDER,
      {
        // from props
        [Classes.DISABLED]: !!props.disabled,
      },
      props.class
    )
  );
  return (
    <div
      // props
      class={createClassList()}
      {...htmlProps}
    ></div>
  );
};
(MenuDivider as any).displayName = `${DISPLAYNAME_PREFIX}.MenuDivider`;

// MenuItem
interface IMenuItemProps<E extends HTMLAnchorElement | HTMLElement = HTMLAnchorElement> extends ActionProps<E> {
  rightIcon?: IconName | MaybeElement;
}
export type MenuItemProps = IMenuItemProps;
export const MenuItemPropsDefaults: MenuItemProps = {};
export const MenuItem: Component<MenuItemProps> = (userProps) => {
  const [props, htmlProps] = splitProps(mergeProps(MenuItemPropsDefaults, userProps), [
    // props list
    "onClick",
    "text",
    "icon",
    "rightIcon",
    "children",
    "class",
    "disabled",
    "tabIndex",
  ]);
  const createIcon = (icon?: IconName, isRight?: boolean) => {
    return icon === undefined ? undefined : (
      <span class={isRight ? Classes.MENU_ITEM_LABEL : Classes.MENU_ITEM_ICON}>
        <Icon icon={icon} />
      </span>
    );
  };
  const createText = () => {
    return props.text ? <div class={classNames(Classes.FILL, Classes.TEXT_OVERFLOW_ELLIPSIS)}>{props.text}</div> : undefined;
  };
  const createListItemClassList = createMemo(() =>
    classNames(
      {
        // from props
        [Classes.DISABLED]: !!props.disabled,
      },
      props.class
    )
  );
  const createAnchorClassList = createMemo(() =>
    classNames(
      Classes.MENU_ITEM,
      {
        // from props
        [Classes.DISABLED]: !!props.disabled,
      },
      props.class
    )
  );
  const createChildren = children(() => props.children);
  return (
    <li class={createListItemClassList()}>
      <a
        // props
        class={createAnchorClassList()}
        role="menuitem"
        tabIndex={props.disabled ? -1 : props.tabIndex}
        onClick={props.disabled ? undefined : props.onClick}
        {...htmlProps}
      >
        {createIcon(props.icon as any)}
        {createText()}
        {createChildren()}
        {createIcon(props.rightIcon as any, true)}
      </a>
    </li>
  );
};
(MenuItem as any).displayName = `${DISPLAYNAME_PREFIX}.MenuItem`;

// Menu
interface IMenuProps extends Props {
  fixedToTop?: boolean;
}
export type MenuProps = IMenuProps;
export const MenuPropsDefaults: MenuProps = {
  fixedToTop: false,
};
export function Menu(userProps: MenuProps = {}) {
  const [props, htmlProps] = splitProps(mergeProps(MenuPropsDefaults, userProps), [
    // props list
    "fixedToTop",
    "children",
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      Classes.MENU,
      Classes.POPOVER_DISMISS,
      {
        // from props
        [Classes.FIXED_TOP]: !!props.fixedToTop,
        [Classes.DISABLED]: !!props.disabled,
      },
      props.class
    )
  );
  const createChildren = children(() => props.children);
  return (
    <div
      // props
      class={createClassList()}
      {...htmlProps}
    >
      {createChildren()}
    </div>
  );
}
Menu.displayName = `${DISPLAYNAME_PREFIX}.Menu`;
Menu.Divider = MenuDivider;
Menu.Item = MenuItem;
