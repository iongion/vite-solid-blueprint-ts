import classNames from "classnames";
import { mergeProps, splitProps, children } from "solid-js";
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
  ]);
  const createChildren = children(() => props.children);
  return (
    <div
      class={classNames(
        Classes.CARD,
        { [Classes.INTERACTIVE]: props.interactive },
        elevationClass(props.elevation),
        // user
        props.class
      )}
      {...htmlProps}
    >
      {createChildren()}
    </div>
  );
};
(Card as any).displayName = `${DISPLAYNAME_PREFIX}.Card`;
