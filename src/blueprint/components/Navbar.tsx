import classNames from "classnames";
import { mergeProps, splitProps, children } from "solid-js";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Alignment, Props } from "@blueprint/core";

// NavbarDivider
export type NavbarDividerProps = Omit<Props, "children">;
export const NavbarDivider: Component<NavbarDividerProps> = (userProps) => {
  const [props, htmlProps] = splitProps(mergeProps({}, userProps), [
    // props list
    "class",
    "disabled",
  ]);
  return (
    <div
      class={classNames(
        Classes.NAVBAR_DIVIDER,
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
(NavbarDivider as any).displayName = `${DISPLAYNAME_PREFIX}.NavbarDivider`;

// NavbarHeading
interface INavbarHeadingProps extends Props {}
export type NavbarHeadingProps = INavbarHeadingProps;
export const NavbarHeading: Component<NavbarHeadingProps> = (userProps) => {
  const [props, htmlProps] = splitProps(mergeProps({}, userProps), [
    // props list
    "children",
    "class",
    "disabled",
  ]);
  const createChildren = children(() => props.children);
  return (
    <div
      class={classNames(
        Classes.NAVBAR_HEADING,
        {
          // from props
          [Classes.DISABLED]: !!props.disabled,
        },
        props.class
      )}
      {...htmlProps}
    >
      {createChildren()}
    </div>
  );
};
(NavbarHeading as any).displayName = `${DISPLAYNAME_PREFIX}.NavbarHeading`;

// NavbarGroup
interface INavbarGroupProps extends Props {
  align?: Alignment;
}
export type NavbarGroupProps = INavbarGroupProps;
export const NavbarGroupPropsDefaults: NavbarGroupProps = {
  align: Alignment.LEFT,
};
export const NavbarGroup: Component<NavbarGroupProps> = (userProps) => {
  const [props, htmlProps] = splitProps(mergeProps(NavbarGroupPropsDefaults, userProps), [
    // props list
    "align",
    "children",
    "class",
    "disabled",
  ]);
  const createChildren = children(() => props.children);
  return (
    <div
      class={classNames(
        Classes.NAVBAR_GROUP,
        Classes.alignmentClass(props.align),
        {
          // from props
          [Classes.DISABLED]: !!props.disabled,
        },
        props.class
      )}
      {...htmlProps}
    >
      {createChildren()}
    </div>
  );
};
(NavbarGroup as any).displayName = `${DISPLAYNAME_PREFIX}.NavbarGroup`;

// Navbar
interface INavbarProps extends Props {
  fixedToTop?: boolean | null;
}
export type NavbarProps = INavbarProps;
export const NavbarPropsDefaults: NavbarProps = {
  fixedToTop: false,
};
export function Navbar(userProps: NavbarProps = {}) {
  const [props, htmlProps] = splitProps(mergeProps(NavbarPropsDefaults, userProps), [
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
        Classes.NAVBAR,
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
Navbar.displayName = `${DISPLAYNAME_PREFIX}.Navbar`;
Navbar.Divider = NavbarDivider;
Navbar.Group = NavbarGroup;
Navbar.Heading = NavbarHeading;
