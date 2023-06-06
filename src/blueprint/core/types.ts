import type { JSX, Component } from "solid-js";

export type UIComponent<P = {}> = Component<P> & { displayName?: string };
