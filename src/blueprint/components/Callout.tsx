import classNames from "classnames";
import { mergeProps, splitProps, createMemo, children } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Intent, MaybeElement, IntentProps, Props, intentClass } from "@blueprint/core";
import { H5 } from "@blueprint/components";
import type { UIComponent } from "@blueprint/core";
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

export const Callout: UIComponent<CalloutProps> = (userProps: CalloutProps) => {
  const [props, htmlProps] = splitProps(mergeProps(CalloutPropsDefaults, userProps), [
    // props list
    "intent",
    "icon",
    "title",
    "children",
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      Classes.CALLOUT,
      {
        // from props
        [Classes.CALLOUT_ICON]: props.icon,
        [Classes.DISABLED]: !!props.disabled,
      },
      intentClass(props.intent),
      // user
      props.class
    )
  );
  const createIcon = createMemo(() => {
    return props.icon ? typeof props.icon === "string" ? <Icon icon={props.icon as IconName} /> : undefined : undefined;
  });
  const createTitle = createMemo(() => {
    return props.title ? <H5>{props.title}</H5> : undefined;
  });
  const createChildren = children(() => props.children);
  return (
    <div
      // props
      class={createClassList()}
      {...htmlProps}
    >
      {createIcon()}
      {createTitle()}
      {createChildren()}
    </div>
  );
};
Callout.displayName = `${DISPLAYNAME_PREFIX}.Callout`;
