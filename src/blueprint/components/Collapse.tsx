import classNames from "classnames";
import { mergeProps, splitProps, children, createMemo } from "solid-js";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Props } from "@blueprint/core";

interface ICollapseProps extends Props {
  isOpen?: boolean;
  keepChildrenMounted?: boolean;
}

export type CollapseProps = ICollapseProps;
export const CollapsePropsDefaults: CollapseProps = {
  isOpen: false,
  keepChildrenMounted: false,
};

export const Collapse: Component<CollapseProps> = (userProps: CollapseProps) => {
  const [props, htmlProps] = splitProps(mergeProps(CollapsePropsDefaults, userProps), [
    // props list
    "isOpen",
    "keepChildrenMounted",
    "children",
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      Classes.COLLAPSE,
      {
        // from props
        [Classes.COLLAPSE_OPEN]: !!props.isOpen,
        [Classes.COLLAPSE_CLOSE]: !!!props.isOpen,
        [Classes.DISABLED]: !!props.disabled,
      },
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
      {props.isOpen ? createChildren() : props.keepChildrenMounted ? createChildren() : undefined}
    </div>
  );
};
(Collapse as any).displayName = `${DISPLAYNAME_PREFIX}.Collapse`;
