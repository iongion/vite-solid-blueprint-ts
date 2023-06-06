import type { JSX } from "solid-js";

import { UIComponent } from "./types";

export const clamp = (value: number, min?: number, max?: number): number => {
  if (min != null && value < min) {
    value = min;
  }
  if (max != null && value > max) {
    value = max;
  }
  return value;
};

export function isElementOfType<P = {}>(element: any, ComponentType: UIComponent<P>): element is JSX.Element {
  return element != null && element.type != null && element.type.displayName != null && element.type.displayName === ComponentType.displayName;
}
