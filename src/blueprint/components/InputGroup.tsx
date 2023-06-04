import classNames from "classnames";
import { JSX, mergeProps, splitProps, createMemo, children } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Intent, IntentProps, Props } from "@blueprint/core";

interface IInputGroupProps extends Omit<JSX.SelectHTMLAttributes<HTMLInputElement>, "children">, IntentProps, Props {
  inline?: boolean;
  fill?: boolean;
  readOnly?: boolean;
  large?: boolean;
  small?: boolean;
  round?: boolean;
  tagName?: string;
  type?: string;
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
    "type",
    "children",
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
  const createInnerLabel = createMemo(() => {
    return (
      <>
        <div class={Classes.CONTROL_INDICATOR_CHILD}>
          <div class={Classes.InputGroup_INNER_TEXT}>{props.innerLabelChecked}</div>
        </div>
        <div class={Classes.CONTROL_INDICATOR_CHILD}>
          <div class={Classes.InputGroup_INNER_TEXT}>{props.innerLabel}</div>
        </div>
      </>
    );
  });
  const createChildren = children(() => props.children);
  return (
    <Dynamic
      // props
      component={props.tagName || "label"}
      class={createClassList()}
    >
      <input type="checkbox" checked={props.checked} disabled={props.disabled} {...htmlProps} />
      <span class={Classes.CONTROL_INDICATOR}>{createInnerLabel()}</span>
      {props.label}
      {createChildren()}
    </Dynamic>
  );
};
(InputGroup as any).displayName = `${DISPLAYNAME_PREFIX}.InputGroup`;
