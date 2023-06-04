import classNames from "classnames";
import { JSX, mergeProps, splitProps, createMemo, children } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, MaybeElement, Alignment, Classes, AlignmentProps, Props } from "@blueprint/core";

interface ISwitchProps extends Omit<JSX.SelectHTMLAttributes<HTMLInputElement>, "children">, Props {
  inline?: boolean;
  large?: boolean;
  checked?: boolean;
  innerLabel?: string;
  innerLabelChecked?: string;
  label?: string;
  labelElement?: MaybeElement;
  tagName?: string;
  alignIndicator?: Alignment;
}
export type SwitchProps = ISwitchProps;
export const SwitchPropsSchemaDefaults: SwitchProps = {
  inline: false,
  large: false,
  checked: false,
  tagName: "label",
  alignIndicator: Alignment.LEFT,
};
export const Switch: Component<SwitchProps> = (userProps: SwitchProps) => {
  const [props, htmlProps] = splitProps(mergeProps(SwitchPropsSchemaDefaults, userProps), [
    // props list
    "inline",
    "large",
    "checked",
    "innerLabel",
    "innerLabelChecked",
    "label",
    "labelElement",
    "tagName",
    "alignIndicator",
    "children",
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      // default
      Classes.CONTROL,
      Classes.SWITCH,
      {
        // from props
        [Classes.INLINE]: !!props.inline,
        [Classes.LARGE]: !!props.large,
        [Classes.DISABLED]: !!props.disabled,
      },
      Classes.alignmentClass(props.alignIndicator),
      // user
      props.class
    )
  );
  const createInnerLabel = createMemo(() => {
    let innerLabel = props.innerLabel;
    if (props.checked) {
      if (props.innerLabelChecked) {
        innerLabel = props.innerLabelChecked;
      }
    }
    if (innerLabel) {
      return (
        <div class={Classes.CONTROL_INDICATOR_CHILD}>
          <div class={Classes.SWITCH_INNER_TEXT}>{innerLabel}</div>
        </div>
      );
    }
  });
  const createChildren = children(() => props.children);
  return (
    <Dynamic
      // props
      component={props.tagName || "label"}
      class={createClassList()}
    >
      <input type="checkbox" {...htmlProps} />
      <span class={Classes.CONTROL_INDICATOR}>{createInnerLabel()}</span>
      {props.label}
      {createChildren()}
    </Dynamic>
  );
};
(Switch as any).displayName = `${DISPLAYNAME_PREFIX}.Switch`;
