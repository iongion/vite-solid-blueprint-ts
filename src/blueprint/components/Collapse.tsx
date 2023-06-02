import classNames from "classnames";
import { mergeProps, splitProps } from "solid-js";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Props } from "@blueprint/core";

interface ICollapseProps extends Props {
  isOpen?: boolean;
  keepChildrenMounted?: boolean;
}

export type CollapseProps = ICollapseProps;

export const Collapse: Component<CollapseProps> = (userProps: CollapseProps) => {
  const [props, htmlProps] = splitProps(
    mergeProps(
      {
        isOpen: false,
        keepChildrenMounted: false,
      },
      userProps
    ),
    [
      // props list
      "isOpen",
      "keepChildrenMounted",
      "children",
      "disabled",
      "class",
    ]
  );
  return (
    <div
      class={classNames(
        Classes.COLLAPSE,
        // from props
        {
          [Classes.COLLAPSE_OPEN]: props.isOpen,
          [Classes.COLLAPSE_CLOSE]: !props.isOpen,
          [Classes.DISABLED]: !props.disabled,
        },
        props.class
      )}
      {...htmlProps}
    >
      {props.isOpen ? props.children : props.keepChildrenMounted ? props.children : undefined}
    </div>
  );
};
(Collapse as any).displayName = `${DISPLAYNAME_PREFIX}.Collapse`;
