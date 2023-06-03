import classNames from "classnames";
import { mergeProps, splitProps, children } from "solid-js";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Alignment, Classes, Props } from "@blueprint/core";

interface IButtonGroupProps extends Props {
  alignText?: Alignment;
  fill?: boolean;
  minimal?: boolean;
  large?: boolean;
  vertical?: boolean;
}

export type ButtonGroupProps = IButtonGroupProps;
export const ButtonGroupPropsDefaults: ButtonGroupProps = {
  alignText: Alignment.LEFT,
  fill: false,
  minimal: false,
  large: false,
  vertical: false,
};

export const ButtonGroup: Component<ButtonGroupProps> = (userProps: ButtonGroupProps) => {
  const [props, htmlProps] = splitProps(mergeProps(ButtonGroupPropsDefaults, userProps), [
    // props list
    "alignText",
    "fill",
    "minimal",
    "large",
    "vertical",
    "children",
    "class",
    "disabled",
  ]);
  const createChildren = children(() => props.children);
  return (
    <div
      class={classNames(
        Classes.BUTTON_GROUP,
        {
          // from props
          [Classes.FILL]: props.fill,
          [Classes.LARGE]: props.large,
          [Classes.MINIMAL]: props.minimal,
          [Classes.VERTICAL]: props.vertical,
          [Classes.DISABLED]: props.disabled,
        },
        Classes.alignmentClass(props.alignText),
        // user
        props.class
      )}
      {...htmlProps}
    >
      {createChildren()}
    </div>
  );
};
(ButtonGroup as any).displayName = `${DISPLAYNAME_PREFIX}.ButtonGroup`;
