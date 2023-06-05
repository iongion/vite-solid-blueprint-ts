import classNames from "classnames";
import { JSX, mergeProps, splitProps, createMemo, children } from "solid-js";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Intent, InteractiveProps, IntentProps, Props, MaybeElement } from "@blueprint/core";
import { Text } from "@blueprint/components";
import { isIcon, Icon, IconName } from "@blueprint/icons";

interface ITagProps extends Omit<JSX.SelectHTMLAttributes<HTMLSpanElement>, "children">, InteractiveProps, IntentProps, Props {
  active?: boolean;
  fill?: boolean;
  icon?: IconName;
  inline?: boolean;
  large?: boolean;
  small?: boolean;
  minimal?: boolean;
  multiline?: boolean;
  round?: boolean;
  placeholder?: string;
  tagName?: string;
  type?: string;
  inputClassName?: string;
  leftElement?: MaybeElement;
  rightIcon?: IconName | MaybeElement;
  htmlTitle?: string;
  tabIndex?: number;
  // events
  onClick?: (e: MouseEvent) => void;
  onRemove?: (e: MouseEvent) => void;
}
export type TagProps = ITagProps;
export const TagPropsSchemaDefaults: TagProps = {
  active: false,
  fill: false,
  icon: undefined,
  inline: false,
  large: false,
  small: false,
  minimal: false,
  multiline: false,
  round: false,
  rightIcon: undefined,
  htmlTitle: undefined,
  intent: Intent.NONE,
  interactive: false,
  tabIndex: undefined,
};
export const Tag: Component<TagProps> = (userProps: TagProps) => {
  const [props, htmlProps] = splitProps(mergeProps(TagPropsSchemaDefaults, userProps), [
    // props list
    "active",
    "fill",
    "icon",
    "inline",
    "large",
    "small",
    "minimal",
    "multiline",
    "round",
    "rightIcon",
    "htmlTitle",
    "intent",
    "interactive",
    "tabIndex",
    "onClick",
    "onRemove",
    "children",
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      // default
      Classes.TAG,
      {
        // from props
        [Classes.ACTIVE]: !!props.active,
        [Classes.FILL]: !!props.fill,
        [Classes.INTERACTIVE]: !!props.interactive,
        [Classes.LARGE]: !!props.large,
        [Classes.MINIMAL]: !!props.minimal,
        [Classes.SMALL]: !!props.small,
        [Classes.ROUND]: !!props.round,
        [Classes.DISABLED]: !!props.disabled,
      },
      Classes.intentClass(props.intent),
      // user
      props.class
    )
  );
  const createIcon = createMemo(() => {
    return isIcon(props.icon) ? <Icon icon={props.icon as IconName} /> : props.icon;
  });
  const createRightIcon = createMemo(() => {
    return isIcon(props.rightIcon) ? <Icon icon={props.rightIcon as IconName} /> : props.rightIcon;
  });
  const createChildren = children(() => {
    return props.children ? (
      <Text className={Classes.FILL} ellipsize={!props.multiline} tagName="span" title={props.htmlTitle}>
        {props.children}
      </Text>
    ) : undefined;
  });
  const createRemoveButton = createMemo(() => {
    return <></>;
  });
  return (
    <span
      // props
      {...htmlProps}
      class={createClassList()}
      tabIndex={props.interactive ? props.tabIndex : undefined}
    >
      {createIcon()}
      {createChildren()}
      {createRightIcon()}
      {createRemoveButton()}
    </span>
  );
};
(Tag as any).displayName = `${DISPLAYNAME_PREFIX}.Tag`;
