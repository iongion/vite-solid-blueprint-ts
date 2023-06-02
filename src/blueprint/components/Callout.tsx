import classNames from "classnames";
import { mergeProps, splitProps, createMemo } from "solid-js";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Intent, MaybeElement, IntentProps, Props, intentClass } from "@blueprint/core";
import { IconName } from "@blueprint/icons";

interface ICalloutProps extends IntentProps, Props {
  icon?: IconName | MaybeElement;
  title?: string | MaybeElement;
}

export type CalloutProps = ICalloutProps;
export const CalloutPropsDefaults: CalloutProps = {
  icon: IconName.SEARCH,
  title: undefined,
  intent: Intent.NONE,
};

export const Callout: Component<CalloutProps> = (userProps: CalloutProps) => {
  const props = mergeProps(CalloutPropsDefaults, userProps);
  const [local, htmlProps] = splitProps(props, [
    // props list
    "intent",
    "icon",
    "title",
    "children",
    "class",
  ]);
  const createIcon = createMemo(() => {
    return local.icon ? <Icon icon={local.icon} /> : undefined;
  });
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
      {createIcon()}
      {local.children}
    </div>
  );
};
(Callout as any).displayName = `${DISPLAYNAME_PREFIX}.Callout`;
