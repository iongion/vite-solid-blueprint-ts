import classNames from "classnames";
import { mergeProps, splitProps, children } from "solid-js";
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
  return (
    <div
      class={classNames(
        Classes.MENU_DIVIDER,
        {
          // from props
          [Classes.DISABLED]: !!props.disabled,
        },
        props.class
      )}
      {...htmlProps}
    ></div>
  );
};
(MenuDivider as any).displayName = `${DISPLAYNAME_PREFIX}.MenuDivider`;

// MenuItem
interface IMenuItemProps<E extends HTMLAnchorElement | HTMLElement = HTMLAnchorElement> extends ActionProps<E>, Props {
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
  const createChildren = children(() => props.children);
  return (
    <li
      class={
        classNames({
          // from props
          [Classes.DISABLED]: !!props.disabled,
        }) || undefined
      }
    >
      <a
        role="menuitem"
        tabindex="0"
        class={classNames(
          Classes.MENU_ITEM,
          {
            // from props
            [Classes.DISABLED]: !!props.disabled,
          },
          props.class
        )}
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
  fixedToTop?: boolean | null;
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
  const createChildren = children(() => props.children);
  return (
    <div
      class={classNames(
        Classes.MENU,
        Classes.POPOVER_DISMISS,
        {
          // from props
          [Classes.FIXED_TOP]: !!props.fixedToTop,
          [Classes.DISABLED]: !!props.disabled,
        },
        props.class
      )}
      {...htmlProps}
    >
      {createChildren()}
    </div>
  );
}
Menu.displayName = `${DISPLAYNAME_PREFIX}.Menu`;
Menu.Divider = MenuDivider;
Menu.Item = MenuItem;
