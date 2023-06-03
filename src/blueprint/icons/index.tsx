import classNames from "classnames";
import { mergeProps, splitProps, createMemo } from "solid-js";
import type { Component } from "solid-js";

import { Classes, Props } from "@blueprint/core";
import * as Images from "@blueprint/icons/images";

export enum IconSize {
  STANDARD = 16,
  LARGE = 20,
}

export enum IconName {
  REFRESH = "refresh",
  DUPLICATE = "duplicate",
  DATABASE = "database",
  FUNCTION = "function",
  COG = "cog",
  INFO_SIGN = "info-sign",
  CARET_DOWN = "caret-down",
  CARET_UP = "caret-up",
  CARET_RIGHT = "caret-right",
  PLUS = "plus",
  ADD = "add",
  HAND_RIGHT = "hand-right",
  SEARCH = "search",
}

export const Icons = {
  [IconName.REFRESH]: Images.REFRESH_ICON.default,
  [IconName.DUPLICATE]: Images.DUPLICATE_ICON.default,
  [IconName.DATABASE]: Images.DATABASE_ICON.default,
  [IconName.FUNCTION]: Images.FUNCTION_ICON.default,
  [IconName.COG]: Images.COG_ICON.default,
  [IconName.INFO_SIGN]: Images.INFO_SIGN.default,
  [IconName.CARET_DOWN]: Images.CARET_DOWN.default,
  [IconName.CARET_UP]: Images.CARET_UP.default,
  [IconName.CARET_RIGHT]: Images.CARET_RIGHT.default,
};

const icons = Object.keys(Icons);

export type IconType = typeof icons[number];
export const isIcon = (x: any): x is IconType => icons.includes(x);

export interface IconProps extends Omit<Props, "children"> {
  icon: IconName;
  size?: IconSize;
}
export const IconPropsDefaults: IconProps = {
  icon: IconName.PLUS,
  size: IconSize.STANDARD,
};

export const Icon: Component<IconProps> = (userProps) => {
  const [props, htmlProps] = splitProps(mergeProps(IconPropsDefaults, userProps), [
    // props list
    "icon",
    "size",
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      Classes.ICON,
      props.icon ? `${Classes.ICON}-${props.icon}` : null,
      {
        // from props
        [Classes.DISABLED]: !!props.disabled,
      },
      props.icon,
      // user
      props.class
    )
  );
  return (
    <span
      // props
      aria-hidden="true"
      data-icon={props.icon}
      class={createClassList()}
      {...htmlProps}
    ></span>
  );
};

export type PIcon = IconName | typeof Icon;
