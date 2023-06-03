import classNames from "classnames";
import { mergeProps, splitProps, createMemo } from "solid-js";
import type { Component } from "solid-js";

import { Classes, Props } from "@blueprint/core";
import * as Images from "@blueprint/icons/images";

export enum IconSize {
  STANDARD = 16,
  LARGE = 20,
  XLARGE = 32,
  XXLARGE = 48,
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
  SHARE = "share",
}

export const Icons = {
  [IconName.REFRESH]: Images.REFRESH.default,
  [IconName.DUPLICATE]: Images.DUPLICATE.default,
  [IconName.DATABASE]: Images.DATABASE.default,
  [IconName.FUNCTION]: Images.FUNCTION.default,
  [IconName.COG]: Images.COG.default,
  [IconName.INFO_SIGN]: Images.INFO_SIGN.default,
  [IconName.CARET_DOWN]: Images.CARET_DOWN.default,
  [IconName.CARET_UP]: Images.CARET_UP.default,
  [IconName.CARET_RIGHT]: Images.CARET_RIGHT.default,
  [IconName.SEARCH]: Images.SEARCH.default,
  [IconName.SHARE]: Images.SHARE.default,
  [IconName.HAND_RIGHT]: Images.HAND_RIGHT.default,
};

const icons = Object.keys(Icons);

export type IconType = typeof icons[number];
export const isIcon = (x: any): x is IconType => icons.includes(x);

export interface IconProps extends Omit<Props, "children"> {
  icon: IconName;
  size?: IconSize | number;
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
  const createStyle = createMemo(() => {
    if (props.size === IconSize.STANDARD) return;
    return `font-size: ${props.size}px; line-height: ${props.size}px`;
  });
  const createClassList = createMemo(() =>
    classNames(
      Classes.ICON,
      props.icon ? `${Classes.ICON}-${props.icon}` : null,
      {
        // from props
        [Classes.ICON_LARGE]: props.size === IconSize.LARGE,
        [Classes.ICON_STANDARD]: props.size === IconSize.STANDARD,
        [Classes.DISABLED]: !!props.disabled,
      },
      props.icon,
      // user
      props.class
    )
  );
  const createIcon = createMemo(() => {
    const iconElement = props.icon ? Icons[props.icon] : undefined;
    const size = props.size || IconSize.STANDARD;
    return iconElement
      ? iconElement({
          width: size,
          height: size,
          // viewBox: `0 0 ${size} ${size}`,
        })
      : undefined;
  });
  return (
    <span
      // props
      aria-hidden="true"
      data-icon={props.icon}
      style={createStyle()}
      class={createClassList()}
      {...htmlProps}
    >
      {createIcon()}
    </span>
  );
};

export type PIcon = IconName | typeof Icon;
