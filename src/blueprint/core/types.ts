import type { Component } from "solid-js";

export type UIComponent<P extends Record<string, any> = {}> = Component<P> & { displayName?: string };
