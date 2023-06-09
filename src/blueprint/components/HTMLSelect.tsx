import classNames from "classnames";
import { JSX, mergeProps, splitProps, children, createMemo } from "solid-js";
import { Key } from "@solid-primitives/keyed";

import { DISPLAYNAME_PREFIX, Classes, OptionProps, Props } from "@blueprint/core";
import type { UIComponent } from "@blueprint/core";
import { Icon, IconName, IconProps } from "@blueprint/icons";

import "./HTMLSelect.css";

interface IHTMLSelectProps extends Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, "children">, Props {
  fill?: boolean;
  large?: boolean;
  minimal?: boolean;
  multiple?: boolean;
  iconName?: IconName;
  iconProps?: IconProps;
  value?: string | number;
  options?: ReadonlyArray<string | number | OptionProps>;
  dataProvider?: OptionProps[] | (() => OptionProps[]);
}
export type HTMLSelectProps = IHTMLSelectProps;
export const HTMLSelectPropsSchemaDefaults: HTMLSelectProps = {
  fill: false,
  large: false,
  minimal: false,
  multiple: false,
  iconName: IconName.DOUBLE_CARET_VERTICAL,
};
export const HTMLSelect: UIComponent<HTMLSelectProps> = (userProps: HTMLSelectProps) => {
  const [props, htmlProps] = splitProps(mergeProps(HTMLSelectPropsSchemaDefaults, userProps), [
    // props list
    "value",
    "fill",
    "large",
    "minimal",
    "multiple",
    "iconName",
    "iconProps",
    "options",
    "dataProvider",
    "children",
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      // default
      Classes.HTML_SELECT,
      {
        // from props
        [Classes.MINIMAL]: !!props.minimal,
        [Classes.LARGE]: !!props.large,
        [Classes.FILL]: !!props.fill,
        [Classes.DISABLED]: !!props.disabled,
      },
      // user
      props.class
    )
  );
  const createIcon = createMemo(() => {
    return props.iconName && !props.multiple ? <Icon icon={props.iconName} {...props.iconProps} /> : undefined;
  });
  const createOptionChildren = children(() => {
    return (
      <Key
        each={props.options || []}
        by={(it) => {
          if (typeof it === "number") return it;
          if (typeof it === "string") return it;
          return it.value;
        }}
      >
        {(optionAccessor) => {
          const option = optionAccessor();
          const optionProps: OptionProps = typeof option === "object" ? option : { value: option };
          return <option {...optionProps} selected={optionProps.value === props.value} />;
        }}
      </Key>
    );
  });
  const createChildren = children(() => props.children);
  const createDataProvider = createMemo(() => {
    if (Array.isArray(props.dataProvider)) {
      return props.dataProvider.map((itemProps) => <option {...itemProps} />);
    } else if (typeof props.dataProvider === "function") {
      return props.dataProvider().map((itemProps) => <option {...itemProps} />);
    }
    return [];
  });
  return (
    <div
      // props
      class={createClassList()}
    >
      <select disabled={props.disabled} value={props.value} multiple={props.multiple} {...htmlProps}>
        {createOptionChildren()}
        {createChildren()}
        {createDataProvider()}
      </select>
      {createIcon()}
    </div>
  );
};
HTMLSelect.displayName = `${DISPLAYNAME_PREFIX}.HTMLSelect`;
