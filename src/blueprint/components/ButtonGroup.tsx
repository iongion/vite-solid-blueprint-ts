import classNames from "classnames";
import { mergeProps, splitProps } from "solid-js";
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

export const ButtonGroup: Component<ButtonGroupProps> = (userProps: ButtonGroupProps) => {
  const props = mergeProps(
    {
      alignText: Alignment.LEFT,
      fill: false,
      minimal: false,
      large: false,
      vertical: false,
    },
    userProps
  );
  const [local, htmlProps] = splitProps(props, [
    // props list
    "alignText",
    "fill",
    "minimal",
    "large",
    "vertical",
    "children",
    "class",
  ]);
  return (
    <div
      class={classNames(
        Classes.BUTTON_GROUP,
        {
          [Classes.FILL]: local.fill,
          [Classes.LARGE]: local.large,
          [Classes.MINIMAL]: local.minimal,
          [Classes.VERTICAL]: local.vertical,
        },
        Classes.alignmentClass(local.alignText),
        // user
        local.class
      )}
      {...htmlProps}
    >
      {local.children}
    </div>
  );
};
(ButtonGroup as any).displayName = `${DISPLAYNAME_PREFIX}.ButtonGroup`;
