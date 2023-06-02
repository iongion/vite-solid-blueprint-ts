import classNames from "classnames";
import { mergeProps, splitProps } from "solid-js";
import type { Component } from "solid-js";

import { H4 } from "@blueprint/components";
import { DISPLAYNAME_PREFIX, Classes, Layout, LayoutProps, MaybeElement, Props } from "@blueprint/core";
import { Icon, IconName, IconSize } from "@blueprint/icons";

export enum NonIdealStateIconSize {
  STANDARD = IconSize.STANDARD * 3,
  SMALL = IconSize.STANDARD * 2,
  EXTRA_SMALL = IconSize.LARGE,
}

interface INonIdealStateProps extends LayoutProps, Props {
  title?: string | MaybeElement;
  text?: string | MaybeElement;
  description?: string | MaybeElement;
  iconSize?: NonIdealStateIconSize;
  icon?: IconName | null;
  action?: MaybeElement;
}
export type NonIdealStateProps = INonIdealStateProps;
export const NonIdealStatePropsDefaults: NonIdealStateProps = {
  iconSize: NonIdealStateIconSize.STANDARD,
  layout: Layout.VERTICAL,
};
export const NonIdealState: Component<NonIdealStateProps> = (userProps: NonIdealStateProps) => {
  const [props, htmlProps] = splitProps(mergeProps(NonIdealStatePropsDefaults, userProps), [
    // props list
    "title",
    "text",
    "description",
    "iconSize",
    "icon",
    "action",
    "children",
    "class",
  ]);
  const renderVisual = () => {
    const renderIcon = () => {
      return props.icon ? <Icon icon={props.icon} /> : undefined;
    };
    return (
      <div class={Classes.NON_IDEAL_STATE_VISUAL} style={`font-size: ${props.iconSize}px; line-height: ${props.iconSize}px`}>
        {renderIcon()}
      </div>
    );
  };
  const renderText = () => {
    const renderTitle = () => {
      return props.title ? <H4>{props.title}</H4> : undefined;
    };
    const renderDescription = () => {
      return props.description ? <div>{props.description}</div> : undefined;
    };
    return (
      <div class={Classes.NON_IDEAL_STATE_TEXT}>
        {renderTitle()}
        {renderDescription()}
      </div>
    );
  };
  const renderAction = () => {
    return props.action ? props.action : undefined;
  };
  return (
    <div class={classNames(Classes.NON_IDEAL_STATE, props.class)} {...htmlProps}>
      {renderVisual()}
      {renderText()}
      {props.children}
      {renderAction()}
    </div>
  );
};
(NonIdealState as any).displayName = `${DISPLAYNAME_PREFIX}.NonIdealState`;
