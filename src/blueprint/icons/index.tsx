import classNames from "classnames";
import { mergeProps, splitProps, createMemo } from "solid-js";
import type { Component } from "solid-js";

import { Classes, Intent, Props, IntentProps } from "@blueprint/core";
import * as Images from "@blueprint/icons/images";

export enum IconSize {
  STANDARD = 16,
  LARGE = 20,
  XL = 32,
  XXL = 48,
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
  STACKBLITZ = "stackblitz",
  GITHUB = "github",
  DOUBLE_CARET_VERTICAL = "double-caret-vertical",
  FLASH = "flash",
  MOON = "moon",
  FILTER = "filter",
  SMALL_CROSS = "small-cross",
}

export const Icons = {
  [IconName.REFRESH]: Images.REFRESH,
  [IconName.DUPLICATE]: Images.DUPLICATE,
  [IconName.DATABASE]: Images.DATABASE,
  [IconName.FUNCTION]: Images.FUNCTION,
  [IconName.COG]: Images.COG,
  [IconName.INFO_SIGN]: Images.INFO_SIGN,
  [IconName.CARET_DOWN]: Images.CARET_DOWN,
  [IconName.CARET_UP]: Images.CARET_UP,
  [IconName.CARET_RIGHT]: Images.CARET_RIGHT,
  [IconName.SEARCH]: Images.SEARCH,
  [IconName.SHARE]: Images.SHARE,
  [IconName.HAND_RIGHT]: Images.HAND_RIGHT,
  [IconName.STACKBLITZ]: Images.STACKBLITZ,
  [IconName.GITHUB]: Images.GITHUB,
  [IconName.DOUBLE_CARET_VERTICAL]: Images.DOUBLE_CARET_VERTICAL,
  [IconName.FLASH]: Images.FLASH,
  [IconName.MOON]: Images.MOON,
  [IconName.FILTER]: Images.FILTER,
  [IconName.SMALL_CROSS]: Images.SMALL_CROSS,
  [IconName.PLUS]: Images.PLUS,
};

export const IconsList = Object.keys(Icons);

export type IconType = (typeof IconsList)[number];
export const isIcon = (x: any): x is IconType => IconsList.includes(x);

export interface IconProps extends IntentProps, Omit<Props, "children"> {
  icon: IconName;
  size?: IconSize | number;
}
export const IconPropsDefaults: IconProps = {
  icon: IconName.PLUS,
  size: IconSize.STANDARD,
  intent: Intent.NONE,
};

export const Icon: Component<IconProps> = (userProps) => {
  const [props, htmlProps] = splitProps(mergeProps(IconPropsDefaults, userProps), [
    // props list
    "icon",
    "size",
    "intent",
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
      Classes.intentClass(props.intent),
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
