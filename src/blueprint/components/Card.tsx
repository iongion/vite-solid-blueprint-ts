import classNames from "classnames";
import { mergeProps, splitProps } from "solid-js";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Elevation, Props, ElevationProps, InteractiveProps, elevationClass } from "@blueprint/core";

interface ICardProps extends ElevationProps, InteractiveProps, Props {}

export type CardProps = ICardProps;
export const CardPropsDefaults: CardProps = {
  elevation: Elevation.ONE,
  interactive: true,
};

export const Card: Component<CardProps> = (userProps: CardProps) => {
  const props = mergeProps(CardPropsDefaults, userProps);
  const [local, htmlProps] = splitProps(props, [
    // props list
    "elevation",
    "interactive",
    "children",
    "class",
  ]);
  return (
    <div
      class={classNames(
        Classes.CARD,
        { [Classes.INTERACTIVE]: local.interactive },
        elevationClass(local.elevation),
        // user
        local.class
      )}
      {...htmlProps}
    >
      {local.children}
    </div>
  );
};
(Card as any).displayName = `${DISPLAYNAME_PREFIX}.Card`;
