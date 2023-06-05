import classNames from "classnames";
import { JSX, mergeProps, splitProps, createMemo, createSignal, createEffect } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { Component } from "solid-js";

import { DISPLAYNAME_PREFIX, MaybeElement, Classes, Props } from "@blueprint/core";

interface ITextProps extends Omit<JSX.SelectHTMLAttributes<HTMLElement>, "children" | "title">, Props {
  tagName?: string | null;
  ellipsize?: boolean;
  title?: string | MaybeElement;
}

export type TextProps = ITextProps;
export const TextPropsDefaults: TextProps = {
  tagName: "div",
  ellipsize: false,
  title: undefined,
};

export const Text: Component<TextProps> = (userProps: TextProps) => {
  const [textContent, setTextContent] = createSignal("");
  const [isContentOverflowing, setIsContentOverflowing] = createSignal(false);
  const [props, htmlProps] = splitProps(mergeProps(TextPropsDefaults, userProps), [
    // props list
    "tagName",
    "ellipsize",
    "title",
    "class",
    "disabled",
  ]);
  const createTitle = createMemo(() => {
    if (isContentOverflowing()) {
      return textContent();
    }
    return props.title;
  });
  const createClassList = createMemo(() =>
    classNames(
      {
        // from props
        [Classes.TEXT_OVERFLOW_ELLIPSIS]: !!props.ellipsize,
      },
      // user
      props.class
    )
  );
  let textRef;
  createEffect(() => {
    if (textRef) {
      setIsContentOverflowing(props.ellipsize! && textRef.scrollWidth > textRef.clientWidth);
      setTextContent(textRef.textContent);
    }
  });
  return (
    <Dynamic
      // props
      component={props.tagName || "div"}
      class={createClassList()}
      title={createTitle()}
      ref={(ref) => (textRef = ref)}
      {...htmlProps}
    />
  );
};
(Text as any).displayName = `${DISPLAYNAME_PREFIX}.Text`;
