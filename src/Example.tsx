import { createContext, useContext, createUniqueId, createMemo } from "solid-js";
import type { JSX } from "solid-js";
import { createStore } from "solid-js/store";
import { Key } from "@solid-primitives/keyed";
import { destructure } from "@solid-primitives/destructure";
import * as y from "yup";
import { useI18n } from "solid-i18n";

import { Alignment, Boundary, Elevation, Intent, Layout, Position, Props } from "@blueprint/core";
import { HTMLSelect, HTMLTable, Label, NonIdealStateIconSize, Switch, InputGroup } from "@blueprint/components";
import { IconSize } from "@blueprint/icons";

import "./Example.css";

const AlignmentLabels = {
  [Alignment.LEFT]: "LEFT",
  [Alignment.CENTER]: "CENTER",
  [Alignment.RIGHT]: "RIGHT",
};
const BoundaryLabels = {
  [Boundary.START]: "START",
  [Boundary.END]: "END",
};
const ElevationLabels = {
  [Elevation.ZERO]: "ZERO",
  [Elevation.ONE]: "ONE",
  [Elevation.TWO]: "TWO",
  [Elevation.THREE]: "THREE",
  [Elevation.FOUR]: "FOUR",
};
const IntentLabels = {
  [Intent.NONE]: "NONE",
  [Intent.PRIMARY]: "PRIMARY",
  [Intent.SUCCESS]: "SUCCESS",
  [Intent.WARNING]: "WARNING",
  [Intent.DANGER]: "DANGER",
};
const LayoutLabels = {
  [Layout.HORIZONTAL]: "HORIZONTAL",
  [Layout.VERTICAL]: "VERTICAL",
};
const PositionLabels = {
  [Position.BOTTOM]: "BOTTOM",
  [Position.BOTTOM_LEFT]: "BOTTOM_LEFT",
  [Position.BOTTOM_RIGHT]: "BOTTOM_RIGHT",
  [Position.LEFT]: "LEFT",
  [Position.LEFT_BOTTOM]: "LEFT_BOTTOM",
  [Position.LEFT_TOP]: "LEFT_TOP",
  [Position.RIGHT]: "RIGHT",
  [Position.RIGHT_BOTTOM]: "RIGHT_BOTTOM",
  [Position.RIGHT_TOP]: "RIGHT_TOP",
  [Position.TOP]: "TOP",
  [Position.TOP_LEFT]: "TOP_LEFT",
  [Position.TOP_RIGHT]: "TOP_RIGHT",
};
const IconSizeLabels = {
  [IconSize.STANDARD]: "STANDARD",
  [IconSize.LARGE]: "LARGE",
  [IconSize.XL]: "XL",
  [IconSize.XXL]: "XXL",
};
const NonIdealStateIconSizeLabels = {
  [NonIdealStateIconSize.STANDARD]: "STANDARD",
  [NonIdealStateIconSize.SMALL]: "SMALL",
  [NonIdealStateIconSize.EXTRA_SMALL]: "EXTRA_SMALL",
};

const PropsLabels = {
  align: AlignmentLabels,
  alignText: AlignmentLabels,
  alignIndicator: AlignmentLabels,
  boundary: BoundaryLabels,
  intent: IntentLabels,
  elevation: ElevationLabels,
  layout: LayoutLabels,
  position: PositionLabels,
  iconSize: IconSizeLabels,
};
const ExampleComponentPropsLabels = {
  NonIdealState: {
    iconSize: NonIdealStateIconSizeLabels,
  },
  Icon: {
    size: IconSizeLabels,
  },
};

function ExampleSchemaForm<T>({
  example,
  schema,
  props,
  onPropertyChange,
}: {
  example: string;
  schema: y.ObjectSchema<any>;
  props: T;
  onPropertyChange: (name: string, value: any) => void;
}) {
  const { t } = useI18n();
  const guid = createUniqueId();
  // console.debug("context", { schema, props, setProperty });
  return (
    <form class="ExampleSchemaForm">
      <HTMLTable striped interactive>
        <thead>
          <tr>
            <th colSpan="2">{t("Properties")}</th>
          </tr>
        </thead>
        <tbody>
          <Key each={Object.keys(schema.fields)} by={(it) => it}>
            {(fieldName) => {
              const name = fieldName();
              const field = schema.fields[name];
              const desc = field.describe();
              const properties = destructure(props || { [name]: (desc as any).default });
              const isFlag = desc.type === "boolean";
              const value = createMemo(() => properties[name]() as any);
              const checked = createMemo(() => properties[name]() as boolean);
              let widget: JSX.Element | null;
              const items: string[] = (desc as any).oneOf || [];
              const identityProps = {
                id: `${name}-${guid}`,
                name: `${name}-${guid}`,
              };
              const getValueLabel = (it: string) => {
                const label = ExampleComponentPropsLabels[example]?.[name]?.[it as any] || PropsLabels[name]?.[it as any] || it;
                return label;
              };
              switch (desc.type) {
                case "mixed":
                  widget = (
                    <InputGroup
                      {...identityProps}
                      small
                      fill
                      type="text"
                      value={value()}
                      onInput={(e) => {
                        onPropertyChange(name, e.currentTarget.value);
                      }}
                    />
                  );
                  break;
                case "boolean":
                  widget = (
                    <Switch
                      {...identityProps}
                      inline
                      fill
                      label={name}
                      checked={checked()}
                      onChange={(e) => {
                        onPropertyChange(name, e.currentTarget.checked);
                      }}
                    />
                  );
                  break;
                case "number":
                  widget =
                    items.length === 0 ? (
                      <InputGroup
                        {...identityProps}
                        small
                        fill
                        type="number"
                        value={value() || "0"}
                        onInput={(e) => {
                          onPropertyChange(name, Number(e.currentTarget.value));
                        }}
                      />
                    ) : (
                      <HTMLSelect
                        fill
                        {...identityProps}
                        value={value()}
                        onChange={(e) => {
                          onPropertyChange(name, Number(e.currentTarget.value));
                        }}
                      >
                        {items.map((it) => {
                          return <option value={it}>{getValueLabel(it)}</option>;
                        })}
                      </HTMLSelect>
                    );
                  break;
                case "string":
                  if (items.length) {
                    widget = (
                      <HTMLSelect
                        fill
                        {...identityProps}
                        value={value()}
                        onChange={(e) => {
                          onPropertyChange(name, e.currentTarget.value);
                        }}
                      >
                        {items.map((it) => {
                          return <option value={it}>{getValueLabel(it)}</option>;
                        })}
                      </HTMLSelect>
                    );
                  } else {
                    widget = (
                      <InputGroup
                        {...identityProps}
                        small
                        fill
                        type="text"
                        value={value()}
                        onInput={(e) => {
                          onPropertyChange(name, e.currentTarget.value);
                        }}
                      />
                    );
                  }
                  break;
                default:
                  break;
              }
              return (
                <tr>
                  {isFlag ? (
                    <>
                      <td>&nbsp;</td>
                      <td>{widget}</td>
                    </>
                  ) : (
                    <>
                      <td>
                        <Label for={identityProps.id}>{name}</Label>
                      </td>
                      <td>{widget}</td>
                    </>
                  )}
                </tr>
              );
            }}
          </Key>
        </tbody>
      </HTMLTable>
    </form>
  );
}

export interface ExampleProps<PropsSchema extends unknown = any> extends Props {
  title?: string;
  example: string;
  schema?: y.ObjectSchema<any>;
  render?: (context: PropsSchema, setProperty: (name: string, val: any) => void) => JSX.Element;
  code?: (context: PropsSchema) => JSX.Element;
}
export function Example<T extends Props = any>(props: ExampleProps<T>) {
  const [state, setState] = createStore(props.schema?.getDefault() || {});
  const context = createContext<T>();
  const onPropertyChange = (name: string, value: any) => {
    // console.debug("Change context property", { name, value });
    setState(name, value);
  };
  return (
    <context.Provider value={state}>
      <div class="Example" data-example={props.example}>
        <div class="ExampleContent">
          <div class="ExampleComponent">
            <h2 class="ExampleComponentTitle">{props.example || props.title}</h2>
            <div class="ExampleComponentPreview">
              {props.render && props.schema
                ? (() => {
                    const ctx = useContext(context);
                    // console.debug(">>> CTX", ctx);
                    return ctx === undefined ? undefined : props.render(ctx, onPropertyChange);
                  })()
                : props.children}
            </div>
            {props.code ? (
              <div class="ExampleComponentCode">
                {(() => {
                  const ctx = useContext(context);
                  return ctx === undefined ? undefined : <pre class="language-typescript" innerHTML={props.code(ctx) as string}></pre>;
                })()}
              </div>
            ) : undefined}
          </div>
          {props.schema && context ? (
            <div class="ExampleComponentProperties">
              {(() => {
                const ctx = useContext(context);
                return ctx === undefined ? undefined : <ExampleSchemaForm<T> example={props.example} schema={props.schema} props={ctx} onPropertyChange={onPropertyChange} />;
              })()}
            </div>
          ) : null}
        </div>
      </div>
    </context.Provider>
  );
}
