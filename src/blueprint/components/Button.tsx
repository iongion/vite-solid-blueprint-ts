import classNames from "classnames";
import { mergeProps, splitProps, children } from "solid-js";
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

export type ButtonType = "submit" | "reset" | "button";

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
  const [props, htmlProps] = splitProps(mergeProps(ButtonPropsDefaults, userProps), [
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
    return props.text ? <span class={Classes.BUTTON_TEXT}>{props.text}</span> : undefined;
  };
  const createIcon = (icon?: IconName | null) => {
    return icon ? <Icon icon={icon} /> : undefined;
  };
  const createChildren = children(() => props.children);
  return (
    <button
      onClick={props.onClick}
      type={props.type as ButtonType}
      class={classNames(
        Classes.BUTTON,
        {
          // from props
          [Classes.ACTIVE]: !!props.active,
          [Classes.MINIMAL]: !!props.minimal,
          [Classes.OUTLINED]: !!props.outlined,
          [Classes.SMALL]: !!props.small,
          [Classes.FILL]: !!props.fill,
          [Classes.DISABLED]: !!props.disabled,
        },
        alignmentClass(props.alignText),
        intentClass(props.intent),
        // user
        props.class
      )}
      {...htmlProps}
    >
      {createIcon(props.icon)}
      {createText()}
      {createChildren()}
      {createIcon(props.rightIcon)}
    </button>
  );
};
(Button as any).displayName = `${DISPLAYNAME_PREFIX}.Button`;
