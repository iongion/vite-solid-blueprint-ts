import { createSignal } from "solid-js";
import type { Component } from "solid-js";
import { useI18n } from "solid-i18n";

import { Alignment, Classes, Elevation, Intent, Props } from "@blueprint/core";
import {
  Button,
  ButtonGroup,
  Callout,
  Card,
  Code,
  CodeBlock,
  CollapseProps,
  Collapse,
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
  HTMLTableProps,
  HTMLTable,
  NonIdealStateIconSize,
  NonIdealStateProps,
  NonIdealState,
  ProgressBarProps,
  ProgressBar,
  SpinnerProps,
  Spinner,
} from "@blueprint/components";
import {
  CollapsePropsSchema,
  MenuPropsSchema,
  NavbarPropsSchema,
  HTMLTablePropsSchema,
  NonIdealStatePropsSchema,
  ProgressBarPropsSchema,
  SpinnerPropsSchema,
} from "@blueprint/schema";
import { IconName } from "@blueprint/icons";
import { Example } from "./Example";

import "./App.css";

interface ITool {
  tool: string;
  logo: string;
  url: string;
}

const Tools: ITool[] = [
  { tool: "Solid", logo: "/images/solid.svg", url: "https://solidjs.org" },
  {
    tool: "BlueprintJS",
    logo: "/images/blueprint.svg",
    url: "https://blueprintjs.com",
  },
  {
    tool: "Typescript",
    logo: "/images/typescript.svg",
    url: "https://www.typescriptlang.org",
  },
  { tool: "Vite", logo: "/images/vite.svg", url: "https://vitejs.dev" },
];
interface ToolsListProps extends Props {
  tools: ITool[];
}
const ToolsList: Component<ToolsListProps> = ({ tools }) => {
  return (
    <UL class="Tools">
      {tools.map((tool) => {
        return (
          <li>
            <a href={tool.url} target="_blank">
              <img class="logo" src={tool.logo} alt={tool.tool} />
            </a>
          </li>
        );
      })}
    </UL>
  );
};

const codeLines = [
  "[11:53:30] Finished 'typescript-bundle-blueprint' after 769 ms",
  "[11:53:30] Starting 'typescript-typings-blueprint'...",
  "[11:53:30] Finished 'typescript-typings-blueprint' after 198 ms",
  "[11:53:30] write ./blueprint.css",
  "[11:53:30] Finished 'sass-compile-blueprint' after 2.84 s",
];

const App: Component = () => {
  const { t } = useI18n();
  const [count, setCount] = createSignal(0);
  // const [spinnerSize, setSpinnerSize] = createSignal(50);
  // const [spinnerIntent, setSpinnerIntent] = createSignal(Intent.NONE);
  return (
    <div class={`App ${Classes.DARK}`}>
      <ToolsList tools={Tools} />
      <h1 class="AppHeaderTitle">Solid + BlueprintJS + Typescript + Vite</h1>
      <p class="read-the-docs">Click on the logos to learn more</p>
      <Example example="Button">
        <Button
          intent={Intent.SUCCESS}
          icon={IconName.HAND_RIGHT}
          rightIcon={IconName.PLUS}
          text={t("Count is {count}", { count: count() })}
          onClick={() => {
            setCount((count) => count + 1);
          }}
        />
      </Example>
      <Example example="ButtonGroup">
        <ButtonGroup>
          <Button intent={Intent.DANGER} icon={IconName.DATABASE} text="Danger" />
          <Button intent={Intent.SUCCESS} icon={IconName.FUNCTION} text="Success" />
          <Button intent={Intent.PRIMARY} icon={IconName.REFRESH} text="Primary" />
          <Button intent={Intent.NONE} icon={IconName.COG} text="None" />
        </ButtonGroup>
      </Example>
      <Example example="Callout">
        <Callout intent={Intent.SUCCESS} icon={IconName.REFRESH} title="Visually important content">
          Long-form information about the important content. This text is styled as <br />
          <a href="#">Running text</a>, so it may contain things like headers, links, lists, <Code>code</Code> etc.
        </Callout>
      </Example>
      <Example example="Card">
        <Card elevation={Elevation.FOUR} interactive>
          We build products that make people better at their most important work.
        </Card>
      </Example>
      <Example example="Code">
        <Code>{codeLines.join("\n")}</Code>
      </Example>
      <Example example="CodeBlock">
        <CodeBlock>{codeLines.join("\n")}</CodeBlock>
      </Example>
      <Example example="Collapse"></Example>

      <Example<CollapseProps>
        example="ProgressBar"
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

      <Example example="HTML Elements">
        <H1>H1 example</H1>
        <H2>H2 example</H2>
        <H3>H3 example</H3>
        <H4>H4 example</H4>
        <H5>H5 example</H5>
        <H6>H6 example</H6>
        <Blockquote>Blockquote example with a long text</Blockquote>
        <Label htmlFor="spanLabelTarget">
          <span>Label example with a long text</span> &nbsp;
          <input type="text" id="spanLabelTarget" />
        </Label>
        <UL>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
        </UL>
        <OL>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
        </OL>
      </Example>
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
      <Example<NonIdealStateProps>
        example="NonIdealState"
        schema={NonIdealStatePropsSchema}
        render={(props) => {
          return (
            <NonIdealState
              icon={IconName.SEARCH}
              iconSize={props.iconSize || NonIdealStateIconSize.SMALL}
              title={props.title || t("No search results")}
              description={
                <div>
                  Your search didn't match any files.
                  <br />
                  Try searching for something else, or create a new file.
                </div>
              }
              action={<Button outlined icon={IconName.PLUS} text={t("New file")} intent={Intent.PRIMARY} />}
            />
          );
        }}
      />
      <Example<ProgressBarProps>
        example="ProgressBar"
        schema={ProgressBarPropsSchema}
        render={(props) => {
          return <ProgressBar {...props} />;
        }}
      />
      <Example<SpinnerProps>
        example="Spinner"
        schema={SpinnerPropsSchema}
        render={(props) => {
          return <Spinner {...props} aria-label={t("Loading...")} />;
        }}
      />
    </div>
  );
};
(App as any).displayName = "App";

export default App;
