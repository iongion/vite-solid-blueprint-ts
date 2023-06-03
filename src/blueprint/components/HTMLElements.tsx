import classNames from "classnames";
import { mergeProps, splitProps, children } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, InteractiveProps, Props } from "@blueprint/core";

interface IHeadingProps extends Props {}
export type HeadingProps = IHeadingProps;
export function createHeading<T extends HeadingProps = Props>(tagName: string) {
  function Heading(userProps: T) {
    const [props, htmlProps] = splitProps(userProps, ["children", "class"]);
    const createChildren = children(() => props.children);
    return (
      <Dynamic component={tagName} class={classNames(Classes.HEADING, props.class)} {...htmlProps}>
        {createChildren()}
      </Dynamic>
    );
  }
  Heading.displayName = `${DISPLAYNAME_PREFIX}.${tagName}`;
  return Heading;
}

export const H1 = createHeading<HeadingProps>("h1");
export const H2 = createHeading<HeadingProps>("h2");
export const H3 = createHeading<HeadingProps>("h3");
export const H4 = createHeading<HeadingProps>("h4");
export const H5 = createHeading<HeadingProps>("h5");
export const H6 = createHeading<HeadingProps>("h6");

export type BlockquoteProps = Props;
export const Blockquote: Component<BlockquoteProps> = (userProps: BlockquoteProps) => {
  const [props, htmlProps] = splitProps(userProps, ["children", "class"]);
  const createChildren = children(() => props.children);
  return (
    <blockquote class={classNames(Classes.BLOCKQUOTE, props.class)} {...htmlProps}>
      {createChildren()}
    </blockquote>
  );
};
(Blockquote as any).displayName = `${DISPLAYNAME_PREFIX}.Blockquote`;

interface ILabelProps extends Props {
  for?: string;
  htmlFor?: string;
}
export type LabelProps = ILabelProps;
export const Label: Component<LabelProps> = (userProps: LabelProps) => {
  const [props, htmlProps] = splitProps(userProps, ["for", "htmlFor", "children", "class"]);
  const createChildren = children(() => props.children);
  return (
    <label class={classNames(Classes.LABEL, props.class)} for={props.for || props.htmlFor} {...htmlProps}>
      {createChildren()}
    </label>
  );
};
(Label as any).displayName = `${DISPLAYNAME_PREFIX}.Label`;

interface IULProps extends Props {}
export type ULProps = IULProps;
export const UL: Component<ULProps> = (userProps: ULProps) => {
  const [props, htmlProps] = splitProps(userProps, ["children", "class"]);
  const createChildren = children(() => props.children);
  return (
    <ul class={classNames(Classes.LIST, props.class)} {...htmlProps}>
      {createChildren()}
    </ul>
  );
};
(UL as any).displayName = `${DISPLAYNAME_PREFIX}.UL`;

interface IOLProps extends Props {}
export type OLProps = IOLProps;
export const OL: Component<OLProps> = (userProps: OLProps) => {
  const [props, htmlProps] = splitProps(userProps, ["children", "class"]);
  const createChildren = children(() => props.children);
  return (
    <ol class={classNames(Classes.LIST, props.class)} {...htmlProps}>
      {createChildren()}
    </ol>
  );
};
(OL as any).displayName = `${DISPLAYNAME_PREFIX}.OL`;

interface IHTMLTableProps extends InteractiveProps, Props {
  bordered?: boolean | null;
  compact?: boolean | null;
  condensed?: boolean | null;
  striped?: boolean | null;
}
export type HTMLTableProps = IHTMLTableProps;
export const HTMLTablePropsSchemaDefaults: HTMLTableProps = {
  bordered: false,
  compact: false,
  condensed: false,
  striped: false,
  interactive: false,
};
export const HTMLTable: Component<HTMLTableProps> = (userProps: HTMLTableProps) => {
  const [props, htmlProps] = splitProps(mergeProps(HTMLTablePropsSchemaDefaults, userProps), [
    // props list
    "bordered",
    "compact",
    "condensed",
    "striped",
    "interactive",
    "children",
    "class",
  ]);
  const createChildren = children(() => props.children);
  return (
    <table
      class={classNames(
        // default
        Classes.HTML_TABLE,
        // props
        {
          [Classes.HTML_TABLE_CONDENSED]: props.compact || props.condensed,
          [Classes.HTML_TABLE_BORDERED]: props.bordered,
          [Classes.HTML_TABLE_STRIPED]: props.striped,
          [Classes.INTERACTIVE]: props.interactive,
        },
        // user
        props.class
      )}
      {...htmlProps}
    >
      {createChildren()}
    </table>
  );
};
(OL as any).displayName = `${DISPLAYNAME_PREFIX}.OL`;
