import { JSX } from "solid-js";
import * as y from "yup";

import { IconName } from "@blueprint/icons";
import { Props, Alignment, Elevation, Intent, Layout } from "@blueprint/core";
import {
  CollapseProps,
  MenuProps,
  NavbarProps,
  HTMLTableProps,
  NonIdealStatePropsDefaults,
  NonIdealStateProps,
  SpinnerProps,
  SpinnerSize,
  ProgressBarProps,
} from "@blueprint/components";

export const PropsSchema: y.ObjectSchema<Omit<Props, "children">> = y.object({
  disabled: y.boolean().optional().nullable(),
  class: y.string().optional().nullable(),
});

export const AlignmentPropsSchema = y.object({
  alignment: y
    .string<Alignment>()
    .oneOf([
      // enum
      Alignment.LEFT,
      Alignment.CENTER,
      Alignment.RIGHT,
    ])
    .optional(),
});

export const ElevationPropsSchema = y.object({
  elevation: y
    .number<Elevation>()
    .oneOf([
      // enum
      Elevation.ZERO,
      Elevation.ONE,
      Elevation.TWO,
      Elevation.THREE,
      Elevation.FOUR,
    ])
    .optional(),
});

export const IntentPropsSchema = y.object({
  intent: y
    .string<Intent>()
    .oneOf([
      // enum
      Intent.NONE,
      Intent.PRIMARY,
      Intent.SUCCESS,
      Intent.DANGER,
      Intent.WARNING,
    ])
    .optional(),
});

export const InteractivePropsSchema = y.object({
  interactive: y.boolean().optional().nullable(),
});

// Components
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

export const LayoutPropsSchema = y.object({
  intent: y
    .string<Layout>()
    .oneOf([
      // enum
      Layout.VERTICAL,
      Layout.HORIZONTAL,
    ])
    .optional(),
});

export const NonIdealStatePropsSchema: y.ObjectSchema<Omit<NonIdealStateProps, "children" | "action">> = y
  .object({
    title: y.string().optional().nullable(),
    text: y.string().optional().nullable(),
    description: y.string().optional().nullable(),
    layout: y
      .string<Layout>()
      .optional()
      .nullable()
      .oneOf([
        // enum
        Layout.HORIZONTAL,
        Layout.VERTICAL,
      ])
      .default(NonIdealStatePropsDefaults.layout),
    iconSize: y.number().default(NonIdealStatePropsDefaults.iconSize),
    icon: y.string<IconName>().optional().nullable(),
  })
  .concat(IntentPropsSchema)
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
