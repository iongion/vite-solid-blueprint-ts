import classNames from "classnames";
import { mergeProps, splitProps } from "solid-js";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Props } from "@blueprint/core";

interface ICodeBlockProps extends Props {}

export type CodeBlockProps = ICodeBlockProps;

export const CodeBlock: Component<CodeBlockProps> = (userProps: CodeBlockProps) => {
  const props = mergeProps({}, userProps);
  const [local, htmlProps] = splitProps(props, [
    // props list
    "children",
    "class",
  ]);
  return (
    <pre class={classNames(Classes.CODE_BLOCK, local.class)} {...htmlProps}>
      {local.children}
    </pre>
  );
};
(CodeBlock as any).displayName = `${DISPLAYNAME_PREFIX}.CodeBlock`;

interface ICodeProps extends Props {}

const defaultCodeProps: ICodeProps = {};

export type CodeProps = ICodeProps;
export const Code: Component<CodeProps> = (userProps: CodeProps) => {
  const props = mergeProps({}, defaultCodeProps, userProps);
  const [local, htmlProps] = splitProps(props, [
    // props list
    "children",
    "class",
  ]);
  return (
    <code class={classNames(Classes.CODE, local.class)} {...htmlProps}>
      {local.children}
    </code>
  );
};
(Code as any).displayName = `${DISPLAYNAME_PREFIX}.Code`;
