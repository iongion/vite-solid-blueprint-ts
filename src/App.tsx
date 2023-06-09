import { createEffect, createSignal } from "solid-js";
import type { Component } from "solid-js";
import { useI18n } from "solid-i18n";
import { Alignment, Classes, Intent, Props } from "@blueprint/core";
import { Link } from "@solidjs/meta";
// import * as y from "yup";

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
import { Icon, IconName, IconProps } from "@blueprint/icons";
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

const toCompPropsList = (props: any, propsMap: any, boolPropsList: any[], indent: number = 0) => {
  const boolProps = boolPropsList.filter((p) => !!props[p]);
  const componentPropsList = Object.keys(propsMap)
    .filter((prop) => !!propsMap[prop])
    .map((prop) => {
      return `${prop}=${propsMap[prop]}`;
    })
    .concat(boolProps || []);
  let separator = " ";
  if (indent > 0) {
    separator = "\n" + " ".repeat(indent + 2);
  }
  return componentPropsList.length ? `${separator}${componentPropsList.join(separator)}` : "";
};
const toCompPropsListFromSchema = (props: any, schema: any, indent: number = 0) => {
  const boolProps = Object.keys(schema?.fields || {})
    .filter((field) => schema.fields?.[field]?.type === "boolean")
    .sort();
  const complexProps = Object.keys(schema?.fields || {})
    .filter((field) => schema.fields?.[field]?.type !== "boolean")
    .sort();
  const componentProps = {} as any;
  complexProps.forEach((propName) => {
    const info = schema.fields[propName].describe();
    // console.debug(propName, info.meta);
    if (info.meta) {
      let propValue = undefined;
      if (info.meta.labelsMap) {
        propValue = info.meta.labelsMap[props[propName] || info.meta.defaultValue];
      } else {
        propValue = props[propName] || info.meta.defaultValue;
      }
      if (propValue !== null && propValue !== undefined) {
        componentProps[propName] = `{${propValue}}`;
      }
    } else {
      if (props[propName] !== "" && props[propName] !== undefined && props[propName] !== null) {
        componentProps[propName] = JSON.stringify(`${props[propName]}`);
      }
    }
    if (propName === "tagName") {
      if (componentProps["tagName"] === JSON.stringify(info.default)) {
        delete componentProps["tagName"];
      }
    }
  });
  return toCompPropsList(props, componentProps, boolProps, indent);
};

const highlight = (source: string | string[]) => {
  const sourceLines = Array.isArray(source) ? source : [source];
  const html = (window as any).Prism.highlight(sourceLines.join("\n"), (window as any).Prism.languages.typescript, "typescript");
  return html;
};

const App: Component = () => {
  const { t } = useI18n();
  const [count, setCount] = createSignal(0);
  const [useDarkTheme, setUseDarkTheme] = createSignal(true);
  createEffect(() => {
    document.body.classList.add(Classes.DARK);
  });
  return (
    <div class="App">
      {useDarkTheme() ? (
        <Link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.min.css" />
      ) : (
        <Link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism.min.css" />
      )}
      <ToolsList />
      <h1 class="AppHeaderTitle">Solid + BlueprintJS + Typescript + Vite</h1>
      <p class="read-the-docs">
        <span>{t("Click on the logos to learn more.")}</span>
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
            const isDark = e.currentTarget.checked;
            setUseDarkTheme(isDark);
            if (isDark) {
              document.body.classList.add(Classes.DARK);
            } else {
              document.body.classList.remove(Classes.DARK);
            }
          }}
        />
      </p>
      <Tabs class="ComponentNavigatorTabs" id="ComponentNavigator" selectedTabId="ExampleButton" vertical>
        <Tab id="ExampleAnchorButton" title={t("AnchorButton")}>
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
            code={(props, schema) => {
              const sourceLines = [
                // import
                `import { AnchorButton } from "@blueprint/components"`,
                `import { Alignment, Intent } from "@blueprint/core"`,
                `import { IconName } from "@blueprint/icons"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <AnchorButton${toCompPropsListFromSchema(props, schema, 4)}`,
                `    />`,
                `  )`,
                "}",
              ];
              return highlight(sourceLines);
            }}
          />
        </Tab>
        <Tab id="ExampleButton" title={t("Button")}>
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
            code={(props, schema) => {
              const sourceLines = [
                // import
                `import { Button } from "@blueprint/components"`,
                `import { Alignment, Intent } from "@blueprint/core"`,
                `import { IconName } from "@blueprint/icons"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <Button${toCompPropsListFromSchema(props, schema, 4)}`,
                `    />`,
                `  )`,
                "}",
              ];
              return highlight(sourceLines);
            }}
          />
        </Tab>
        <Tab id="ExampleButtonGroup" title={t("ButtonGroup")}>
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
            code={(props, schema) => {
              const sourceLines = [
                // import
                `import { ButtonGroup, Button } from "@blueprint/components"`,
                `import { Alignment, Intent } from "@blueprint/core"`,
                `import { IconName } from "@blueprint/icons"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <ButtonGroup${toCompPropsListFromSchema(props, schema)}>`,
                `       <Button intent={Intent.DANGER} icon={IconName.DATABASE} text="Danger" />`,
                `       <Button intent={Intent.SUCCESS} icon={IconName.FUNCTION} text="Success" />`,
                `       <Button intent={Intent.PRIMARY} icon={IconName.REFRESH} text="Primary" />`,
                `       <Button intent={Intent.NONE} icon={IconName.COG} text="None" />`,
                `    </ButtonGroup>`,
                `  )`,
                "}",
              ];
              return highlight(sourceLines);
            }}
          />
        </Tab>
        <Tab id="ExampleButtonGroupDP" title={t("ButtonGroup with Data Provider")}>
          <Example<ButtonGroupProps>
            example="ButtonGroup"
            schema={ButtonGroupPropsSchema}
            render={(props) => {
              return (
                <ButtonGroup
                  {...props}
                  dataProvider={() => {
                    return [
                      // items
                      { intent: Intent.DANGER, icon: IconName.DATABASE, text: t("Danger") },
                      { intent: Intent.SUCCESS, icon: IconName.FUNCTION, text: t("Success") },
                      { intent: Intent.PRIMARY, icon: IconName.REFRESH, text: t("Primary") },
                      { intent: Intent.NONE, icon: IconName.COG, text: t("None") },
                    ];
                  }}
                />
              );
            }}
            code={(props, schema) => {
              const sourceLines = [
                // import
                `import { ButtonGroup, Button } from "@blueprint/components"`,
                `import { Alignment, Intent } from "@blueprint/core"`,
                `import { IconName } from "@blueprint/icons"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <ButtonGroup${toCompPropsListFromSchema(props, schema)}`,
                `      dataProvider={() => {`,
                `        return [`,
                `          // items`,
                `          { intent: Intent.DANGER, icon: IconName.DATABASE, text: "Danger" },`,
                `          { intent: Intent.SUCCESS, icon: IconName.FUNCTION, text: "Success" },`,
                `          { intent: Intent.PRIMARY, icon: IconName.REFRESH, text: "Primary" },`,
                `          { intent: Intent.NONE, icon: IconName.COG, text: "None" },`,
                `        ];`,
                `      }}`,
                `    >`,
                `  )`,
                "}",
              ];
              return highlight(sourceLines);
            }}
          />
        </Tab>
        <Tab id="ExampleCallout" title={t("Callout")}>
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
            code={(props, schema) => {
              const sourceLines = [
                // import
                `import { Callout } from "@blueprint/components"`,
                `import { Intent } from "@blueprint/core"`,
                `import { IconName } from "@blueprint/icons"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <Callout${toCompPropsListFromSchema(props, schema, 4)}`,
                `    >`,
                `      Long-form information about the important content.`,
                `      This text is styled as <br />`,
                `      <a href="#">Running text</a>, so it may contain`,
                `      things like headers, links, lists, <Code>code</Code> etc.`,
                `    </Callout>`,
                `  )`,
                "}",
              ];
              return highlight(sourceLines);
            }}
          />
        </Tab>
        <Tab id="ExampleCard" title={t("Card")}>
          <Example<CardProps>
            example="Card"
            schema={CardPropsSchema}
            render={(props) => {
              return <Card {...props}>{t("We build products that make people better at their most important work.")}</Card>;
            }}
            code={(props, schema) => {
              const sourceLines = [
                // import
                `import { Card } from "@blueprint/components"`,
                `import { Elevation } from "@blueprint/core"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <Card${toCompPropsListFromSchema(props, schema)}>`,
                `      We build products that make people better at their most important work.`,
                `    </Card>`,
                `  )`,
                "}",
              ];
              return highlight(sourceLines);
            }}
          />
        </Tab>
        <Tab id="ExampleCode" title={t("Code")}>
          <Example<CodeProps>
            example="Code"
            schema={PropsSchema}
            render={(props) => {
              return <Code {...props}>{codeLines.join("\n")}</Code>;
            }}
            code={(props, schema) => {
              const sourceLines = [
                // import
                `import { Code } from "@blueprint/components"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <Code${toCompPropsListFromSchema(props, schema)}>`,
                `      ${codeLines.join("\n      ")}`,
                `    </Code>`,
                `  )`,
                "}",
              ];
              return highlight(sourceLines);
            }}
          />
        </Tab>
        <Tab id="ExampleCodeBlock" title={t("CodeBlock")}>
          <Example<CodeBlockProps>
            example="CodeBlock"
            schema={PropsSchema}
            render={(props) => {
              return <CodeBlock {...props}>{codeLines.join("\n")}</CodeBlock>;
            }}
            code={(props, schema) => {
              const sourceLines = [
                // import
                `import { CodeBlock } from "@blueprint/components"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <CodeBlock${toCompPropsListFromSchema(props, schema)}>`,
                `      ${codeLines.join("\n      ")}`,
                `    </CodeBlock>`,
                `  )`,
                "}",
              ];
              return highlight(sourceLines);
            }}
          />
        </Tab>
        <Tab id="ExampleCollapse" title={t("Collapse")}>
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
            code={(props, schema) => {
              const sourceLines = [
                // import
                `import { Collapse } from "@blueprint/components"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <Collapse${toCompPropsListFromSchema(props, schema)}>`,
                `      <Card>`,
                `        <CodeBlock>`,
                `          ${codeLines.join("\n          ")}`,
                `        </CodeBlock>`,
                `      </Card>`,
                `    </Collapse>`,
                `  )`,
                "}",
              ];
              return highlight(sourceLines);
            }}
          />
        </Tab>
        <Tab id="ExampleDivider" title={t("Divider")}>
          <Example<DividerProps>
            example="Divider"
            schema={DividerPropsSchema}
            render={(props) => {
              return (
                <div class="DividerContainer">
                  <Divider {...props} />
                </div>
              );
            }}
            code={(props, schema) => {
              const sourceLines = [
                // import
                `import { Divider } from "@blueprint/components"`,
                `import { Layout } from "@blueprint/core"`,
                "",
                // component
                "const App = () => {",
                `  return <Divider${toCompPropsListFromSchema(props, schema)} />`,
                "}",
              ];
              return highlight(sourceLines);
            }}
          />
        </Tab>
        <Tab id="ExampleHTMLElements" title={t("HTML Elements")}>
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
            code={(props, schema) => {
              const sourceLines = [
                // import
                `import { H1, H2, H3, H4, H5, H6, Blockquote, Label, UL, OL } from "@blueprint/components"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <div>`,
                `      <H1${toCompPropsListFromSchema(props, schema)}>H1 example</H1>`,
                `      <H2${toCompPropsListFromSchema(props, schema)}>H2 example</H2>`,
                `      <H3${toCompPropsListFromSchema(props, schema)}>H3 example</H3>`,
                `      <H4${toCompPropsListFromSchema(props, schema)}>H4 example</H4>`,
                `      <H5${toCompPropsListFromSchema(props, schema)}>H5 example</H5>`,
                `      <H6${toCompPropsListFromSchema(props, schema)}>H6 example</H6>`,
                `      <Blockquote${toCompPropsListFromSchema(props, schema)}>Blockquote example with a long text</Blockquote>`,
                `      <Label${toCompPropsListFromSchema(props, schema)} for="spanLabelTarget">`,
                `        <span>Label example with a long text</span> &nbsp;`,
                `        <input type="text" id="spanLabelTarget" />`,
                `      </Label>`,
                `      <UL${toCompPropsListFromSchema(props, schema)}>`,
                `        <li>Item 1</li>`,
                `        <li>Item 2</li>`,
                `        <li>Item 3</li>`,
                `        <li>Item 4</li>`,
                `      </UL>`,
                `      <OL${toCompPropsListFromSchema(props, schema)}>`,
                `        <li>Item 1</li>`,
                `        <li>Item 2</li>`,
                `        <li>Item 3</li>`,
                `        <li>Item 4</li>`,
                `      </OL>`,
                `    </div>`,
                `  );`,
                "}",
              ];
              return highlight(sourceLines);
            }}
          />
        </Tab>
        <Tab id="ExampleHTMLSelect" title={t("HTMLSelect")}>
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
            code={(props, schema) => {
              const sourceLines = [
                // import
                `import { HTMLSelect } from "@blueprint/components"`,
                `import { IconName } from "@blueprint/icons"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <HTMLSelect${toCompPropsListFromSchema(props, schema)}>`,
                `      <option value="option.value.1">Option label 1</option>`,
                `      <option value="option.value.2">Option label 2</option>`,
                `      <option value="option.value.3">Option label 3</option>`,
                `      <option value="option.value.4">Option label 4</option>`,
                `    </HTMLSelect>`,
                `  )`,
                "}",
              ];
              return highlight(sourceLines);
            }}
          />
        </Tab>
        <Tab id="ExampleHTMLTable" title={t("HTMLTable")}>
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
            code={(props, schema) => {
              const sourceLines = [
                // import
                `import { HTMLTable } from "@blueprint/components"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <HTMLTable${toCompPropsListFromSchema(props, schema)}>`,
                `      <thead>`,
                `        <tr>`,
                `          <th>Table header</th>`,
                `        </tr>`,
                `      </thead>`,
                `      <tbody>`,
                `        <tr>`,
                `          <td>Table row 1</td>`,
                `        </tr>`,
                `        <tr>`,
                `          <td>Table row 2</td>`,
                `        </tr>`,
                `        <tr>`,
                `          <td>Table row 3</td>`,
                `        </tr>`,
                `        <tr>`,
                `          <td>Table row 4</td>`,
                `        </tr>`,
                `      </tbody>`,
                `      <tfoot>`,
                `        <tr>`,
                `          <td>Table footer</td>`,
                `        </tr>`,
                `      </tfoot>`,
                `    </HTMLTable>`,
                `  )`,
                "}",
              ];
              return highlight(sourceLines);
            }}
          />
        </Tab>
        <Tab id="ExampleIcon" title={t("Icon")}>
          <Example<IconProps>
            example="Icon"
            schema={IconPropsSchema}
            render={(props) => {
              return <Icon {...props} />;
            }}
            code={(props, schema) => {
              const codeLines = [
                // import
                `import { Icon } from "@blueprint/icons"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <Icon${toCompPropsListFromSchema(props, schema)}/>`,
                `  )`,
                "}",
              ];
              return highlight(codeLines);
            }}
          />
        </Tab>
        <Tab id="ExampleMenu" title={t("Menu")}>
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
            code={(props, schema) => {
              const sourceLines = [
                // import
                `import { Menu } from "@blueprint/components"`,
                `import { Intent } from "@blueprint/core"`,
                `import { IconName } from "@blueprint/icons"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <Menu${toCompPropsListFromSchema(props, schema)}>`,
                `      <Menu.Item icon={IconName.DATABASE} text="Database"} />`,
                `      <Menu.Divider />`,
                `      <Menu.Item icon={IconName.COG} text="Settings"} />`,
                `      <Menu.Item icon={IconName.INFO_SIGN} text="Alert"} />`,
                `      <Menu.Divider />`,
                `      <Menu.Item rightIcon={IconName.CARET_RIGHT} text="Help &amp; support"} />`,
                `    </Menu>`,
                `  )`,
                "}",
              ];
              return highlight(sourceLines);
            }}
          />
        </Tab>
        <Tab id="ExampleNavbar" title={t("Navbar")}>
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
            code={(props, schema) => {
              const sourceLines = [
                // import
                `import { Navbar } from "@blueprint/components"`,
                `import { Alignment, Intent } from "@blueprint/core"`,
                `import { IconName } from "@blueprint/icons"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <Navbar${toCompPropsListFromSchema(props, schema)}>`,
                `      <Navbar.Group align={Alignment.LEFT}>`,
                `        <Navbar.Heading>Navbar heading</Navbar.Heading>`,
                `      </Navbar.Group>`,
                `      <Navbar.Group align={Alignment.RIGHT}>`,
                `        <Button intent={Intent.PRIMARY} minimal icon={IconName.COG} text="Settings"} />`,
                `        <Navbar.Divider />`,
                `        <Button intent={Intent.SUCCESS} minimal icon={IconName.INFO_SIGN} text="Help"} />`,
                `      </Navbar.Group>`,
                `    </Navbar>`,
                `  )`,
                "}",
              ];
              return highlight(sourceLines);
            }}
          />
        </Tab>
        <Tab id="ExampleNonIdealState" title={t("NonIdealState")}>
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
            code={(props, schema) => {
              const codeLines = [
                // import
                `import { NonIdealState, NonIdealStateIconSize } from "@blueprint/components"`,
                `import { Layout } from "@blueprint/core"`,
                `import { IconName } from "@blueprint/icons"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <NonIdealState${toCompPropsListFromSchema(props, schema, 4)}`,
                `    />`,
                `  )`,
                "}",
              ];
              return highlight(codeLines);
            }}
          />
        </Tab>
        <Tab id="ExampleProgressBar" title={t("ProgressBar")}>
          <Example<ProgressBarProps>
            example="ProgressBar"
            schema={ProgressBarPropsSchema}
            render={(props) => {
              return <ProgressBar {...props} />;
            }}
            code={(props, schema) => {
              const codeLines = [
                // import
                `import { ProgressBar } from "@blueprint/components"`,
                `import { Intent } from "@blueprint/core"`,
                "",
                // component
                "const App = () => {",
                `  return <ProgressBar${toCompPropsListFromSchema(props, schema)}/>`,
                "}",
              ];
              return highlight(codeLines);
            }}
          />
        </Tab>
        <Tab id="ExampleSpinner" title={t("Spinner")}>
          <Example<SpinnerProps>
            example="Spinner"
            schema={SpinnerPropsSchema}
            render={(props) => {
              return <Spinner {...props} aria-label={t("Loading...")} />;
            }}
            code={(props, schema) => {
              const codeLines = [
                // import
                `import { Spinner } from "@blueprint/components"`,
                `import { Intent } from "@blueprint/core"`,
                "",
                // component
                "const App = () => {",
                `  return <Spinner${toCompPropsListFromSchema(props, schema)}/>`,
                "}",
              ];
              return highlight(codeLines);
            }}
          />
        </Tab>
        <Tab id="ExampleSwitch" title={t("Switch")}>
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
            code={(props, schema) => {
              const codeLines = [
                // import
                `import { Switch } from "@blueprint/components"`,
                `import { Alignment } from "@blueprint/core"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <Switch ${toCompPropsListFromSchema(props, schema, 4)}`,
                `    />`,
                `  )`,
                "}",
              ];
              return highlight(codeLines);
            }}
          />
        </Tab>
        <Tab id="ExampleInputGroup" title={t("InputGroup")}>
          <Example<InputGroupProps>
            example="InputGroup"
            schema={InputGroupPropsSchema}
            render={(props) => {
              return <InputGroup {...props} />;
            }}
            code={(props, schema) => {
              const codeLines = [
                // import
                `import { InputGroup } from "@blueprint/components"`,
                `import { Intent } from "@blueprint/core"`,
                `import { IconName } from "@blueprint/icons"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <InputGroup${toCompPropsListFromSchema(props, schema, 4)}`,
                `    />`,
                `  )`,
                "}",
              ];
              return highlight(codeLines);
            }}
          />
        </Tab>
        <Tab id="ExampleFileInput" title={t("FileInput")}>
          <Example<FileInputProps>
            example="FileInput"
            schema={FileInputPropsSchema}
            render={(props) => {
              return <FileInput {...props} />;
            }}
            code={(props, schema) => {
              const sourceLines = [
                // import
                `import { FileInput } from "@blueprint/components"`,
                `import { Intent } from "@blueprint/core"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <FileInput${toCompPropsListFromSchema(props, schema, 4)}`,
                `    />`,
                `  )`,
                "}",
              ];
              return highlight(sourceLines);
            }}
          />
        </Tab>
        <Tab id="ExampleText" title={t("Text")}>
          <Example<TextProps>
            example="Text"
            schema={TextPropsSchema}
            render={(props) => {
              return (
                <div style={{ width: "300px" }}>
                  <Text {...props}>
                    You can change the text in the input below. Hover to see full text. If the text is long enough, then the content will overflow. This is done by setting
                    ellipsize to true.
                  </Text>
                </div>
              );
            }}
            code={(props, schema) => {
              const sourceLines = [
                // import
                `import { Text } from "@blueprint/components"`,
                `import { Intent } from "@blueprint/core"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <Text${toCompPropsListFromSchema(props, schema)}>`,
                `      You can change the text in the input below.`,
                `      Hover to see full text. If the text is long enough,`,
                `      then the content will overflow. This is done by `,
                `      setting ellipsize to true.`,
                `    </Text>`,
                `  )`,
                "}",
              ];
              return highlight(sourceLines);
            }}
          />
        </Tab>
        <Tab id="ExampleTag" title={t("Tag")}>
          <Example<TagProps>
            example="Tag"
            schema={TagPropsSchema}
            render={(props) => {
              return <Tag {...props}>{t("London")}</Tag>;
            }}
            code={(props, schema) => {
              const sourceLines = [
                // import
                `import { HTMLSelect } from "@blueprint/components"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <Tag${toCompPropsListFromSchema(props, schema, 4)}`,
                `    />`,
                `  )`,
                "}",
              ];
              return highlight(sourceLines);
            }}
          />
        </Tab>
        <Tab id="ExampleTabs" title={t("Tabs")}>
          <Example<TabsProps>
            example="Tabs"
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
            code={(props, schema) => {
              const sourceLines = [
                // import
                `import { Tabs, Tab, H4 } from "@blueprint/components"`,
                `import { Classes } from "@blueprint/core"`,
                "",
                // component
                "const App = () => {",
                `  return (`,
                `    <Tabs${toCompPropsListFromSchema(props, schema, 4)}>`,
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
              return highlight(sourceLines);
            }}
          />
        </Tab>
      </Tabs>
    </div>
  );
};
(App as any).displayName = "App";

export default App;
