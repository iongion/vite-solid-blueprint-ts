import classNames from "classnames";
import { splitProps, children, createMemo } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Props } from "@blueprint/core";

// Generic heading
interface IHeadingProps extends Props {}
export type HeadingProps = IHeadingProps;
export function createHeading(tagName: string) {
  const Heading: Component<HeadingProps> = (userProps) => {
    const [props, htmlProps] = splitProps(userProps, ["children", "class", "disabled"]);
    const createClassList = createMemo(() =>
      classNames(
        Classes.HEADING,
        {
          // from props
          [Classes.DISABLED]: !!props.disabled,
        },
        props.class
      )
    );
    const createChildren = children(() => props.children);
    return (
      <Dynamic
        // props
        component={tagName}
        class={createClassList()}
        {...htmlProps}
      >
        {createChildren()}
      </Dynamic>
    );
  };
  (Heading as any).displayName = `${DISPLAYNAME_PREFIX}.${tagName}`;
  return Heading;
}

// Generic list
interface IListProps extends Props {}
export type ListProps = IListProps;
export function createList(tagName: string) {
  const List: Component<ListProps> = (userProps) => {
    const [props, htmlProps] = splitProps(userProps, ["children", "class", "disabled"]);
    const createClassList = createMemo(() =>
      classNames(
        Classes.LIST,
        {
          // from props
          [Classes.DISABLED]: !!props.disabled,
        },
        props.class
      )
    );
    const createChildren = children(() => props.children);
    return (
      <Dynamic
        // props
        component={tagName}
        class={createClassList()}
        {...htmlProps}
      >
        {createChildren()}
      </Dynamic>
    );
  };
  (List as any).displayName = `${DISPLAYNAME_PREFIX}.${tagName}`;
  return List;
}

export const H1 = createHeading("h1");
export const H2 = createHeading("h2");
export const H3 = createHeading("h3");
export const H4 = createHeading("h4");
export const H5 = createHeading("h5");
export const H6 = createHeading("h6");

export type BlockquoteProps = Props;
export const Blockquote: Component<BlockquoteProps> = (userProps: BlockquoteProps) => {
  const [props, htmlProps] = splitProps(userProps, ["children", "class", "disabled"]);
  const createClassList = createMemo(() =>
    classNames(
      Classes.BLOCKQUOTE,
      {
        // from props
        [Classes.DISABLED]: !!props.disabled,
      },
      props.class
    )
  );
  const createChildren = children(() => props.children);
  return (
    <blockquote
      // props
      class={createClassList()}
      {...htmlProps}
    >
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
  const [props, htmlProps] = splitProps(userProps, ["for", "htmlFor", "children", "class", "disabled"]);
  const createClassList = createMemo(() =>
    classNames(
      Classes.LABEL,
      {
        // from props
        [Classes.DISABLED]: !!props.disabled,
      },
      props.class
    )
  );
  const createChildren = children(() => props.children);
  return (
    <label
      // props
      class={createClassList()}
      for={props.for || props.htmlFor}
      {...htmlProps}
    >
      {createChildren()}
    </label>
  );
};
(Label as any).displayName = `${DISPLAYNAME_PREFIX}.Label`;

export type ULProps = Props;
export const UL: Component<ULProps> = createList("ul");

export type OLProps = Props;
export const OL: Component<OLProps> = createList("ol");
