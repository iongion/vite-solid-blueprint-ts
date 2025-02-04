import classNames from "classnames";
import { mergeProps, splitProps, children, createMemo } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, InteractiveProps, Props } from "@blueprint/core";
import type { UIComponent } from "@blueprint/core";

interface IHTMLTableProps extends InteractiveProps, Props {
  bordered?: boolean;
  compact?: boolean;
  striped?: boolean;
}
export type HTMLTableProps = IHTMLTableProps;
export const HTMLTablePropsSchemaDefaults: HTMLTableProps = {
  bordered: false,
  compact: false,
  striped: false,
  interactive: false,
};
export const HTMLTable: UIComponent<HTMLTableProps> = (userProps: HTMLTableProps) => {
  const [props, htmlProps] = splitProps(mergeProps(HTMLTablePropsSchemaDefaults, userProps), [
    // props list
    "bordered",
    "compact",
    "striped",
    "interactive",
    "children",
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      // default
      Classes.HTML_TABLE,
      {
        // from props
        [Classes.COMPACT]: props.compact,
        [Classes.HTML_TABLE_BORDERED]: !!props.bordered,
        [Classes.HTML_TABLE_STRIPED]: !!props.striped,
        [Classes.INTERACTIVE]: !!props.interactive,
        [Classes.DISABLED]: !!props.disabled,
      },
      // user
      props.class
    )
  );
  const createChildren = children(() => props.children);
  return (
    <table
      // props
      class={createClassList()}
      {...htmlProps}
    >
      {createChildren()}
    </table>
  );
};
HTMLTable.displayName = `${DISPLAYNAME_PREFIX}.HTMLTable`;
