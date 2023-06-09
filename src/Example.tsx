import { createContext, useContext, createUniqueId, createMemo, createSignal, Show } from "solid-js";
import type { JSX } from "solid-js";
import { createStore } from "solid-js/store";
import { Key } from "@solid-primitives/keyed";
import { destructure } from "@solid-primitives/destructure";
import * as y from "yup";
import { useI18n } from "solid-i18n";

import { Props } from "@blueprint/core";
import { HTMLSelect, HTMLTable, Label, Switch, InputGroup } from "@blueprint/components";

import "./Example.css";

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
    <form class="ExampleSchemaForm" data-example={example}>
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
              // console.debug(name, (desc as any).meta);
              const properties = destructure(props || { [name]: (desc as any).default });
              const isFlag = desc.type === "boolean";
              const value = createMemo(() => {
                const decoded = properties[name]() as any;
                const defaultValue = (desc as any).meta?.defaultValue;
                return decoded || defaultValue;
              });
              const checked = createMemo(() => properties[name]() as boolean);
              let widget: JSX.Element | null;
              const items: string[] = (desc as any).oneOf || [];
              const identityProps = {
                id: `${name}-${guid}`,
                name: `${name}-${guid}`,
              };
              const getValueLabel = (it: string) => {
                const label = it as any;
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
                        data-value={value()}
                        value={value()}
                        onChange={(e) => {
                          onPropertyChange(name, Number(e.currentTarget.value));
                        }}
                      >
                        {items.map((it) => {
                          return (
                            <option selected={it === value()} value={it}>
                              {getValueLabel(it)}
                            </option>
                          );
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
                        data-value={value()}
                        onChange={(e) => {
                          onPropertyChange(name, e.currentTarget.value);
                        }}
                      >
                        {items.map((it) => {
                          return (
                            <option selected={it === value()} value={it}>
                              {getValueLabel(it)}
                            </option>
                          );
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
  code?: (context: PropsSchema, schema?: y.ObjectSchema<any>) => JSX.Element;
  dataProviderCode?: (context: PropsSchema, schema?: y.ObjectSchema<any>) => JSX.Element;
}
export function Example<T extends Props = any>(props: ExampleProps<T>) {
  const [useDataProvider, setUseDataProvider] = createSignal(false);
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
            <div class="ExampleComponentHeader">
              <h2 class="ExampleComponentTitle">{props.example || props.title}</h2>
              <Switch
                class="ExampleComponentDataProviderToggle"
                innerLabel="off"
                innerLabelChecked="on"
                disabled={props.dataProviderCode === undefined}
                checked={useDataProvider()}
                label="dataProvider"
                title="This component accepts a function or an array of objects as data provider"
                onChange={(e) => {
                  setUseDataProvider(e.currentTarget.checked);
                }}
              />
            </div>
            <div class="ExampleComponentPreview">
              {props.render && props.schema
                ? (() => {
                    const ctx = useContext(context);
                    // console.debug(">>> CTX", ctx);
                    return ctx === undefined ? undefined : props.render(ctx, onPropertyChange);
                  })()
                : props.children}
            </div>
            <div class="ExampleComponentCode">
              <Show when={useDataProvider()}>
                {(() => {
                  const ctx = useContext(context);
                  if (ctx === undefined) return;
                  const renderer = props.dataProviderCode || props.code;
                  if (renderer) {
                    return <pre class="language-typescript" innerHTML={renderer(ctx, props.schema) as string}></pre>;
                  }
                })()}
              </Show>
              <Show when={!useDataProvider()}>
                {(() => {
                  const ctx = useContext(context);
                  if (ctx === undefined) return;
                  if (props.code) {
                    return <pre class="language-typescript" innerHTML={props.code(ctx, props.schema) as string}></pre>;
                  }
                })()}
              </Show>
            </div>
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
