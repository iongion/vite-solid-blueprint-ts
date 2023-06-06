import classNames from "classnames";
import { mergeProps, splitProps, createMemo, children } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Layout, LayoutProps, MaybeElement, Props } from "@blueprint/core";
import type { UIComponent } from "@blueprint/core";
import { H4 } from "@blueprint/components";
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
  iconSize?: NonIdealStateIconSize | number;
  icon?: IconName | null;
  action?: MaybeElement;
}
export type NonIdealStateProps = INonIdealStateProps;
export const NonIdealStatePropsDefaults: NonIdealStateProps = {
  iconSize: NonIdealStateIconSize.STANDARD,
  layout: Layout.VERTICAL,
};
export const NonIdealState: UIComponent<NonIdealStateProps> = (userProps: NonIdealStateProps) => {
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
    "disabled",
  ]);
  const createStyle = createMemo(() => {
    return `font-size: ${props.iconSize}px; line-height: ${props.iconSize}px`;
  });
  const renderIcon = createMemo(() => {
    return props.icon ? <Icon icon={props.icon} size={props.iconSize} /> : undefined;
  });
  const renderVisual = createMemo(() => {
    return (
      <div class={Classes.NON_IDEAL_STATE_VISUAL} style={createStyle()}>
        {renderIcon()}
      </div>
    );
  });
  const renderTitle = createMemo(() => {
    return props.title ? <H4>{props.title}</H4> : undefined;
  });
  const renderDescription = createMemo(() => {
    return props.description ? <div>{props.description}</div> : undefined;
  });
  const renderText = createMemo(() => {
    return (
      <div class={Classes.NON_IDEAL_STATE_TEXT}>
        {renderTitle()}
        {renderDescription()}
      </div>
    );
  });
  const renderAction = createMemo(() => {
    return props.action ? props.action : undefined;
  });
  const createClassList = createMemo(() =>
    classNames(
      Classes.NON_IDEAL_STATE,
      {
        // from props
        [Classes.DISABLED]: !!props.disabled,
      },
      props.class
    )
  );
  const createChildren = children(() => props.children);
  return (
    <div
      // props
      class={createClassList()}
      {...htmlProps}
    >
      {renderVisual()}
      {renderText()}
      {createChildren()}
      {renderAction()}
    </div>
  );
};
NonIdealState.displayName = `${DISPLAYNAME_PREFIX}.NonIdealState`;
