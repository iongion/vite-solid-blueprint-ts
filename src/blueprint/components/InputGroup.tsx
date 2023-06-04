import classNames from "classnames";
import { JSX, mergeProps, splitProps, createMemo } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Intent, IntentProps, Props, MaybeElement } from "@blueprint/core";
import { IconName } from "@blueprint/icons";

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
    return <></>;
  });
  const createInputElement = createMemo(() => {
    return (
      <input
        // props
        type={props.type || InputGroupPropsSchemaDefaults.type}
        class={classNames(Classes.INPUT, props.inputClassName)}
      />
    );
  });
  const createRightElement = createMemo(() => {
    return <></>;
  });
  return (
    <Dynamic
      // props
      component={props.tagName || InputGroupPropsSchemaDefaults.tagName}
      class={createClassList()}
      {...htmlProps}
    >
      {createLeftElement()}
      {createInputElement()}
      {createRightElement()}
    </Dynamic>
  );
};
(InputGroup as any).displayName = `${DISPLAYNAME_PREFIX}.InputGroup`;
