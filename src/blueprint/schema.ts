import { JSX } from "solid-js";
import * as y from "yup";

import { IconName } from "@blueprint/icons";
import { Props, Alignment, Elevation, Intent, Layout } from "@blueprint/core";
import {
  ButtonType,
  ButtonProps,
  ButtonGroupProps,
  CalloutProps,
  CardProps,
  CollapseProps,
  HTMLTableProps,
  MenuProps,
  NavbarProps,
  NonIdealStatePropsDefaults,
  NonIdealStateProps,
  ProgressBarProps,
  SpinnerProps,
  SpinnerSize,
} from "@blueprint/components";
import { IconSize, IconProps } from "@blueprint/icons";

export const PropsSchema: y.ObjectSchema<Omit<Props, "children">> = y.object({
  disabled: y.boolean().optional().nullable(),
  class: y.string().optional().nullable(),
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
  .oneOf([
    // enum
    IconName.REFRESH,
    IconName.DUPLICATE,
    IconName.DATABASE,
    IconName.FUNCTION,
    IconName.COG,
    IconName.INFO_SIGN,
    IconName.CARET_DOWN,
    IconName.CARET_UP,
    IconName.CARET_RIGHT,
  ])
  .defined();

const IconSizeSchema = y.number<IconSize>().oneOf([IconSize.STANDARD, IconSize.LARGE]);

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

export const InteractivePropsSchema = y.object({
  interactive: y.boolean().optional().nullable(),
});

// Components
export const ButtonPropsSchema: y.ObjectSchema<Omit<ButtonProps, "children" | "onClick">> = y
  .object({
    icon: IconSchema.default(IconName.HAND_RIGHT as any),
    rightIcon: IconSchema.default(IconName.PLUS as any),
    alignText: AlignmentSchema.default(Alignment.LEFT),
    active: y.boolean().default(false),
    fill: y.boolean().default(false),
    large: y.boolean().default(false),
    loading: y.boolean().default(false),
    minimal: y.boolean().default(false),
    outlined: y.boolean().default(false),
    small: y.boolean().default(false),
    text: y.string().optional().nullable(),
    type: y
      .string<ButtonType>()
      .oneOf([
        // enum
        "button",
        "reset",
        "submit",
      ])
      .default("button"),
    intent: IntentSchema.default(Intent.SUCCESS),
  })
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
    interactive: y.boolean().optional().nullable(),
  })
  .concat(ElevationPropsSchema)
  .concat(PropsSchema);

export const CollapsePropsSchema: y.ObjectSchema<Omit<CollapseProps, "children">> = y
  .object({
    isOpen: y.boolean().optional().nullable(),
    keepChildrenMounted: y.boolean().optional().nullable(),
  })
  .concat(PropsSchema);

export const MenuPropsSchema: y.ObjectSchema<Omit<MenuProps, "children">> = y
  .object({
    fixedToTop: y.boolean().optional().nullable(),
  })
  .concat(PropsSchema);

export const NavbarPropsSchema: y.ObjectSchema<Omit<NavbarProps, "children">> = y
  .object({
    fixedToTop: y.boolean().optional().nullable(),
  })
  .concat(PropsSchema);

export const HTMLTablePropsSchema: y.ObjectSchema<Omit<HTMLTableProps, "children">> = y
  .object({
    bordered: y.boolean().optional().nullable(),
    compact: y.boolean().optional().nullable(),
    condensed: y.boolean().optional().nullable(),
    striped: y.boolean().optional().nullable(),
  })
  .concat(InteractivePropsSchema)
  .concat(PropsSchema);

export const NonIdealStatePropsSchema: y.ObjectSchema<Omit<NonIdealStateProps, "children" | "action">> = y
  .object({
    title: y.string().optional().nullable(),
    text: y.string().optional().nullable(),
    description: y.string().optional().nullable(),
    layout: LayouSchema.default(NonIdealStatePropsDefaults.layout),
    iconSize: y.number().default(NonIdealStatePropsDefaults.iconSize),
    icon: IconSchema.default(IconName.SEARCH as any),
  })
  .concat(PropsSchema);

export const ProgressBarPropsSchema: y.ObjectSchema<Omit<ProgressBarProps, "children">> = y
  .object({
    animate: y.boolean().default(true),
    stripes: y.boolean().default(true),
    value: y.number().min(0).max(1).default(null),
  })
  .concat(IntentPropsSchema)
  .concat(PropsSchema);

export const SpinnerPropsSchema: y.ObjectSchema<Omit<SpinnerProps, "children" | "tagName"> & { tagName: string }> = y
  .object({
    tagName: y.string<keyof JSX.IntrinsicElements>().default("div"),
    size: y.number().default(SpinnerSize.STANDARD),
    value: y.number().min(0).max(1).default(null),
  })
  .concat(IntentPropsSchema)
  .concat(PropsSchema);
