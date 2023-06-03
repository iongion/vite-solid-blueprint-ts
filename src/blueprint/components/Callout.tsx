import classNames from "classnames";
import { mergeProps, splitProps, createMemo, children } from "solid-js";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Intent, MaybeElement, IntentProps, Props, intentClass } from "@blueprint/core";
import { Icon, IconName } from "@blueprint/icons";

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
  const [props, htmlProps] = splitProps(mergeProps(CalloutPropsDefaults, userProps), [
    // props list
    "intent",
    "icon",
    "title",
    "children",
    "class",
    "disabled",
  ]);
  const createIcon = createMemo(() => {
    return props.icon ? typeof props.icon === "string" ? <Icon icon={props.icon as IconName} /> : undefined : undefined;
  });
  const createChildren = children(() => props.children);
  return (
    <div
      class={classNames(
        Classes.CALLOUT,
        {
          // from props
          [Classes.CALLOUT_ICON]: !!props.icon,
          [Classes.DISABLED]: props.disabled,
        },
        intentClass(props.intent),
        // user
        props.class
      )}
      {...htmlProps}
    >
      {createIcon()}
      {createChildren()}
    </div>
  );
};
(Callout as any).displayName = `${DISPLAYNAME_PREFIX}.Callout`;
