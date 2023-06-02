import classNames from "classnames";
import { mergeProps, splitProps } from "solid-js";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Intent, MaybeElement, IntentProps, Props, intentClass } from "@blueprint/core";
import { IconName } from "@blueprint/icons";

interface ICalloutProps extends IntentProps, Props {
  icon?: IconName | MaybeElement;
  title?: string | MaybeElement;
}

export type CalloutProps = ICalloutProps;

export const Callout: Component<CalloutProps> = (userProps: CalloutProps) => {
  const props = mergeProps(
    {
      intent: Intent.NONE,
    },
    userProps
  );
  const [local, htmlProps] = splitProps(props, [
    // props list
    "intent",
    "icon",
    "title",
    "children",
    "class",
  ]);
  return (
    <div
      class={classNames(
        Classes.CALLOUT,
        {
          [Classes.CALLOUT_ICON]: !!local.icon,
        },
        intentClass(local.intent),
        // user
        local.class
      )}
      {...htmlProps}
    >
      {local.children}
    </div>
  );
};
(Callout as any).displayName = `${DISPLAYNAME_PREFIX}.Callout`;
