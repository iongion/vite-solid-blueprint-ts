import classNames from "classnames";
import { mergeProps, splitProps, children, createMemo } from "solid-js";
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
import { Spinner } from "./Spinner";

import "./Button.css";

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
  tabIndex: undefined,
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
  const createClassList = createMemo(() =>
    classNames(
      Classes.BUTTON,
      {
        // from props
        [Classes.ACTIVE]: !!props.active,
        [Classes.MINIMAL]: !!props.minimal,
        [Classes.OUTLINED]: !!props.outlined,
        [Classes.SMALL]: !!props.small,
        [Classes.LARGE]: !!props.large,
        [Classes.FILL]: !!props.fill,
        [Classes.LOADING]: !!props.loading,
        [Classes.DISABLED]: !!props.disabled || !!props.loading,
      },
      alignmentClass(props.alignText),
      intentClass(props.intent),
      // user
      props.class
    )
  );
  const createText = createMemo(() => {
    return props.text ? <span class={Classes.BUTTON_TEXT}>{props.text}</span> : undefined;
  });
  const createIcon = (icon?: IconName | null) => {
    return icon ? <Icon icon={icon} /> : undefined;
  };
  const createChildren = children(() => props.children);
  const createLoader = createMemo(() => {
    return props.loading ? <Spinner class={Classes.BUTTON_SPINNER} intent={props.intent} size={20} /> : undefined;
  });
  return (
    <button
      // props
      onClick={props.disabled ? undefined : props.onClick}
      type={props.type as ButtonType}
      class={createClassList()}
      disabled={!!props.disabled}
      tabIndex={props.disabled ? -1 : props.tabIndex}
      {...htmlProps}
    >
      {createLoader()}
      {createIcon(props.icon)}
      {createText()}
      {createChildren()}
      {createIcon(props.rightIcon)}
    </button>
  );
};
(Button as any).displayName = `${DISPLAYNAME_PREFIX}.Button`;
