import classNames from "classnames";
import { mergeProps, splitProps } from "solid-js";
import type { Component } from "solid-js";

import {
  //
  DISPLAYNAME_PREFIX,
  Classes,
  Props,
  Alignment,
  IntentProps,
  alignmentClass,
  intentClass,
} from "@blueprint/core";
import { ActionProps } from "@blueprint/tools/actions";
import { Icon, IconName } from "@blueprint/icons";

export type ButtonType = "submit" | "reset" | "button" | undefined;

interface IButtonProps<E extends HTMLButtonElement | HTMLAnchorElement | HTMLElement = HTMLButtonElement> extends ActionProps<E>, IntentProps, Props {
  icon?: IconName | null;
  rightIcon?: IconName | null;
  alignText?: Alignment | null;
  active?: boolean;
  fill?: boolean;
  large?: boolean;
  loading?: boolean;
  minimal?: boolean;
  outlined?: boolean;
  small?: boolean;
  type?: ButtonType;
}
export type ButtonProps = IButtonProps;
export const ButtonPropsDefaults: ButtonProps = {
  icon: undefined,
  rightIcon: undefined,
  alignText: Alignment.LEFT,
  active: false,
  fill: false,
  large: false,
  loading: false,
  minimal: false,
  outlined: false,
  small: false,
  type: "submit",
};

export const Button: Component<ButtonProps> = (userProps) => {
  const props = mergeProps(ButtonPropsDefaults, userProps);
  const [local, htmlProps] = splitProps(props, [
    // props list
    "disabled",
    "icon",
    "rightIcon",
    "alignText",
    "active",
    "fill",
    "large",
    "loading",
    "minimal",
    "outlined",
    "small",
    "type",
    "intent",
    "text",
    "children",
    "onClick",
    "class",
  ]);
  const createText = () => {
    return local.text ? <span class={Classes.BUTTON_TEXT}>{local.text}</span> : undefined;
  };
  const createIcon = (icon?: IconName | null) => {
    return icon ? <Icon icon={icon} /> : undefined;
  };
  return (
    <button
      onClick={local.onClick}
      type={local.type as ButtonType}
      class={classNames(
        Classes.BUTTON,
        {
          [Classes.ACTIVE]: local.active,
          [Classes.MINIMAL]: local.minimal,
          [Classes.OUTLINED]: local.outlined,
          [Classes.SMALL]: local.small,
          [Classes.FILL]: local.fill,
          [Classes.DISABLED]: local.disabled,
        },
        alignmentClass(local.alignText),
        intentClass(local.intent),
        // user
        local.class
      )}
      {...htmlProps}
    >
      {createIcon(local.icon)}
      {createText()}
      {local.children}
      {createIcon(local.rightIcon)}
    </button>
  );
};
(Button as any).displayName = `${DISPLAYNAME_PREFIX}.Button`;
