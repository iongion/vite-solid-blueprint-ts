import type { JSX } from "solid-js";

import { Alignment } from "./alignment";
import { Elevation } from "./elevation";
import { Intent } from "./intent";
import { Layout } from "./layout";

export type MaybeElement = JSX.Element | false | null | undefined;

export type Props = {
  disabled?: boolean;
  class?: string;
  children?: MaybeElement | any;
};

export type AlignmentProps = {
  alignment?: Alignment | null;
};
export type ElevationProps = {
  elevation?: Elevation | null;
};
export type InteractiveProps = {
  interactive?: boolean;
};
export type IntentProps = {
  intent?: Intent | null;
};
export type LayoutProps = {
  layout?: Layout | null;
};

export interface IOptionProps extends Props {
  disabled?: boolean;
  label?: string;
  value: string | number;
}
export type OptionProps = IOptionProps;

export const DISPLAYNAME_PREFIX = "Blueprint4";
