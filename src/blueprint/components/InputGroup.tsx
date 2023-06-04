import classNames from "classnames";
import { JSX, mergeProps, splitProps, createMemo } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Intent, IntentProps, Props, MaybeElement } from "@blueprint/core";
import { Icon, IconName, isIcon } from "@blueprint/icons";

interface IInputGroupProps extends Omit<JSX.SelectHTMLAttributes<HTMLInputElement>, "children">, IntentProps, Omit<Props, "children"> {
  inline?: boolean;
  fill?: boolean;
  readOnly?: boolean;
  large?: boolean;
  small?: boolean;
  round?: boolean;
  placeholder?: string;
  tagName?: string;
  type?: string;
  inputClassName?: string;
  leftElement?: MaybeElement;
  rightElement?: MaybeElement;
  leftIcon?: IconName | MaybeElement;
  rightIcon?: IconName | MaybeElement;
  value?: string;
}
export type InputGroupProps = IInputGroupProps;
export const InputGroupPropsSchemaDefaults: InputGroupProps = {
  inline: false,
  fill: false,
  readOnly: false,
  large: false,
  small: false,
  round: false,
  tagName: "div",
  type: "text",
  intent: Intent.NONE,
};
export const InputGroup: Component<InputGroupProps> = (userProps: InputGroupProps) => {
  const [props, htmlProps] = splitProps(mergeProps(InputGroupPropsSchemaDefaults, userProps), [
    // props list
    "inline",
    "fill",
    "readOnly",
    "large",
    "small",
    "round",
    "intent",
    "tagName",
    "inputClassName",
    "placeholder",
    "leftElement",
    "rightElement",
    "leftIcon",
    "rightIcon",
    "type",
    "value",
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      // default
      Classes.INPUT_GROUP,
      {
        // from props
        [Classes.READ_ONLY]: !!props.readOnly,
        [Classes.FILL]: !!props.fill,
        [Classes.LARGE]: !!props.large,
        [Classes.SMALL]: !!props.small,
        [Classes.ROUND]: !!props.round,
        [Classes.DISABLED]: !!props.disabled,
      },
      Classes.intentClass(props.intent),
      // user
      props.class
    )
  );
  const createLeftElement = createMemo(() => {
    if (props.leftElement) {
      return props.leftElement;
    }
    if (props.leftIcon) {
      return isIcon(props.leftIcon) ? <Icon icon={props.leftIcon as IconName} /> : props.leftIcon;
    }
  });
  const createRightElement = createMemo(() => {
    if (props.rightElement) {
      return props.rightElement;
    }
    if (props.rightIcon) {
      return isIcon(props.rightIcon) ? <Icon icon={props.rightIcon as IconName} /> : props.rightIcon;
    }
  });
  const createInputElement = createMemo(() => {
    return (
      <input
        // props
        {...htmlProps}
        type={props.type || InputGroupPropsSchemaDefaults.type}
        class={classNames(Classes.INPUT, props.inputClassName)}
        disabled={props.disabled}
        readonly={props.readOnly}
        value={props.value || ""}
        placeholder={props.placeholder || ""}
      />
    );
  });
  return (
    <Dynamic
      // props
      component={props.tagName || InputGroupPropsSchemaDefaults.tagName}
      class={createClassList()}
    >
      {createLeftElement()}
      {createInputElement()}
      {createRightElement()}
    </Dynamic>
  );
};
(InputGroup as any).displayName = `${DISPLAYNAME_PREFIX}.InputGroup`;
