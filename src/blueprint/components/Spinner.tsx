import classNames from "classnames";
import { mergeProps, splitProps, createMemo } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Props, IntentProps, intentClass, clamp } from "@blueprint/core";

const R = 45;
const SPINNER_TRACK = `M 50,50 m 0,-${R} a ${R},${R} 0 1 1 0,${R * 2} a ${R},${R} 0 1 1 0,-${R * 2}`;
const PATH_LENGTH = 280;
const MIN_SIZE = 10;
const STROKE_WIDTH = 4;
const MIN_STROKE_WIDTH = 16;

export enum SpinnerSize {
  SMALL = 20,
  STANDARD = 50,
  LARGE = 100,
}
interface ISpinnerProps extends IntentProps, Omit<Props, "children"> {
  tagName?: string | null;
  size?: number | null;
  value?: number | null;
}

export type SpinnerProps = ISpinnerProps;
export const SpinnerPropsDefaults: SpinnerProps = {
  tagName: "div",
  size: 50,
  value: null,
};

export function getViewBox(strokeWidth: number) {
  const radius = R + strokeWidth / 2;
  const viewBoxX = (50 - radius).toFixed(2);
  const viewBoxWidth = (radius * 2).toFixed(2);
  return `${viewBoxX} ${viewBoxX} ${viewBoxWidth} ${viewBoxWidth}`;
}

export const Spinner: Component<SpinnerProps> = (userProps: SpinnerProps) => {
  const [props, htmlProps] = splitProps(mergeProps(SpinnerPropsDefaults, userProps), [
    // props list
    "intent",
    "tagName",
    "value",
    "size",
    "class",
    "disabled",
  ]);
  const percent = createMemo(() => {
    const value = props.value == null || props.value === undefined ? undefined : props.value * 100;
    return value;
  });
  const getSize = createMemo(() => {
    if (props.size == null) {
      // allow Classes constants to determine default size.
      if ((props.class || "").indexOf(Classes.SMALL) >= 0) {
        return SpinnerSize.SMALL;
      } else if ((props.class || "").indexOf(Classes.LARGE) >= 0) {
        return SpinnerSize.LARGE;
      }
      return SpinnerSize.STANDARD;
    }
    return Math.max(MIN_SIZE, props.size);
  });
  const strokeWidth = createMemo(() => {
    return Math.min(MIN_STROKE_WIDTH, (STROKE_WIDTH * SpinnerSize.LARGE) / getSize());
  });
  const strokeOffset = createMemo(() => {
    const value = PATH_LENGTH - PATH_LENGTH * (props.value == null ? 0.25 : clamp(props.value, 0, 1));
    return value;
  });
  return (
    <Dynamic
      component={props.tagName || "div"}
      role="progressbar"
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={percent() || 0}
      class={classNames(
        Classes.SPINNER,
        intentClass(props.intent),
        {
          // from props
          [Classes.SPINNER_NO_SPIN]: props.value !== null && props.value != undefined,
          [Classes.DISABLED]: !!props.disabled,
        },
        // user
        props.class
      )}
      {...htmlProps}
    >
      <Dynamic component={props.tagName || "div"} class={Classes.SPINNER_ANIMATION}>
        <svg xmlns="http://www.w3.org/2000/svg" width={getSize()} height={getSize()} stroke-width={strokeWidth().toFixed(2)} viewBox={getViewBox(strokeWidth())}>
          <path class={Classes.SPINNER_TRACK} d={SPINNER_TRACK} />
          <path class={Classes.SPINNER_HEAD} d={SPINNER_TRACK} pathLength={PATH_LENGTH} stroke-dasharray={`${PATH_LENGTH} ${PATH_LENGTH}`} stroke-dashoffset={strokeOffset()} />
        </svg>
      </Dynamic>
    </Dynamic>
  );
};
(Spinner as any).displayName = `${DISPLAYNAME_PREFIX}.Spinner`;
