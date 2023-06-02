import classNames from "classnames";
import { mergeProps, splitProps } from "solid-js";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, InteractiveProps, Props } from "@blueprint/core";

interface IH1Props extends Props {}
export type H1Props = IH1Props;
export const H1: Component<H1Props> = (userProps: H1Props) => {
  const [props, htmlProps] = splitProps(userProps, ["children", "class"]);
  return (
    <h1 class={classNames(Classes.HEADING, props.class)} {...htmlProps}>
      {props.children}
    </h1>
  );
};
(H1 as any).displayName = `${DISPLAYNAME_PREFIX}.H1`;

interface IH2Props extends Props {}
export type H2Props = IH2Props;
export const H2: Component<H2Props> = (userProps: H2Props) => {
  const [props, htmlProps] = splitProps(userProps, ["children", "class"]);
  return (
    <h2 class={classNames(Classes.HEADING, props.class)} {...htmlProps}>
      {props.children}
    </h2>
  );
};
(H2 as any).displayName = `${DISPLAYNAME_PREFIX}.H2`;

interface IH3Props extends Props {}
export type H3Props = IH3Props;
export const H3: Component<H3Props> = (userProps: H3Props) => {
  const [props, htmlProps] = splitProps(userProps, ["children", "class"]);
  return (
    <h3 class={classNames(Classes.HEADING, props.class)} {...htmlProps}>
      {props.children}
    </h3>
  );
};
(H3 as any).displayName = `${DISPLAYNAME_PREFIX}.H3`;

interface IH4Props extends Props {}
export type H4Props = IH4Props;
export const H4: Component<H4Props> = (userProps: H4Props) => {
  const [props, htmlProps] = splitProps(userProps, ["children", "class"]);
  return (
    <h4 class={classNames(Classes.HEADING, props.class)} {...htmlProps}>
      {props.children}
    </h4>
  );
};
(H4 as any).displayName = `${DISPLAYNAME_PREFIX}.H4`;

interface IH5Props extends Props {}
export type H5Props = IH5Props;
export const H5: Component<H5Props> = (userProps: H5Props) => {
  const [props, htmlProps] = splitProps(userProps, ["children", "class"]);
  return (
    <h5 class={classNames(Classes.HEADING, props.class)} {...htmlProps}>
      {props.children}
    </h5>
  );
};
(H5 as any).displayName = `${DISPLAYNAME_PREFIX}.H5`;

interface IH6Props extends Props {}
export type H6Props = IH6Props;
export const H6: Component<H6Props> = (userProps: H6Props) => {
  const [props, htmlProps] = splitProps(userProps, ["children", "class"]);
  return (
    <h6 class={classNames(Classes.HEADING, props.class)} {...htmlProps}>
      {props.children}
    </h6>
  );
};
(H6 as any).displayName = `${DISPLAYNAME_PREFIX}.H6`;

interface IBlockquoteProps extends Props {}
export type BlockquoteProps = IBlockquoteProps;
export const Blockquote: Component<BlockquoteProps> = (userProps: BlockquoteProps) => {
  const [props, htmlProps] = splitProps(userProps, ["children", "class"]);
  return (
    <blockquote class={classNames(Classes.BLOCKQUOTE, props.class)} {...htmlProps}>
      {props.children}
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
  return (
    <label class={classNames(Classes.LABEL, props.class)} for={props.for || props.htmlFor} {...htmlProps}>
      {props.children}
    </label>
  );
};
(Label as any).displayName = `${DISPLAYNAME_PREFIX}.Label`;

interface IULProps extends Props {}
export type ULProps = IULProps;
export const UL: Component<ULProps> = (userProps: ULProps) => {
  const [props, htmlProps] = splitProps(userProps, ["children", "class"]);
  return (
    <ul class={classNames(Classes.LIST, props.class)} {...htmlProps}>
      {props.children}
    </ul>
  );
};
(UL as any).displayName = `${DISPLAYNAME_PREFIX}.UL`;

interface IOLProps extends Props {}
export type OLProps = IOLProps;
export const OL: Component<OLProps> = (userProps: OLProps) => {
  const [props, htmlProps] = splitProps(userProps, ["children", "class"]);
  return (
    <ol class={classNames(Classes.LIST, props.class)} {...htmlProps}>
      {props.children}
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
      {props.children}
    </table>
  );
};
(OL as any).displayName = `${DISPLAYNAME_PREFIX}.OL`;
