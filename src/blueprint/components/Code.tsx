import classNames from "classnames";
import { mergeProps, splitProps, children, createMemo } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Props } from "@blueprint/core";
import type { UIComponent } from "@blueprint/core";

interface ICodeBlockProps extends Props {}

export type CodeBlockProps = ICodeBlockProps;

export const CodeBlock: UIComponent<CodeBlockProps> = (userProps: CodeBlockProps) => {
  const [props, htmlProps] = splitProps(mergeProps({}, userProps), [
    // props list
    "children",
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      Classes.CODE_BLOCK,
      {
        // from props
        [Classes.DISABLED]: !!props.disabled,
      },
      props.class
    )
  );
  const createChildren = children(() => props.children);
  return (
    <pre
      // props
      class={createClassList()}
      {...htmlProps}
    >
      {createChildren()}
    </pre>
  );
};
CodeBlock.displayName = `${DISPLAYNAME_PREFIX}.CodeBlock`;

interface ICodeProps extends Props {}

const defaultCodeProps: ICodeProps = {};

export type CodeProps = ICodeProps;
export const Code: UIComponent<CodeProps> = (userProps: CodeProps) => {
  const [props, htmlProps] = splitProps(mergeProps({}, defaultCodeProps, userProps), [
    // props list
    "children",
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      Classes.CODE,
      {
        // from props
        [Classes.DISABLED]: !!props.disabled,
      },
      props.class
    )
  );
  const createChildren = children(() => props.children);
  return (
    <code
      // props
      class={createClassList()}
      {...htmlProps}
    >
      {createChildren()}
    </code>
  );
};
Code.displayName = `${DISPLAYNAME_PREFIX}.Code`;
