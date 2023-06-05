import { JSX } from "solid-js";
import * as y from "yup";

import { IconName } from "@blueprint/icons";
import { Props, Alignment, Elevation, Intent, Layout } from "@blueprint/core";
import {
  ButtonType,
  AnchorButtonProps,
  ButtonProps,
  ButtonGroupProps,
  CalloutProps,
  CardProps,
  CollapseProps,
  DividerProps,
  // HTMLSelectProps,
  HTMLTableProps,
  MenuProps,
  NavbarProps,
  NonIdealStateIconSize,
  NonIdealStatePropsDefaults,
  NonIdealStateProps,
  ProgressBarProps,
  SpinnerProps,
  SpinnerSize,
  // SwitchProps,
} from "@blueprint/components";
import { IconsList, IconSize, IconProps } from "@blueprint/icons";

export const PropsSchema: y.ObjectSchema<Omit<Props, "children">> = y.object({
  disabled: y.boolean().default(false),
  class: y.string().optional(),
});

export const AlignmentSchema = y
  .string<Alignment>()
  .oneOf([
    // enum
    Alignment.LEFT,
    Alignment.CENTER,
    Alignment.RIGHT,
  ])
  .optional();

export const AlignmentPropsSchema = y.object({
  alignment: AlignmentSchema,
});

export const ElevationSchema = y
  .number<Elevation>()
  .oneOf([
    // enum
    Elevation.ZERO,
    Elevation.ONE,
    Elevation.TWO,
    Elevation.THREE,
    Elevation.FOUR,
  ])
  .optional();
export const ElevationPropsSchema = y.object({
  elevation: ElevationSchema,
});

export const LayouSchema = y
  .string<Layout>()
  .oneOf([
    // enum
    Layout.VERTICAL,
    Layout.HORIZONTAL,
  ])
  .optional();
export const LayoutPropsSchema = y.object({
  layout: LayouSchema,
});

const IconSchema = y
  .string<IconName>()
  .oneOf(IconsList as IconName[])
  .defined();

const IconSizeSchema = y.number<IconSize>().oneOf([
  //
  IconSize.STANDARD,
  IconSize.LARGE,
  IconSize.XLARGE,
  IconSize.XXLARGE,
]);

const NonIdealStateIconSizeSchema = y.number<NonIdealStateIconSize>().oneOf([
  //
  NonIdealStateIconSize.STANDARD,
  NonIdealStateIconSize.SMALL,
  NonIdealStateIconSize.EXTRA_SMALL,
]);

export const IconPropsSchema: y.ObjectSchema<Omit<IconProps, "children">> = y
  .object({
    icon: IconSchema.default(IconName.HAND_RIGHT as any),
    size: IconSizeSchema.default(IconSize.STANDARD),
  })
  .concat(PropsSchema);

const IntentSchema = y
  .string<Intent>()
  .oneOf([
    // enum
    Intent.NONE,
    Intent.PRIMARY,
    Intent.SUCCESS,
    Intent.DANGER,
    Intent.WARNING,
  ])
  .optional();
export const IntentPropsSchema = y.object({
  intent: IntentSchema,
});

const InteractiveSchema = y.boolean().default(false);
export const InteractivePropsSchema = y.object({
  interactive: InteractiveSchema,
});

// Components
export const ButtonPropsSchema: y.ObjectSchema<Omit<ButtonProps, "children" | "onClick" | "onFocus">> = y
  .object({
    icon: IconSchema,
    rightIcon: IconSchema,
    alignText: AlignmentSchema.default(Alignment.LEFT),
    active: y.boolean().default(false),
    fill: y.boolean().default(false),
    large: y.boolean().default(true),
    loading: y.boolean().default(false),
    minimal: y.boolean().default(false),
    outlined: y.boolean().default(false),
    small: y.boolean().default(false),
    text: y.string().optional().default(""),
    type: y
      .string<ButtonType>()
      .oneOf([
        // enum
        "button",
        "reset",
        "submit",
      ])
      .default("button"),
    intent: IntentSchema,
    tabIndex: y.number().optional(),
  })
  .concat(PropsSchema);

export const AnchorButtonPropsSchema: y.ObjectSchema<Partial<Omit<AnchorButtonProps, "children" | "onClick" | "onFocus">>> = y
  .object({
    href: y.string().optional().default("#"),
    target: y.string().optional().default("_blank"),
  })
  .concat(ButtonPropsSchema)
  .concat(PropsSchema);

export const ButtonGroupPropsSchema: y.ObjectSchema<Omit<ButtonGroupProps, "children">> = y
  .object({
    alignText: AlignmentSchema.default(Alignment.LEFT),
    fill: y.boolean().default(false),
    minimal: y.boolean().default(false),
    large: y.boolean().default(false),
    vertical: y.boolean().default(false),
  })
  .concat(PropsSchema);

export const CalloutPropsSchema: y.ObjectSchema<Omit<CalloutProps, "children">> = y
  .object({
    icon: IconSchema.default(IconName.SEARCH as any),
    title: y.string().optional().nullable(),
    intent: IntentSchema.default(Intent.SUCCESS),
  })
  .concat(PropsSchema);

export const CardPropsSchema: y.ObjectSchema<Omit<CardProps, "children">> = y
  .object({
    interactive: InteractiveSchema.default(false),
  })
  .concat(ElevationPropsSchema)
  .concat(PropsSchema);

export const CollapsePropsSchema: y.ObjectSchema<Omit<CollapseProps, "children">> = y
  .object({
    isOpen: y.boolean().default(false),
    keepChildrenMounted: y.boolean().default(false),
  })
  .concat(PropsSchema);

export const DividerPropsSchema: y.ObjectSchema<Omit<DividerProps, "children" | "tagName"> & { tagName: string }> = y
  .object({
    tagName: y.string<keyof JSX.IntrinsicElements>().default("div"),
    layout: LayouSchema.default(Layout.VERTICAL),
  })
  .concat(PropsSchema);

export const MenuPropsSchema: y.ObjectSchema<Omit<MenuProps, "children">> = y
  .object({
    large: y.boolean().default(false),
  })
  .concat(PropsSchema);

export const NavbarPropsSchema: y.ObjectSchema<Omit<NavbarProps, "children">> = y
  .object({
    fixedToTop: y.boolean().default(false),
  })
  .concat(PropsSchema);

export const HTMLSelectPropsSchema: y.AnyObjectSchema = y
  .object({
    fill: y.boolean().default(false),
    large: y.boolean().default(false),
    minimal: y.boolean().default(false),
    multiple: y.boolean().default(false),
    iconName: IconSchema.default(IconName.DOUBLE_CARET_VERTICAL),
    value: y.mixed<string>().concat(y.mixed<number>()),
  })
  .concat(PropsSchema);

export const HTMLTablePropsSchema: y.ObjectSchema<Omit<HTMLTableProps, "children">> = y
  .object({
    bordered: y.boolean().default(true),
    compact: y.boolean().default(true),
    striped: y.boolean().default(true),
    interactive: InteractiveSchema.default(true),
  })
  .concat(PropsSchema);

export const NonIdealStatePropsSchema: y.ObjectSchema<Omit<NonIdealStateProps, "children" | "action">> = y
  .object({
    title: y.string().optional().nullable(),
    text: y.string().optional().nullable(),
    description: y.string().optional().nullable(),
    layout: LayouSchema.default(NonIdealStatePropsDefaults.layout),
    iconSize: NonIdealStateIconSizeSchema.default(NonIdealStatePropsDefaults.iconSize),
    icon: IconSchema.default(IconName.SEARCH as any),
  })
  .concat(PropsSchema);

export const ProgressBarPropsSchema: y.ObjectSchema<Omit<ProgressBarProps, "children">> = y
  .object({
    animate: y.boolean().default(true),
    stripes: y.boolean().default(true),
    value: y.number().min(0).max(1).default(null),
    intent: IntentSchema.default(Intent.SUCCESS),
  })
  .concat(PropsSchema);

export const SpinnerPropsSchema: y.ObjectSchema<Omit<SpinnerProps, "children"> & { tagName: string }> = y
  .object({
    tagName: y.string<keyof JSX.IntrinsicElements>().default("div"),
    size: y.number().default(SpinnerSize.STANDARD * 2),
    value: y.number().min(0).max(1).default(null),
  })
  .concat(IntentPropsSchema)
  .concat(PropsSchema);

export const SwitchPropsSchema: y.ObjectSchema<Omit<Props, "children"> & { tagName: string }> = y
  .object({
    label: y.string().optional().nullable(),
    inline: y.boolean().default(false),
    large: y.boolean().default(true),
    checked: y.boolean().default(true),
    innerLabel: y.string().default("off"),
    innerLabelChecked: y.string().default("on"),
    tagName: y.string<keyof JSX.IntrinsicElements>().default("label"),
    alignIndicator: AlignmentSchema.default(Alignment.LEFT),
  })
  .concat(PropsSchema);

export const InputGroupPropsSchema: y.ObjectSchema<Omit<Props, "children"> & { tagName: string }> = y
  .object({
    inline: y.boolean().default(false),
    fill: y.boolean().default(false),
    readOnly: y.boolean().default(false),
    large: y.boolean().default(false),
    small: y.boolean().default(false),
    round: y.boolean().default(false),
    tagName: y.string<keyof JSX.IntrinsicElements>().default("div"),
    type: y
      .string()
      .oneOf([
        // enum
        "text",
        "search",
        "number",
      ])
      .default("text"),
    inputClassName: y.string().optional().nullable(),
    placeholder: y.string().default("Placeholder"),
    value: y.string().default("Example"),
    intent: IntentSchema,
    leftIcon: IconSchema.default(IconName.FILTER),
    rightIcon: IconSchema.default(IconName.SEARCH),
  })
  .concat(PropsSchema);

export const FileInputPropsSchema: y.ObjectSchema<Omit<Props, "children">> = y
  .object({
    fill: y.boolean().default(false),
    readOnly: y.boolean().default(false),
    hasSelection: y.boolean().default(false),
    large: y.boolean().default(false),
    small: y.boolean().default(false),
    round: y.boolean().default(false),
    text: y.string().default("~/Downloads/file.txt"),
    buttonText: y.string().default("Pick"),
    inputClassName: y.string().optional().nullable(),
    intent: IntentSchema,
  })
  .concat(PropsSchema);

export const TagPropsSchema: y.ObjectSchema<Omit<Props, "children">> = y
  .object({
    active: y.boolean().default(false),
    fill: y.boolean().default(false),
    inline: y.boolean().default(false),
    large: y.boolean().default(false),
    small: y.boolean().default(false),
    minimal: y.boolean().default(false),
    multiline: y.boolean().default(false),
    round: y.boolean().default(false),
    htmlTitle: y.string().default(""),
    inputClassName: y.string().optional().nullable(),
    intent: IntentSchema,
    interactive: y.boolean().default(true),
    icon: IconSchema.default(IconName.HAND_RIGHT),
    rightIcon: IconSchema.default(IconName.CARET_DOWN),
    tabIndex: y.number().optional(),
  })
  .concat(PropsSchema);

export const TextPropsSchema: y.ObjectSchema<Omit<Props, "children">> = y
  .object({
    tagName: y.string<keyof JSX.IntrinsicElements>().default("div"),
    ellipsize: y.boolean().default(false),
    title: y.string().default("Test text goes here"),
  })
  .concat(PropsSchema);
