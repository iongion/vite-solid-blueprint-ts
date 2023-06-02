import { JSX } from "solid-js";

import type { IconName } from "@blueprint/icons";
import type { MaybeElement } from "@blueprint/core";

export interface ActionProps<T extends HTMLElement = HTMLElement> {
  icon?: IconName | MaybeElement;
  text?: string | MaybeElement;
  onClick?: JSX.EventHandlerUnion<T, MouseEvent>;
}
