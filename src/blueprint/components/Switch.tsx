import classNames from "classnames";
import { mergeProps, splitProps, createMemo, children } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, MaybeElement, Classes, Props } from "@blueprint/core";

interface ISwitchProps extends Props {
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
    "children",
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      // default
      Classes.HTML_SELECT,
      {
        // from props
        [Classes.INLINE]: !!props.inline,
        [Classes.LARGE]: !!props.large,
        [Classes.DISABLED]: !!props.disabled,
      },
      // user
      props.class
    )
  );
  const createChildren = children(() => props.children);
  return (
    <Dynamic
      // props
      component={props.tagName || "div"}
      class={createClassList()}
      {...htmlProps}
    >
      <input type="checkbox" />
      <span class={Classes.CONTROL_INDICATOR}>{props.label || props.labelElement}</span>
      {createChildren()}
    </Dynamic>
  );
};
(Switch as any).displayName = `${DISPLAYNAME_PREFIX}.Switch`;
