import classNames from "classnames";
import { mergeProps, splitProps, createMemo } from "solid-js";
import { Dynamic } from "solid-js/web";

import { DISPLAYNAME_PREFIX, Classes, Layout, LayoutProps, Props } from "@blueprint/core";
import type { UIComponent } from "@blueprint/core";

interface IDividerProps extends LayoutProps, Omit<Props, "children"> {
  tagName?: string | null;
}

export type DividerProps = IDividerProps;
export const DividerPropsDefaults: DividerProps = {
  tagName: "div",
};

export const Divider: UIComponent<DividerProps> = (userProps: DividerProps) => {
  const [props, htmlProps] = splitProps(mergeProps(DividerPropsDefaults, userProps), [
    // props list
    "tagName",
    "layout",
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      Classes.DIVIDER,
      {
        // from props
        [Classes.VERTICAL]: props.layout === Layout.VERTICAL,
        [Classes.HORIZONTAL]: props.layout === Layout.HORIZONTAL,
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
Divider.displayName = `${DISPLAYNAME_PREFIX}.Divider`;
