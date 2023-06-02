import classNames from "classnames";
import { mergeProps, splitProps } from "solid-js";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Alignment, Props } from "@blueprint/core";

// NavbarDivider
interface INavbarDividerProps extends Props {}
export type NavbarDividerProps = INavbarDividerProps;
export const NavbarDivider: Component<NavbarDividerProps> = (userProps) => {
  const [props, htmlProps] = splitProps(mergeProps({}, userProps), [
    // props list
    "children",
    "class",
  ]);
  return (
    <div class={classNames(Classes.NAVBAR_DIVIDER, props.class)} {...htmlProps}>
      {props.children}
    </div>
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
  ]);
  return (
    <div class={classNames(Classes.NAVBAR_HEADING, props.class)} {...htmlProps}>
      {props.children}
    </div>
  );
};
(NavbarHeading as any).displayName = `${DISPLAYNAME_PREFIX}.NavbarHeading`;

// NavbarGroup
interface INavbarGroupProps extends Props {
  align?: Alignment;
}
export type NavbarGroupProps = INavbarGroupProps;
export const NavbarGroup: Component<NavbarGroupProps> = (userProps) => {
  const [props, htmlProps] = splitProps(
    mergeProps(
      {
        align: Alignment.LEFT,
      },
      userProps
    ),
    [
      // props list
      "align",
      "children",
      "class",
    ]
  );
  return (
    <div class={classNames(Classes.NAVBAR_GROUP, Classes.alignmentClass(props.align), props.class)} {...htmlProps}>
      {props.children}
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
  ]);
  return (
    <div class={classNames(Classes.NAVBAR, { [Classes.FIXED_TOP]: props.fixedToTop }, props.class)} {...htmlProps}>
      {props.children}
    </div>
  );
}
Navbar.displayName = `${DISPLAYNAME_PREFIX}.Navbar`;
Navbar.Divider = NavbarDivider;
Navbar.Group = NavbarGroup;
Navbar.Heading = NavbarHeading;
