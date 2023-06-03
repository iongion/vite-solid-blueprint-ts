import classNames from "classnames";
import { mergeProps, splitProps, children, createMemo } from "solid-js";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Elevation, Props, ElevationProps, InteractiveProps, elevationClass } from "@blueprint/core";

interface ICardProps extends ElevationProps, InteractiveProps, Props {}

export type CardProps = ICardProps;
export const CardPropsDefaults: CardProps = {
  elevation: Elevation.ONE,
  interactive: true,
};

export const Card: Component<CardProps> = (userProps: CardProps) => {
  const [props, htmlProps] = splitProps(mergeProps(CardPropsDefaults, userProps), [
    // props list
    "elevation",
    "interactive",
    "children",
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      Classes.CARD,
      {
        // from props
        [Classes.INTERACTIVE]: !!props.interactive,
        [Classes.DISABLED]: !!props.disabled,
      },
      elevationClass(props.elevation),
      // user
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
      {createChildren()}
    </div>
  );
};
(Card as any).displayName = `${DISPLAYNAME_PREFIX}.Card`;
