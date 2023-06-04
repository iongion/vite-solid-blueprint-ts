import classNames from "classnames";
import { JSX, mergeProps, splitProps, createMemo, children } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, MaybeElement, Alignment, Classes, AlignmentProps, Props } from "@blueprint/core";

interface ISwitchProps extends Omit<JSX.SelectHTMLAttributes<HTMLInputElement>, "children">, AlignmentProps, Props {
  inline?: boolean;
  large?: boolean;
  checked?: boolean;
  innerLabel?: string;
  innerLabelChecked?: string;
  label?: string;
  labelElement?: MaybeElement;
  tagName?: string;
}
export type SwitchProps = ISwitchProps;
export const SwitchPropsSchemaDefaults: SwitchProps = {
  inline: false,
  large: false,
  checked: false,
  tagName: "label",
  alignment: Alignment.LEFT,
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
    "alignment",
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
      Classes.alignmentClass(props.alignment),
      // user
      props.class
    )
  );
  const createLabel = createMemo(() => {
    if (props.checked && props.innerLabelChecked) {
      return props.innerLabelChecked;
    }
    if (props.innerLabel) {
      return props.innerLabel;
    }
    return props.label;
  });
  const createChildren = children(() => props.children);
  return (
    <Dynamic
      // props
      component={props.tagName || "div"}
      class={createClassList()}
    >
      <input type="checkbox" {...htmlProps} />
      <span class={Classes.CONTROL_INDICATOR}></span>
      <div class={Classes.CONTROL_INDICATOR_CHILD}>
        <div class={Classes.SWITCH_INNER_TEXT}>{createLabel()}</div>
      </div>
      {createChildren()}
    </Dynamic>
  );
};
(Switch as any).displayName = `${DISPLAYNAME_PREFIX}.Switch`;
