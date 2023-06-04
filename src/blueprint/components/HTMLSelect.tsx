import classNames from "classnames";
import { mergeProps, splitProps, children, createMemo } from "solid-js";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, IntentProps, Props } from "@blueprint/core";
import { Icon, IconName, IconProps } from "@blueprint/icons";

interface IHTMLSelectProps extends IntentProps, Props {
  fill?: boolean;
  large?: boolean;
  minimal?: boolean;
  iconName?: IconName;
  iconProps?: IconProps;
}
export type HTMLSelectProps = IHTMLSelectProps;
export const HTMLSelectPropsSchemaDefaults: HTMLSelectProps = {
  fill: false,
  large: false,
  minimal: false,
  iconName: IconName.DOUBLE_CARET_VERTICAL,
};
export const HTMLSelect: Component<HTMLSelectProps> = (userProps: HTMLSelectProps) => {
  const [props, htmlProps] = splitProps(mergeProps(HTMLSelectPropsSchemaDefaults, userProps), [
    // props list
    "fill",
    "large",
    "minimal",
    "intent",
    "iconName",
    "iconProps",
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
        [Classes.MINIMAL]: !!props.minimal,
        [Classes.LARGE]: !!props.large,
        [Classes.FILL]: !!props.fill,
        [Classes.DISABLED]: !!props.disabled,
      },
      // user
      props.class
    )
  );
  const createIcon = createMemo(() => {
    return props.iconName ? <Icon icon={props.iconName} {...props.iconProps} /> : undefined;
  });
  const createChildren = children(() => props.children);
  return (
    <div
      // props
      class={createClassList()}
      {...htmlProps}
    >
      {createChildren()}
      {createIcon()}
    </div>
  );
};
(HTMLSelect as any).displayName = `${DISPLAYNAME_PREFIX}.HTMLSelect`;
