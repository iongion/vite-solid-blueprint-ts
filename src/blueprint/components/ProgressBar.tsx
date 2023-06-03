import classNames from "classnames";
import { createMemo, mergeProps, splitProps } from "solid-js";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Intent, IntentProps, Props, clamp } from "@blueprint/core";

interface IProgressBarProps extends IntentProps, Omit<Props, "children"> {
  animate?: boolean;
  stripes?: boolean;
  value?: number | null;
}
export type ProgressBarProps = IProgressBarProps;
export const ProgressBarPropsDefaults: ProgressBarProps = {
  intent: Intent.NONE,
  animate: true,
  stripes: true,
  value: null,
};

export const ProgressBar: Component<ProgressBarProps> = (userProps: ProgressBarProps) => {
  const [props, htmlProps] = splitProps(mergeProps(ProgressBarPropsDefaults, userProps), [
    // props list
    "intent",
    "animate",
    "stripes",
    "value",
    "class",
    "disabled",
  ]);
  const percent = createMemo(() => {
    const value = props.value == null || props.value === undefined ? undefined : 100 * clamp(props.value, 0, 1);
    return value;
  });
  return (
    <div
      role="progressbar"
      aria-valuemax={100}
      aria-valuemin={100}
      aria-valuenow={percent() === undefined ? "" : Math.round(percent() || 0)}
      class={classNames(
        // implicit
        Classes.PROGRESS_BAR,
        Classes.intentClass(props.intent),
        {
          // from props
          [Classes.PROGRESS_NO_ANIMATION]: !props.animate,
          [Classes.PROGRESS_NO_STRIPES]: !props.stripes,
          [Classes.DISABLED]: props.disabled,
        },
        // user
        props.class
      )}
      {...htmlProps}
    >
      <div class={Classes.PROGRESS_METER} style={percent() === undefined ? undefined : `width: ${percent()}%`}></div>
    </div>
  );
};
(ProgressBar as any).displayName = `${DISPLAYNAME_PREFIX}.ProgressBar`;
