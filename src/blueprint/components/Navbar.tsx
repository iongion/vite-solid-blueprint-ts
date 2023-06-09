import classNames from "classnames";
import { mergeProps, splitProps, children, createMemo } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Alignment, Props } from "@blueprint/core";
import type { UIComponent } from "@blueprint/core";

// NavbarDivider
export type NavbarDividerProps = Omit<Props, "children">;
export const NavbarDivider: UIComponent<NavbarDividerProps> = (userProps) => {
  const [props, htmlProps] = splitProps(mergeProps({}, userProps), [
    // props list
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      Classes.NAVBAR_DIVIDER,
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
NavbarDivider.displayName = `${DISPLAYNAME_PREFIX}.NavbarDivider`;

// NavbarHeading
interface INavbarHeadingProps extends Props {}
export type NavbarHeadingProps = INavbarHeadingProps;
export const NavbarHeading: UIComponent<NavbarHeadingProps> = (userProps) => {
  const [props, htmlProps] = splitProps(mergeProps({}, userProps), [
    // props list
    "children",
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      Classes.NAVBAR_HEADING,
      {
        // from props
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
};
NavbarHeading.displayName = `${DISPLAYNAME_PREFIX}.NavbarHeading`;

// NavbarGroup
interface INavbarGroupProps extends Props {
  align?: Alignment;
}
export type NavbarGroupProps = INavbarGroupProps;
export const NavbarGroupPropsDefaults: NavbarGroupProps = {
  align: Alignment.LEFT,
};
export const NavbarGroup: UIComponent<NavbarGroupProps> = (userProps) => {
  const [props, htmlProps] = splitProps(mergeProps(NavbarGroupPropsDefaults, userProps), [
    // props list
    "align",
    "children",
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      Classes.NAVBAR_GROUP,
      Classes.alignmentClass(props.align),
      {
        // from props
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
};
NavbarGroup.displayName = `${DISPLAYNAME_PREFIX}.NavbarGroup`;

// Navbar
interface INavbarProps extends Props {
  fixedToTop?: boolean;
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
  const createClassList = createMemo(() =>
    classNames(
      Classes.NAVBAR,
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
Navbar.displayName = `${DISPLAYNAME_PREFIX}.Navbar`;
Navbar.Divider = NavbarDivider;
Navbar.Group = NavbarGroup;
Navbar.Heading = NavbarHeading;
