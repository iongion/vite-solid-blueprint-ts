import classNames from "classnames";
import { mergeProps, splitProps, children, createMemo } from "solid-js";

import { DISPLAYNAME_PREFIX, Alignment, Classes, Props } from "@blueprint/core";
import type { UIComponent } from "@blueprint/core";

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

export const ButtonGroup: UIComponent<ButtonGroupProps> = (userProps: ButtonGroupProps) => {
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
  const createClassList = createMemo(() =>
    classNames(
      Classes.BUTTON_GROUP,
      {
        // from props
        [Classes.FILL]: !!props.fill,
        [Classes.LARGE]: !!props.large,
        [Classes.MINIMAL]: !!props.minimal,
        [Classes.VERTICAL]: !!props.vertical,
        [Classes.DISABLED]: !!props.disabled,
      },
      Classes.alignmentClass(props.alignText),
      // user
      props.class
    )
  );
  const createChildren = children(() => props.children);
  return (
    <div
      // props
      class={createClassList()}
      {...htmlProps}
    >
      {createChildren()}
    </div>
  );
};
ButtonGroup.displayName = `${DISPLAYNAME_PREFIX}.ButtonGroup`;
