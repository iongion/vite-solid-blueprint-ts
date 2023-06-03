import { JSX } from "solid-js";

import type { IconName } from "@blueprint/icons";
import type { Props, IntentProps, MaybeElement } from "@blueprint/core";

export interface ActionProps<T extends HTMLElement> extends IntentProps, Props {
  icon?: IconName | MaybeElement;
  text?: string | MaybeElement;
  onClick?: JSX.EventHandlerUnion<T, MouseEvent>;
  onFocus?: JSX.EventHandlerUnion<T, FocusEvent>;
  tabIndex?: number;
}

export type LinkProps = {
  href?: string;
  target?: string;
};
