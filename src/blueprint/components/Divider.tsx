import classNames from "classnames";
import { mergeProps, splitProps, createMemo } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Props } from "@blueprint/core";

interface IDividerProps extends Omit<Props, "children"> {
  tagName?: string | null;
}

export type DividerProps = IDividerProps;
export const DividerPropsDefaults: DividerProps = {
  tagName: "div",
};

export const Divider: Component<DividerProps> = (userProps: DividerProps) => {
  const [props, htmlProps] = splitProps(mergeProps(DividerPropsDefaults, userProps), [
    // props list
    "tagName",
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      Classes.DIVIDER,
      {
        // from props
        [Classes.DISABLED]: !!props.disabled,
      },
      // user
      props.class
    )
  );
  return (
    <Dynamic
      // props
      component={props.tagName || "div"}
      class={createClassList()}
      {...htmlProps}
    />
  );
};
(Divider as any).displayName = `${DISPLAYNAME_PREFIX}.Divider`;
