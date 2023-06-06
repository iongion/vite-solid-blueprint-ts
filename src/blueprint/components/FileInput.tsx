import classNames from "classnames";
import { JSX, mergeProps, splitProps, createMemo } from "solid-js";

import { DISPLAYNAME_PREFIX, Classes, Intent, IntentProps, Props, MaybeElement } from "@blueprint/core";
import type { UIComponent } from "@blueprint/core";

import "./FileInput.css";

interface IFileInputProps extends Omit<JSX.SelectHTMLAttributes<HTMLLabelElement>, "children">, IntentProps, Omit<Props, "children"> {
  fill?: boolean;
  readOnly?: boolean;
  hasSelection?: boolean;
  inputProps?: Omit<JSX.SelectHTMLAttributes<HTMLInputElement>, "children">;
  large?: boolean;
  small?: boolean;
  round?: boolean;
  text?: MaybeElement;
  buttonText?: string;
  // events
  onInputChange?: JSX.ChangeEventHandler<HTMLInputElement, Event>;
}
export type FileInputProps = IFileInputProps;
export const FileInputPropsSchemaDefaults: FileInputProps = {
  fill: false,
  readOnly: false,
  hasSelection: false,
  inputProps: undefined,
  large: false,
  small: false,
  round: false,
  text: undefined,
  buttonText: undefined,
  intent: Intent.NONE,
  onInputChange: undefined,
};
export const FileInput: UIComponent<FileInputProps> = (userProps: FileInputProps) => {
  const [props, htmlProps] = splitProps(mergeProps(FileInputPropsSchemaDefaults, userProps), [
    // props list
    "fill",
    "readOnly",
    "hasSelection",
    "inputProps",
    "large",
    "small",
    "round",
    "text",
    "buttonText",
    "intent",
    "value",
    "onInputChange",
    "class",
    "disabled",
  ]);
  const createClassList = createMemo(() =>
    classNames(
      // default
      Classes.FILE_INPUT,
      {
        // from props
        [Classes.READ_ONLY]: !!props.readOnly,
        [Classes.FILE_INPUT_HAS_SELECTION]: !!props.hasSelection,
        [Classes.LARGE]: !!props.large,
        [Classes.SMALL]: !!props.small,
        [Classes.ROUND]: !!props.round,
        [Classes.FILL]: !!props.fill,
        [Classes.DISABLED]: !!props.disabled,
      },
      Classes.intentClass(props.intent),
      // user
      props.class
    )
  );
  const createInputElement = createMemo(() => {
    return (
      <input
        // props
        {...props.inputProps}
        type="file"
        disabled={props.disabled}
        readonly={props.readOnly}
        value={props.value || ""}
        onChange={props.onInputChange}
      />
    );
  });
  const createContentElement = createMemo(() => {
    const NS = Classes.getClassNamespace();
    const uploadProps = {
      [`${NS}-button-text`]: props.buttonText,
      class: classNames(Classes.FILE_UPLOAD_INPUT, {
        [Classes.FILE_UPLOAD_INPUT_CUSTOM_TEXT]: !!props.buttonText,
      }),
    };
    return <span {...uploadProps}>{props.text}</span>;
  });
  return (
    <label
      // props
      {...htmlProps}
      class={createClassList()}
    >
      {createInputElement()}
      {createContentElement()}
    </label>
  );
};
FileInput.displayName = `${DISPLAYNAME_PREFIX}.FileInput`;
