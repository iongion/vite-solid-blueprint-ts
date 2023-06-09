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

//
const AlignmentLabels = {
  [Alignment.LEFT]: "Alignment.LEFT",
  [Alignment.CENTER]: "Alignment.CENTER",
  [Alignment.RIGHT]: "Alignment.RIGHT",
};
// const BoundaryLabels = {
//   [Boundary.START]: "Boundary.START",
//   [Boundary.END]: "Boundary.END",
// };
const ElevationLabels = {
  [Elevation.ZERO]: "Elevation.ZERO",
  [Elevation.ONE]: "Elevation.ONE",
  [Elevation.TWO]: "Elevation.TWO",
  [Elevation.THREE]: "Elevation.THREE",
  [Elevation.FOUR]: "Elevation.FOUR",
};
const IntentLabels = {
  [Intent.NONE]: "Intent.NONE",
  [Intent.PRIMARY]: "Intent.PRIMARY",
  [Intent.SUCCESS]: "Intent.SUCCESS",
  [Intent.WARNING]: "Intent.WARNING",
  [Intent.DANGER]: "Intent.DANGER",
};
const LayoutLabels = {
  [Layout.HORIZONTAL]: "Layout.HORIZONTAL",
  [Layout.VERTICAL]: "Layout.VERTICAL",
};
// const PositionLabels = {
//   [Position.BOTTOM]: "Position.BOTTOM",
//   [Position.BOTTOM_LEFT]: "Position.BOTTOM_LEFT",
//   [Position.BOTTOM_RIGHT]: "Position.BOTTOM_RIGHT",
//   [Position.LEFT]: "Position.LEFT",
//   [Position.LEFT_BOTTOM]: "Position.LEFT_BOTTOM",
//   [Position.LEFT_TOP]: "Position.LEFT_TOP",
//   [Position.RIGHT]: "Position.RIGHT",
//   [Position.RIGHT_BOTTOM]: "Position.RIGHT_BOTTOM",
//   [Position.RIGHT_TOP]: "Position.RIGHT_TOP",
//   [Position.TOP]: "Position.TOP",
//   [Position.TOP_LEFT]: "Position.TOP_LEFT",
//   [Position.TOP_RIGHT]: "Position.TOP_RIGHT",
// };
const IconSizeLabels = {
  [IconSize.STANDARD]: "IconSize.STANDARD",
  [IconSize.LARGE]: "IconSize.LARGE",
  [IconSize.XL]: "IconSize.XL",
  [IconSize.XXL]: "IconSize.XXL",
};
const IconLabels = {
  [IconName.REFRESH]: "IconName.REFRESH",
  [IconName.DUPLICATE]: "IconName.DUPLICATE",
  [IconName.DATABASE]: "IconName.DATABASE",
  [IconName.FUNCTION]: "IconName.FUNCTION",
  [IconName.COG]: "IconName.COG",
  [IconName.INFO_SIGN]: "IconName.INFO_SIGN",
  [IconName.CARET_DOWN]: "IconName.CARET_DOWN",
  [IconName.CARET_UP]: "IconName.CARET_UP",
  [IconName.CARET_RIGHT]: "IconName.CARET_RIGHT",
  [IconName.SEARCH]: "IconName.SEARCH",
  [IconName.SHARE]: "IconName.SHARE",
  [IconName.HAND_RIGHT]: "IconName.HAND_RIGHT",
  [IconName.STACKBLITZ]: "IconName.STACKBLITZ",
  [IconName.GITHUB]: "IconName.GITHUB",
  [IconName.DOUBLE_CARET_VERTICAL]: "IconName.DOUBLE_CARET_VERTICAL",
  [IconName.FLASH]: "IconName.FLASH",
  [IconName.MOON]: "IconName.MOON",
  [IconName.FILTER]: "IconName.FILTER",
  [IconName.SMALL_CROSS]: "IconName.SMALL_CROSS",
  [IconName.PLUS]: "IconName.PLUS",
};
const NonIdealStateIconSizeLabels = {
  [NonIdealStateIconSize.STANDARD]: "NonIdealStateIconSize.STANDARD",
  [NonIdealStateIconSize.SMALL]: "NonIdealStateIconSize.SMALL",
  [NonIdealStateIconSize.EXTRA_SMALL]: "NonIdealStateIconSize.EXTRA_SMALL",
};

//

export const PropsSchema: y.ObjectSchema<Omit<Props, "children">> = y.object({
  disabled: y.boolean().default(false),
  class: y.string().optional(),
});

export const AlignmentSchema = y
  .string<Alignment>()
  .oneOf(Object.keys(AlignmentLabels) as unknown as Alignment[])
  .optional()
  .meta({
    defaultValue: Alignment.LEFT,
    labelsMap: AlignmentLabels,
  });

export const AlignmentPropsSchema = y.object({
  alignment: AlignmentSchema,
});

export const ElevationSchema = y
  .number<Elevation>()
  .oneOf(Object.keys(ElevationLabels) as unknown as Elevation[])
  .optional()
  .meta({
    defaultValue: Elevation.ZERO,
    labelsMap: ElevationLabels,
  });
export const ElevationPropsSchema = y.object({
  elevation: ElevationSchema,
});

export const LayoutSchema = y
  .string<Layout>()
  .oneOf(Object.keys(LayoutLabels) as unknown as Layout[])
  .optional()
  .meta({
    defaultValue: Elevation.ZERO,
    labelsMap: LayoutLabels,
  });
export const LayoutPropsSchema = y.object({
  layout: LayoutSchema,
});

const IconSchema = y
  .string<IconName>()
  .oneOf(IconsList as IconName[])
  .meta({
    defaultIcon: IconName.ADD,
    labelsMap: IconLabels,
  });

const IconSizeSchema = y
  .number<IconSize>()
  .oneOf(Object.keys(IconSizeLabels) as unknown as IconSize[])
  .meta({
    defaultValue: IconSize.STANDARD,
    labelsMap: IconSizeLabels,
  });

const NonIdealStateIconSizeSchema = y
  .number<NonIdealStateIconSize>()
  .oneOf(Object.keys(NonIdealStateIconSizeLabels) as unknown as NonIdealStateIconSize[])
  .meta({
    defaultValue: NonIdealStateIconSize.STANDARD,
    labelsMap: NonIdealStateIconSizeLabels,
  });

const IntentSchema = y
  .string<Intent>()
  .oneOf(Object.keys(IntentLabels) as unknown as Intent[])
  .optional()
  .meta({
    defaultValue: Intent.NONE,
    labelsMap: IntentLabels,
  });
export const IntentPropsSchema = y.object({
  intent: IntentSchema,
});

const InteractiveSchema = y.boolean().default(false);

export const InteractivePropsSchema = y.object({
  interactive: InteractiveSchema,
});

// Icons

export const IconPropsSchema: y.ObjectSchema<Omit<IconProps, "children">> = y
  .object({
    icon: IconSchema.default(IconName.HAND_RIGHT),
    size: IconSizeSchema.default(IconSize.XXL),
    intent: IntentSchema.default(Intent.NONE),
  })
  .concat(PropsSchema);

// Components
export const ButtonPropsSchema: y.ObjectSchema<Omit<ButtonProps, "children" | "onClick" | "onFocus">> = y
  .object({
    icon: IconSchema.meta({ defaultValue: IconName.HAND_RIGHT }),
    rightIcon: IconSchema.meta({ defaultValue: IconName.PLUS }),
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
    intent: IntentSchema.default(Intent.SUCCESS),
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

export const ButtonGroupPropsSchema: y.ObjectSchema<Omit<ButtonGroupProps, "children" | "dataProvider">> = y
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
    icon: IconSchema.default(IconName.SEARCH),
    title: y.string().default("Sample title"),
    intent: IntentSchema.default(Intent.NONE),
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
    layout: LayoutSchema.default(Layout.VERTICAL),
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
    layout: LayoutSchema.default(NonIdealStatePropsDefaults.layout),
    iconSize: NonIdealStateIconSizeSchema.default(NonIdealStatePropsDefaults.iconSize),
    icon: IconSchema.default(IconName.SEARCH),
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
    removable: y.boolean().default(true),
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

export const TabsPropsSchema: y.ObjectSchema<Omit<Props, "children">> = y
  .object({
    animate: y.boolean().default(false),
    id: y.string().default("Tabs"),
    large: y.boolean().default(false),
    renderActiveTabPanelOnly: y.boolean().default(false),
    selectedTabId: y.string().default("TabsExampleTabID2"),
    vertical: y.boolean().default(false),
    fill: y.boolean().default(false),
  })
  .concat(PropsSchema);
