import { createSignal } from "solid-js";
import type { Component } from "solid-js";
import { useI18n } from "solid-i18n";
import classNames from "classnames";
import { Alignment, Classes, Elevation, Intent, Props, Layout } from "@blueprint/core";
import {
  AnchorButtonProps,
  AnchorButton,
  ButtonProps,
  Button,
  ButtonGroupProps,
  ButtonGroup,
  CalloutProps,
  Callout,
  CardProps,
  Card,
  CodeProps,
  Code,
  CodeBlockProps,
  CodeBlock,
  CollapseProps,
  Collapse,
  DividerProps,
  Divider,
  // HTML Elements
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Blockquote,
  Label,
  UL,
  OL,
  MenuProps,
  Menu,
  NavbarProps,
  Navbar,
  HTMLSelectProps,
  HTMLSelect,
  HTMLTableProps,
  HTMLTable,
  NonIdealStateIconSize,
  NonIdealStateProps,
  NonIdealState,
  ProgressBarProps,
  ProgressBar,
  SpinnerProps,
  Spinner,
  Switch,
  SwitchProps,
  InputGroupProps,
  InputGroup,
  FileInputProps,
  FileInput,
  TextProps,
  Text,
  TagProps,
  Tag,
  Tab,
  TabsProps,
  Tabs,
  // TabTitle,
} from "@blueprint/components";
import {
  PropsSchema,
  AnchorButtonPropsSchema,
  ButtonPropsSchema,
  ButtonGroupPropsSchema,
  CalloutPropsSchema,
  CardPropsSchema,
  CollapsePropsSchema,
  DividerPropsSchema,
  HTMLSelectPropsSchema,
  HTMLTablePropsSchema,
  IconPropsSchema,
  MenuPropsSchema,
  NavbarPropsSchema,
  NonIdealStatePropsSchema,
  ProgressBarPropsSchema,
  SpinnerPropsSchema,
  SwitchPropsSchema,
  InputGroupPropsSchema,
  FileInputPropsSchema,
  TagPropsSchema,
  TextPropsSchema,
  TabsPropsSchema,
} from "@blueprint/schema";
import { Icon, IconName, IconProps, IconSize } from "@blueprint/icons";
import { Example } from "./Example";
import { ToolsList } from "./ToolsList";

import "./App.css";

const codeLines = [
  "[11:53:30] Finished 'typescript-bundle-blueprint' after 769 ms",
  "[11:53:30] Starting 'typescript-typings-blueprint'...",
  "[11:53:30] Finished 'typescript-typings-blueprint' after 198 ms",
  "[11:53:30] write ./blueprint.css",
  "[11:53:30] Finished 'sass-compile-blueprint' after 2.84 s",
];

const iconsMap = {
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
const intentMap = {
  // intents
  [Intent.NONE]: "Intent.NONE",
  [Intent.PRIMARY]: "Intent.PRIMARY",
  [Intent.SUCCESS]: "Intent.SUCCESS",
  [Intent.WARNING]: "Intent.WARNING",
  [Intent.DANGER]: "Intent.DANGER",
};
const alignmentMap = {
  [Alignment.CENTER]: "Alignment.CENTER",
  [Alignment.LEFT]: "Alignment.LEFT",
  [Alignment.RIGHT]: "Alignment.RIGHT",
};
const elevationMap = {
  [Elevation.ZERO]: "Elevation.ZERO",
  [Elevation.ONE]: "Elevation.ONE",
  [Elevation.TWO]: "Elevation.TWO",
  [Elevation.THREE]: "Elevation.THREE",
  [Elevation.FOUR]: "Elevation.FOUR",
};
const iconSizeMap = {
  [IconSize.STANDARD]: "IconSize.STANDARD",
  [IconSize.LARGE]: "IconSize.LARGE",
  [IconSize.XL]: "IconSize.XL",
  [IconSize.XXL]: "IconSize.XXL",
};
const nonIdealStateIconSizeMap = {
  [NonIdealStateIconSize.STANDARD]: "NonIdealStateIconSize.STANDARD",
  [NonIdealStateIconSize.SMALL]: "NonIdealStateIconSize.LARGE",
  [NonIdealStateIconSize.EXTRA_SMALL]: "NonIdealStateIconSize.XL",
};
const layoutMap = {
  [Layout.VERTICAL]: "Layout.VERTICAL",
  [Layout.HORIZONTAL]: "Layout.HORIZONTAL",
};

const App: Component = () => {
  const { t } = useI18n();
  const [count, setCount] = createSignal(0);
  const [useDarkTheme, setUseDarkTheme] = createSignal(true);
  return (
    <div class={classNames("App", { [Classes.DARK]: useDarkTheme() })}>
      <ToolsList />
      <h1 class="AppHeaderTitle">Solid + BlueprintJS + Typescript + Vite</h1>
      <p class="read-the-docs">
        <span>Click on the logos to learn more.</span>
        <br />
        <br />
        <ButtonGroup>
          <AnchorButton intent={Intent.NONE} icon={IconName.STACKBLITZ} href="https://stackblitz.com/edit/solidjs-templates-gfcotu" target="_blank" text={t("Edit source")} />
          <AnchorButton intent={Intent.SUCCESS} icon={IconName.GITHUB} href="https://github.com/iongion/vite-solid-blueprint-ts" target="_blank" text={t("Fork repo")} />
        </ButtonGroup>
        <br />
        <br />
        <Switch
          checked={useDarkTheme()}
          innerLabel={t("Light")}
          innerLabelChecked={t("Dark")}
          onChange={(e) => {
            setUseDarkTheme(e.currentTarget.checked);
          }}
        />
      </p>
      <Example<ButtonProps>
        example="Button"
        schema={ButtonPropsSchema}
        render={(props) => {
          return (
            <Button
              {...props}
              intent={props.intent || Intent.SUCCESS}
              icon={props.icon || IconName.HAND_RIGHT}
              rightIcon={props.rightIcon || IconName.PLUS}
              text={props.text || t("Count is {count}", { count: count() })}
              onClick={() => {
                setCount((count) => count + 1);
              }}
            />
          );
        }}
        code={(props) => {
          const boolProps = ["disabled", "active", "fill", "large", "loading", "minimal", "outlined", "small"].filter((p) => !!props[p]);
          const componentProps = {
            // converted to code attributes
            class: props.class ? `"${props.class}"` : undefined,
            icon: iconsMap[props.icon || IconName.HAND_RIGHT],
            rightIcon: iconsMap[props.rightIcon || IconName.HAND_RIGHT],
            intent: intentMap[props.intent || Intent.SUCCESS],
            alignText: alignmentMap[props.alignText || Alignment.LEFT],
            text: props.text || `"${t("Count is {count}", { count: count() })}"`,
            type: props.type && props.type !== "button" ? `"${props.type}"` : undefined,
            tabIndex: props.tabIndex ? `"${props.tabIndex}"` : undefined,
          };
          const componentPropsList = Object.keys(componentProps)
            .filter((prop) => !!componentProps[prop])
            .map((prop) => {
              return `${prop}={${componentProps[prop]}}`;
            })
            .concat(boolProps);
          const codeLines = [
            // import
            `import { Button } from "@blueprint/components"`,
            `import { Alignment, Intent } from "@blueprint/core"`,
            `import { IconName } from "@blueprint/icons"`,
            "",
            // component
            "const App = () => {",
            `  return (`,
            `    <Button `,
            `     ${componentPropsList.join("\n     ")}`,
            `    />`,
            `  )`,
            "}",
          ];
          const html = (window as any).Prism.highlight(codeLines.join("\n"), (window as any).Prism.languages.typescript, "typescript");
          return html;
        }}
      />

      <Example<AnchorButtonProps>
        example="AnchorButton"
        schema={AnchorButtonPropsSchema}
        render={(props) => {
          return (
            <AnchorButton
              {...props}
              intent={props.intent || Intent.PRIMARY}
              icon={props.icon || IconName.DUPLICATE}
              rightIcon={props.rightIcon || IconName.SHARE}
              text={props.text || t("Duplicate this page")}
            />
          );
        }}
        code={(props) => {
          const boolProps = ["disabled", "active", "fill", "large", "loading", "minimal", "outlined", "small"].filter((p) => !!props[p]);
          const componentProps = {
            // converted to code attributes
            class: props.class ? `"${props.class}"` : undefined,
            icon: iconsMap[props.icon || IconName.HAND_RIGHT],
            rightIcon: iconsMap[props.rightIcon || IconName.HAND_RIGHT],
            intent: intentMap[props.intent || Intent.SUCCESS],
            alignText: alignmentMap[props.alignText || Alignment.LEFT],
            text: props.text || `"${t("Count is {count}", { count: count() })}"`,
            type: props.type && props.type !== "button" ? `"${props.type}"` : undefined,
            tabIndex: props.tabIndex ? `"${props.tabIndex}"` : undefined,
          };
          const componentPropsList = Object.keys(componentProps)
            .filter((prop) => !!componentProps[prop])
            .map((prop) => {
              return `${prop}={${componentProps[prop]}}`;
            })
            .concat(boolProps);
          const codeLines = [
            // import
            `import { AnchorButton } from "@blueprint/components"`,
            `import { Alignment, Intent } from "@blueprint/core"`,
            `import { IconName } from "@blueprint/icons"`,
            "",
            // component
            "const App = () => {",
            `  return (`,
            `    <AnchorButton `,
            `     ${componentPropsList.join("\n     ")}`,
            `    />`,
            `  )`,
            "}",
          ];
          const html = (window as any).Prism.highlight(codeLines.join("\n"), (window as any).Prism.languages.typescript, "typescript");
          return html;
        }}
      />

      <Example<ButtonGroupProps>
        example="ButtonGroup"
        schema={ButtonGroupPropsSchema}
        render={(props) => {
          return (
            <ButtonGroup {...props}>
              <Button intent={Intent.DANGER} icon={IconName.DATABASE} text="Danger" />
              <Button intent={Intent.SUCCESS} icon={IconName.FUNCTION} text="Success" />
              <Button intent={Intent.PRIMARY} icon={IconName.REFRESH} text="Primary" />
              <Button intent={Intent.NONE} icon={IconName.COG} text="None" />
            </ButtonGroup>
          );
        }}
        code={(props) => {
          const boolProps = ["disabled", "fill", "minimal", "large", "vertical"].filter((p) => !!props[p]);
          const componentProps = {
            class: props.class ? `"${props.class}"` : undefined,
            // converted to code attributes
            alignText: alignmentMap[props.alignText || Alignment.LEFT],
          };
          const componentPropsList = Object.keys(componentProps)
            .filter((prop) => !!componentProps[prop])
            .map((prop) => {
              return `${prop}={${componentProps[prop]}}`;
            })
            .concat(boolProps);
          const codeLines = [
            // import
            `import { ButtonGroup, Button } from "@blueprint/components"`,
            `import { Alignment, Intent } from "@blueprint/core"`,
            `import { IconName } from "@blueprint/icons"`,
            "",
            // component
            "const App = () => {",
            `  return (`,
            `    <ButtonGroup ${componentPropsList.join(" ")}>`,
            `       <Button intent={Intent.DANGER} icon={IconName.DATABASE} text="Danger" />`,
            `       <Button intent={Intent.SUCCESS} icon={IconName.FUNCTION} text="Success" />`,
            `       <Button intent={Intent.PRIMARY} icon={IconName.REFRESH} text="Primary" />`,
            `       <Button intent={Intent.NONE} icon={IconName.COG} text="None" />`,
            `    </ButtonGroup>`,
            `  )`,
            "}",
          ];
          const html = (window as any).Prism.highlight(codeLines.join("\n"), (window as any).Prism.languages.typescript, "typescript");
          return html;
        }}
      />

      <Example<CalloutProps>
        example="Callout"
        schema={CalloutPropsSchema}
        render={(props) => {
          return (
            <Callout {...props}>
              Long-form information about the important content. This text is styled as <br />
              <a href="#">Running text</a>, so it may contain things like headers, links, lists, <Code>code</Code> etc.
            </Callout>
          );
        }}
        code={(props) => {
          const boolProps = ["disabled"].filter((p) => !!props[p]);
          const componentProps = {
            class: props.class ? `"${props.class}"` : undefined,
            // converted to code attributes
            title: props.title ? `"${props.title}"` : undefined,
            icon: iconsMap[(props.icon as IconName) || IconName.REFRESH],
            intent: intentMap[props.intent || Intent.SUCCESS],
          };
          const componentPropsList = Object.keys(componentProps)
            .filter((prop) => !!componentProps[prop])
            .map((prop) => {
              return `${prop}={${componentProps[prop]}}`;
            })
            .concat(boolProps);
          const codeLines = [
            // import
            `import { Callout } from "@blueprint/components"`,
            `import { Intent } from "@blueprint/core"`,
            `import { IconName } from "@blueprint/icons"`,
            "",
            // component
            "const App = () => {",
            `  return (`,
            `    <Callout ${componentPropsList.join(" ")}>`,
            `    Long-form information about the important content.`,
            `    This text is styled as <br />`,
            `    <a href="#">Running text</a>, so it may contain`,
            `    things like headers, links, lists, <Code>code</Code> etc.`,
            `    </Callout>`,
            `  )`,
            "}",
          ];
          const html = (window as any).Prism.highlight(codeLines.join("\n"), (window as any).Prism.languages.typescript, "typescript");
          return html;
        }}
      />

      <Example<CardProps>
        example="Card"
        schema={CardPropsSchema}
        render={(props) => {
          return <Card {...props}>We build products that make people better at their most important work.</Card>;
        }}
        code={(props) => {
          const boolProps = ["disabled", "interactive"].filter((p) => !!props[p]);
          const componentProps = {
            // converted to code attributes
            class: props.class ? `"${props.class}"` : undefined,
            elevation: elevationMap[props.elevation || Elevation.ZERO],
          };
          const componentPropsList = Object.keys(componentProps)
            .filter((prop) => !!componentProps[prop])
            .map((prop) => {
              return `${prop}={${componentProps[prop]}}`;
            })
            .concat(boolProps);
          const codeLines = [
            // import
            `import { Card } from "@blueprint/components"`,
            `import { Elevation } from "@blueprint/core"`,
            "",
            // component
            "const App = () => {",
            `  return (`,
            `    <Card ${componentPropsList.join(" ")}>`,
            `      We build products that make people better at their most important work.`,
            `    </Card>`,
            `  )`,
            "}",
          ];
          const html = (window as any).Prism.highlight(codeLines.join("\n"), (window as any).Prism.languages.typescript, "typescript");
          return html;
        }}
      />

      <Example<CodeProps>
        example="Code"
        schema={PropsSchema}
        render={(props) => {
          return <Code {...props}>{codeLines.join("\n")}</Code>;
        }}
        code={(props) => {
          const boolProps = ["disabled"].filter((p) => !!props[p]);
          const componentProps = {
            // converted to code attributes
            class: props.class ? `"${props.class}"` : undefined,
          };
          const componentPropsList = Object.keys(componentProps)
            .filter((prop) => !!componentProps[prop])
            .map((prop) => {
              return `${prop}={${componentProps[prop]}}`;
            })
            .concat(boolProps);
          const source = [
            // import
            `import { Code } from "@blueprint/components"`,
            "",
            // component
            "const App = () => {",
            `  return (`,
            `    <Code ${componentPropsList.join(" ")}>`,
            `    ${codeLines.join("\n    ")}`,
            `    </Code>`,
            `  )`,
            "}",
          ];
          const html = (window as any).Prism.highlight(source.join("\n"), (window as any).Prism.languages.typescript, "typescript");
          return html;
        }}
      />

      <Example<CodeBlockProps>
        example="CodeBlock"
        schema={PropsSchema}
        render={(props) => {
          return <CodeBlock {...props}>{codeLines.join("\n")}</CodeBlock>;
        }}
        code={(props) => {
          const boolProps = ["disabled"].filter((p) => !!props[p]);
          const componentProps = {
            // converted to code attributes
            class: props.class ? `"${props.class}"` : undefined,
          };
          const componentPropsList = Object.keys(componentProps)
            .filter((prop) => !!componentProps[prop])
            .map((prop) => {
              return `${prop}={${componentProps[prop]}}`;
            })
            .concat(boolProps);
          const source = [
            // import
            `import { CodeBlock } from "@blueprint/components"`,
            "",
            // component
            "const App = () => {",
            `  return (`,
            `    <CodeBlock ${componentPropsList.join(" ")}>`,
            `    ${codeLines.join("\n    ")}`,
            `    </CodeBlock>`,
            `  )`,
            "}",
          ];
          const html = (window as any).Prism.highlight(source.join("\n"), (window as any).Prism.languages.typescript, "typescript");
          return html;
        }}
      />

      <Example<CollapseProps>
        example="Collapse"
        schema={CollapsePropsSchema}
        render={(props, setProperty) => {
          return (
            <>
              <Button
                text="Toggle collapse"
                rightIcon={props.isOpen ? IconName.CARET_UP : IconName.CARET_DOWN}
                onClick={() => {
                  setProperty("isOpen", !props.isOpen);
                }}
              />
              <Collapse isOpen={props.isOpen}>
                <Card>
                  <CodeBlock>{codeLines.join("\n")}</CodeBlock>
                </Card>
              </Collapse>
            </>
          );
        }}
        code={(props) => {
          const boolProps = ["disabled", "isOpen", "keepChildrenMounted"].filter((p) => !!props[p]);
          const componentProps = {
            // converted to code attributes
            class: props.class ? `"${props.class}"` : undefined,
          };
          const componentPropsList = Object.keys(componentProps)
            .filter((prop) => !!componentProps[prop])
            .map((prop) => {
              return `${prop}={${componentProps[prop]}}`;
            })
            .concat(boolProps);
          const source = [
            // import
            `import { Collapse } from "@blueprint/components"`,
            "",
            // component
            "const App = () => {",
            `  return (`,
            `    <Collapse ${componentPropsList.join(" ")}>`,
            `      <Card>`,
            `        <CodeBlock>`,
            `          ${codeLines.join("\n          ")}`,
            `        </CodeBlock>`,
            `      </Card>`,
            `    </Collapse>`,
            `  )`,
            "}",
          ];
          const html = (window as any).Prism.highlight(source.join("\n"), (window as any).Prism.languages.typescript, "typescript");
          return html;
        }}
      />

      <Example<DividerProps>
        example="Divider"
        schema={DividerPropsSchema}
        render={(props) => {
          return <Divider {...props} />;
        }}
        code={(props) => {
          const boolProps = ["disabled"].filter((p) => !!props[p]);
          const componentProps = {
            // converted to code attributes
            class: props.class ? `"${props.class}"` : undefined,
            tagName: props.tagName ? `"${props.tagName}"` : undefined,
            layout: layoutMap[props.layout || Layout.VERTICAL],
          };
          const componentPropsList = Object.keys(componentProps)
            .filter((prop) => !!componentProps[prop])
            .map((prop) => {
              return `${prop}={${componentProps[prop]}}`;
            })
            .concat(boolProps);
          const source = [
            // import
            `import { Divider } from "@blueprint/components"`,
            `import { Layout } from "@blueprint/core"`,
            "",
            // component
            "const App = () => {",
            `  return <Divider ${componentPropsList.join(" ")} />`,
            "}",
          ];
          const html = (window as any).Prism.highlight(source.join("\n"), (window as any).Prism.languages.typescript, "typescript");
          return html;
        }}
      />

      <Example<Props>
        example="HTML Elements"
        schema={PropsSchema}
        render={(props) => {
          return (
            <div>
              <H1 {...props}>H1 example</H1>
              <H2 {...props}>H2 example</H2>
              <H3 {...props}>H3 example</H3>
              <H4 {...props}>H4 example</H4>
              <H5 {...props}>H5 example</H5>
              <H6 {...props}>H6 example</H6>
              <Blockquote {...props}>Blockquote example with a long text</Blockquote>
              <Label {...props} for="spanLabelTarget">
                <span>Label example with a long text</span> &nbsp;
                <input type="text" id="spanLabelTarget" />
              </Label>
              <UL {...props}>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
                <li>Item 4</li>
              </UL>
              <OL {...props}>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
                <li>Item 4</li>
              </OL>
            </div>
          );
        }}
        code={(props) => {
          const boolProps = ["disabled"].filter((p) => !!props[p]);
          const componentProps = {
            // converted to code attributes
            class: props.class ? `"${props.class}"` : undefined,
          };
          const componentPropsList = Object.keys(componentProps)
            .filter((prop) => !!componentProps[prop])
            .map((prop) => {
              return `${prop}={${componentProps[prop]}}`;
            })
            .concat(boolProps);
          const source = [
            // import
            `import { H1, H2, H3, H4, H5, H6, Blockquote, Label, UL, OL } from "@blueprint/components"`,
            "",
            // component
            "const App = () => {",
            `  return (`,
            `    <div>`,
            `      <H1 ${componentPropsList.join(" ")}>H1 example</H1>`,
            `      <H2 ${componentPropsList.join(" ")}>H2 example</H2>`,
            `      <H3 ${componentPropsList.join(" ")}>H3 example</H3>`,
            `      <H4 ${componentPropsList.join(" ")}>H4 example</H4>`,
            `      <H5 ${componentPropsList.join(" ")}>H5 example</H5>`,
            `      <H6 ${componentPropsList.join(" ")}>H6 example</H6>`,
            `      <Blockquote ${componentPropsList.join(" ")}>Blockquote example with a long text</Blockquote>`,
            `      <Label ${componentPropsList.join(" ")} for="spanLabelTarget">`,
            `        <span>Label example with a long text</span> &nbsp;`,
            `        <input type="text" id="spanLabelTarget" />`,
            `      </Label>`,
            `      <UL ${componentPropsList.join(" ")}>`,
            `        <li>Item 1</li>`,
            `        <li>Item 2</li>`,
            `        <li>Item 3</li>`,
            `        <li>Item 4</li>`,
            `      </UL>`,
            `      <OL ${componentPropsList.join(" ")}>`,
            `        <li>Item 1</li>`,
            `        <li>Item 2</li>`,
            `        <li>Item 3</li>`,
            `        <li>Item 4</li>`,
            `      </OL>`,
            `    </div>`,
            `  );`,
            "}",
          ];
          const html = (window as any).Prism.highlight(source.join("\n"), (window as any).Prism.languages.typescript, "typescript");
          return html;
        }}
      />

      <Example<HTMLSelectProps>
        example="HTMLSelect"
        schema={HTMLSelectPropsSchema}
        render={(props) => {
          return (
            <HTMLSelect {...props}>
              <option value="option.value.1">{t("Option label 1")}</option>
              <option value="option.value.2">{t("Option label 2")}</option>
              <option value="option.value.3">{t("Option label 3")}</option>
              <option value="option.value.4">{t("Option label 4")}</option>
            </HTMLSelect>
          );
        }}
        code={(props) => {
          const boolProps = ["disabled", "fill", "large", "minimal", "multiple"].filter((p) => !!props[p]);
          const componentProps = {
            // converted to code attributes
            class: props.class ? `"${props.class}"` : undefined,
            icon: iconsMap[props.iconName || IconName.DOUBLE_CARET_VERTICAL],
            value: props.value ? `"${props.value}"` : undefined,
          };
          const componentPropsList = Object.keys(componentProps)
            .filter((prop) => !!componentProps[prop])
            .map((prop) => {
              return `${prop}={${componentProps[prop]}}`;
            })
            .concat(boolProps);
          const codeLines = [
            // import
            `import { HTMLSelect } from "@blueprint/components"`,
            `import { IconName } from "@blueprint/icons"`,
            "",
            // component
            "const App = () => {",
            `  return (`,
            `    <HTMLSelect ${componentPropsList.join(" ")}>`,
            `      <option value="option.value.1">Option label 1</option>`,
            `      <option value="option.value.2">Option label 2</option>`,
            `      <option value="option.value.3">Option label 3</option>`,
            `      <option value="option.value.4">Option label 4</option>`,
            `    </HTMLSelect>`,
            `  )`,
            "}",
          ];
          const html = (window as any).Prism.highlight(codeLines.join("\n"), (window as any).Prism.languages.typescript, "typescript");
          return html;
        }}
      />

      <Example<HTMLTableProps>
        example="HTMLTable"
        schema={HTMLTablePropsSchema}
        render={(props) => {
          return (
            <HTMLTable {...props}>
              <thead>
                <tr>
                  <th>Table header</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Table row 1</td>
                </tr>
                <tr>
                  <td>Table row 2</td>
                </tr>
                <tr>
                  <td>Table row 3</td>
                </tr>
                <tr>
                  <td>Table row 4</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>Table footer</td>
                </tr>
              </tfoot>
            </HTMLTable>
          );
        }}
      />

      <Example<IconProps>
        example="Icon"
        schema={IconPropsSchema}
        render={(props) => {
          return <Icon {...props} />;
        }}
        code={(props) => {
          const boolProps = ["disabled"].filter((p) => !!props[p]);
          const componentProps = {
            // converted to code attributes
            class: props.class ? `"${props.class}"` : undefined,
            icon: iconsMap[props.icon || IconName.DOUBLE_CARET_VERTICAL],
            intent: intentMap[props.intent || Intent.SUCCESS],
            size: iconSizeMap[props.size || IconSize.STANDARD],
          };
          const componentPropsList = Object.keys(componentProps)
            .filter((prop) => !!componentProps[prop])
            .map((prop) => {
              return `${prop}={${componentProps[prop]}}`;
            })
            .concat(boolProps);
          const codeLines = [
            // import
            `import { Icon } from "@blueprint/icons"`,
            "",
            // component
            "const App = () => {",
            `  return (`,
            `    <Icon ${componentPropsList.join("\n     ")}`,
            `    />`,
            `  )`,
            "}",
          ];
          const html = (window as any).Prism.highlight(codeLines.join("\n"), (window as any).Prism.languages.typescript, "typescript");
          return html;
        }}
      />

      <Example<MenuProps>
        example="Menu"
        schema={MenuPropsSchema}
        render={(props) => {
          return (
            <Menu {...props}>
              <Menu.Item icon={IconName.DATABASE} text={t("Database")} />
              <Menu.Divider />
              <Menu.Item icon={IconName.COG} text={t("Settings")} />
              <Menu.Item icon={IconName.INFO_SIGN} text={t("Alert")} />
              <Menu.Divider />
              <Menu.Item rightIcon={IconName.CARET_RIGHT} text={t("Help & support")} />
            </Menu>
          );
        }}
      />

      <Example<NavbarProps>
        example="Navbar &amp; NavbarGroup &amp; NavbarHeading &amp; NavbarDivider"
        schema={NavbarPropsSchema}
        render={(props) => {
          return (
            <Navbar {...props}>
              <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>{t("Navbar heading")}</Navbar.Heading>
              </Navbar.Group>
              <Navbar.Group align={Alignment.RIGHT}>
                <Button intent={Intent.PRIMARY} minimal icon={IconName.COG} text={t("Settings")} />
                <Navbar.Divider />
                <Button intent={Intent.SUCCESS} minimal icon={IconName.INFO_SIGN} text={t("Help")} />
              </Navbar.Group>
            </Navbar>
          );
        }}
      />

      <Example<NonIdealStateProps>
        example="NonIdealState"
        schema={NonIdealStatePropsSchema}
        render={(props) => {
          return (
            <NonIdealState
              icon={props.icon || IconName.SEARCH}
              iconSize={props.iconSize || NonIdealStateIconSize.SMALL}
              title={props.title || t("No search results")}
              description={
                props.description || (
                  <div>
                    Your search didn't match any files.
                    <br />
                    Try searching for something else, or create a new file.
                  </div>
                )
              }
              action={<Button outlined icon={IconName.PLUS} text={t("New file")} intent={Intent.PRIMARY} />}
            />
          );
        }}
        code={(props) => {
          const boolProps = ["disabled"].filter((p) => !!props[p]);
          const componentProps = {
            // converted to code attributes
            class: props.class ? `"${props.class}"` : undefined,
            title: props.title ? `"${props.title}"` : `"${t("No search results")}"`,
            text: props.text ? `"${props.text}"` : undefined,
            description: props.description ? `"${props.description}"` : undefined,
            layout: layoutMap[props.layout || Layout.VERTICAL],
            iconSize: nonIdealStateIconSizeMap[props.iconSize || NonIdealStateIconSize.STANDARD],
            icon: iconsMap[props.icon || IconName.SEARCH],
          };
          const componentPropsList = Object.keys(componentProps)
            .filter((prop) => !!componentProps[prop])
            .map((prop) => {
              return `${prop}={${componentProps[prop]}}`;
            })
            .concat(boolProps);
          const codeLines = [
            // import
            `import { NonIdealState, NonIdealStateIconSize } from "@blueprint/components"`,
            `import { Layout } from "@blueprint/core"`,
            `import { IconName } from "@blueprint/icons"`,
            "",
            // component
            "const App = () => {",
            `  return (`,
            `    <NonIdealState ${componentPropsList.join("\n     ")}`,
            `    />`,
            `  )`,
            "}",
          ];
          const html = (window as any).Prism.highlight(codeLines.join("\n"), (window as any).Prism.languages.typescript, "typescript");
          return html;
        }}
      />

      <Example<ProgressBarProps>
        example="ProgressBar"
        schema={ProgressBarPropsSchema}
        render={(props) => {
          return <ProgressBar {...props} />;
        }}
        code={(props) => {
          const boolProps = ["disabled", "animate", "stripes"].filter((p) => !!props[p]);
          const componentProps = {
            // converted to code attributes
            class: props.class ? `"${props.class}"` : undefined,
            value: props.value ? `"${props.value}"` : undefined,
            intent: intentMap[props.intent || Intent.SUCCESS],
          };
          const componentPropsList = Object.keys(componentProps)
            .filter((prop) => !!componentProps[prop])
            .map((prop) => {
              return `${prop}={${componentProps[prop]}}`;
            })
            .concat(boolProps);
          const codeLines = [
            // import
            `import { ProgressBar } from "@blueprint/components"`,
            `import { Intent } from "@blueprint/core"`,
            "",
            // component
            "const App = () => {",
            `  return (`,
            `    <ProgressBar ${componentPropsList.join("\n     ")}`,
            `    />`,
            `  )`,
            "}",
          ];
          const html = (window as any).Prism.highlight(codeLines.join("\n"), (window as any).Prism.languages.typescript, "typescript");
          return html;
        }}
      />

      <Example<SpinnerProps>
        example="Spinner"
        schema={SpinnerPropsSchema}
        render={(props) => {
          return <Spinner {...props} aria-label={t("Loading...")} />;
        }}
        code={(props) => {
          const boolProps = ["disabled", "animate", "stripes"].filter((p) => !!props[p]);
          const componentProps = {
            // converted to code attributes
            class: props.class ? `"${props.class}"` : undefined,
            intent: intentMap[props.intent || Intent.SUCCESS],
            tagName: props.tagName ? `"${props.tagName}"` : undefined,
            value: props.value ? `"${props.value}"` : undefined,
            size: props.size ? `"${props.size}"` : undefined,
          };
          const componentPropsList = Object.keys(componentProps)
            .filter((prop) => !!componentProps[prop])
            .map((prop) => {
              return `${prop}={${componentProps[prop]}}`;
            })
            .concat(boolProps);
          const codeLines = [
            // import
            `import { Spinner } from "@blueprint/components"`,
            `import { Intent } from "@blueprint/core"`,
            "",
            // component
            "const App = () => {",
            `  return (`,
            `    <Spinner ${componentPropsList.join("\n     ")}`,
            `    />`,
            `  )`,
            "}",
          ];
          const html = (window as any).Prism.highlight(codeLines.join("\n"), (window as any).Prism.languages.typescript, "typescript");
          return html;
        }}
      />

      <Example<SwitchProps>
        example="Switch"
        schema={SwitchPropsSchema}
        render={(props, setProperty) => {
          return (
            <Switch
              {...props}
              label={props.label || "Click to switch state"}
              onChange={(e) => {
                setProperty("checked", e.currentTarget.checked);
              }}
            />
          );
        }}
        code={(props) => {
          const boolProps = ["disabled", "inline", "large", "checked", "inlineLabelChecked"].filter((p) => !!props[p]);
          const componentProps = {
            // converted to code attributes
            class: props.class ? `"${props.class}"` : undefined,
            label: props.label ? `"${props.label}"` : undefined,
            innerLabel: props.innerLabel ? `"${props.innerLabel}"` : undefined,
            tagName: props.tagName ? `"${props.tagName}"` : undefined,
            alignIndicator: alignmentMap[props.alignIndicator || Alignment.LEFT],
          };
          const componentPropsList = Object.keys(componentProps)
            .filter((prop) => !!componentProps[prop])
            .map((prop) => {
              return `${prop}={${componentProps[prop]}}`;
            })
            .concat(boolProps);
          const codeLines = [
            // import
            `import { Switch } from "@blueprint/components"`,
            `import { Alignment } from "@blueprint/core"`,
            "",
            // component
            "const App = () => {",
            `  return (`,
            `    <Switch ${componentPropsList.join("\n     ")}`,
            `    />`,
            `  )`,
            "}",
          ];
          const html = (window as any).Prism.highlight(codeLines.join("\n"), (window as any).Prism.languages.typescript, "typescript");
          return html;
        }}
      />

      <Example<InputGroupProps>
        example="InputGroup"
        schema={InputGroupPropsSchema}
        render={(props) => {
          return <InputGroup {...props} />;
        }}
      />

      <Example<FileInputProps>
        example="FileInput"
        schema={FileInputPropsSchema}
        render={(props) => {
          return <FileInput {...props} />;
        }}
      />

      <Example<TextProps>
        example="Text"
        schema={TextPropsSchema}
        render={(props) => {
          return (
            <div style={{ width: "300px" }}>
              <Text {...props}>
                You can change the text in the input below. Hover to see full text. If the text is long enough, then the content will overflow. This is done by setting ellipsize to
                true.
              </Text>
            </div>
          );
        }}
      />

      <Example<TagProps>
        example="Tag"
        schema={TagPropsSchema}
        render={(props) => {
          return <Tag {...props}>{t("London")}</Tag>;
        }}
        code={(props) => {
          const boolProps = ["disabled", "active", "fill", "inline", "large", "small", "minimal", "multiline", "round", "removable", "interactive"].filter((p) => !!props[p]);
          const componentProps = {
            // converted to code attributes
            class: props.class ? `"${props.class}"` : undefined,
            htmlTitle: props.htmlTitle ? `"${props.htmlTitle}"` : undefined,
            inputClassName: props.inputClassName ? `"${props.inputClassName}"` : undefined,
            intent: intentMap[props.intent || Intent.SUCCESS],
            icon: iconsMap[props.icon || IconName.HAND_RIGHT],
            rightIcon: iconsMap[(props.rightIcon as IconName) || IconName.HAND_RIGHT],
            tabIndex: props.tabIndex ? `"${props.tabIndex}"` : undefined,
          };
          const componentPropsList = Object.keys(componentProps)
            .filter((prop) => !!componentProps[prop])
            .map((prop) => {
              return `${prop}={${componentProps[prop]}}`;
            })
            .concat(boolProps);
          const codeLines = [
            // import
            `import { HTMLSelect } from "@blueprint/components"`,
            "",
            // component
            "const App = () => {",
            `  return (`,
            `    <Tag ${componentPropsList.join("\n     ")}`,
            `    />`,
            `  )`,
            "}",
          ];
          const html = (window as any).Prism.highlight(codeLines.join("\n"), (window as any).Prism.languages.typescript, "typescript");
          return html;
        }}
      />

      <Example<TabsProps>
        example="Tab"
        schema={TabsPropsSchema}
        render={(props) => {
          return (
            <div class="Example">
              <Tabs {...props} id="TabsExample">
                <Tab
                  id="TabsExampleTabID1"
                  title="Title tab 1"
                  panel={
                    <div>
                      <H4>Tab 1 header</H4>
                      <p class={Classes.RUNNING_TEXT}>Tab 1 content</p>
                    </div>
                  }
                />
                <Tab
                  id="TabsExampleTabID2"
                  title="Title tab 2"
                  panel={
                    <div>
                      <H4>Tab 2 header</H4>
                      <p class={Classes.RUNNING_TEXT}>Tab 2 content</p>
                    </div>
                  }
                />
              </Tabs>
            </div>
          );
        }}
        code={(props) => {
          const boolProps = ["disabled", "animate", "large", "renderActiveTabPanelOnly", "vertical", "fill"].filter((p) => !!props[p]);
          const componentProps = {
            class: props.class ? `"${props.class}"` : undefined,
            // converted to code attributes
            id: props.id ? `"${props.id}"` : undefined,
            selectedTabId: props.selectedTabId ? `"${props.selectedTabId}"` : undefined,
          };
          const componentPropsList = Object.keys(componentProps)
            .filter((prop) => !!componentProps[prop])
            .map((prop) => {
              return `${prop}={${componentProps[prop]}}`;
            })
            .concat(boolProps);
          const codeLines = [
            // import
            `import { Tabs, Tab, H4 } from "@blueprint/components"`,
            `import { Classes } from "@blueprint/core"`,
            "",
            // component
            "const App = () => {",
            `  return (`,
            `    <Tabs ${componentPropsList.join(" ")}>`,
            `      <Tab id="TabsExampleTabID1" title="Title tab 1">`,
            `        <H4>Tab 1 header</H4>`,
            `        <p class={Classes.RUNNING_TEXT}>Tab 1 content</p>`,
            `      </Tab>`,
            `      <Tab id="TabsExampleTabID2" title="Title tab 2">`,
            `        <H4>Tab 2 header</H4>`,
            `        <p class={Classes.RUNNING_TEXT}>Tab 2 content</p>`,
            `      </Tab>`,
            `    </Tabs>`,
            `  )`,
            "}",
          ];
          const html = (window as any).Prism.highlight(codeLines.join("\n"), (window as any).Prism.languages.typescript, "typescript");
          return html;
        }}
      />
    </div>
  );
};
(App as any).displayName = "App";

export default App;
