import { createContext, useContext, createUniqueId, createMemo } from "solid-js";
import type { JSX } from "solid-js";
import { createStore } from "solid-js/store";
import { Key } from "@solid-primitives/keyed";
import { destructure } from "@solid-primitives/destructure";
import * as y from "yup";
import { useI18n } from "solid-i18n";

import { Props } from "@blueprint/core";
import { HTMLTable, Label } from "@blueprint/components";

import "./Example.css";

function SchemaForm<T>({ schema, props, onPropertyChange }: { schema: y.ObjectSchema<any>; props: T; onPropertyChange: (name: string, value: any) => void }) {
  const { t } = useI18n();
  const guid = createUniqueId();
  // console.debug("context", { schema, props, setProperty });
  return (
    <form class="ExampleSchemaForm">
      <HTMLTable compact interactive>
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
              const values = destructure(props || { [name]: (desc as any).default });
              const value = createMemo(() => values[name]() as any);
              let widget: JSX.Element | null;
              const items: string[] = (desc as any).oneOf || [];
              // console.debug(name, value, { desc, field }, items);
              // console.debug("render form input", name, value);
              const identityProps = {
                id: `${name}-${guid}`,
                name: `${name}-${guid}`,
              };
              const isFlag = desc.type === "boolean";
              switch (desc.type) {
                case "boolean":
                  widget = (
                    <input
                      {...identityProps}
                      type="checkbox"
                      checked={value()}
                      onInput={(e) => {
                        onPropertyChange(name, e.currentTarget.checked);
                      }}
                    />
                  );
                  break;
                case "number":
                  widget =
                    items.length === 0 ? (
                      <input
                        {...identityProps}
                        type="number"
                        value={value()}
                        onInput={(e) => {
                          onPropertyChange(name, Number(e.currentTarget.value));
                        }}
                      />
                    ) : (
                      <select
                        {...identityProps}
                        value={value()}
                        onChange={(e) => {
                          onPropertyChange(name, Number(e.currentTarget.value));
                        }}
                      >
                        {items.map((it) => {
                          return <option value={it}>{it}</option>;
                        })}
                      </select>
                    );
                  break;
                case "string":
                  if (items.length) {
                    widget = (
                      <select
                        {...identityProps}
                        value={value()}
                        onChange={(e) => {
                          onPropertyChange(name, e.currentTarget.value);
                        }}
                      >
                        {items.map((it) => {
                          return <option value={it}>{it}</option>;
                        })}
                      </select>
                    );
                  } else {
                    widget = (
                      <input
                        {...identityProps}
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
                      <td>
                        <Label for={identityProps.id}>
                          {widget} {name}
                        </Label>
                      </td>
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
}
export function Example<T extends Props = any>({ title, example, children, schema, render }: ExampleProps<T>) {
  const [state, setState] = createStore(schema?.getDefault() || {});
  const context = createContext<T>();
  const onPropertyChange = (name: string, value: any) => {
    console.debug("Change context property", { name, value });
    setState(name, value);
  };
  return (
    <context.Provider value={state}>
      <div class="Example" data-example={example}>
        <div class="ExampleContent">
          <div class="ExampleComponent">
            <h2 class="ExampleComponentTitle">{example || title}</h2>
            <div class="ExampleComponentPreview">
              {render && schema
                ? (() => {
                    const ctx = useContext(context);
                    // console.debug(">>> CTX", ctx);
                    return ctx === undefined ? undefined : render(ctx, onPropertyChange);
                  })()
                : children}
            </div>
          </div>
          {schema && context ? (
            <div class="ExampleComponentProperties">
              {(() => {
                const ctx = useContext(context);
                return ctx === undefined ? undefined : <SchemaForm<T> schema={schema} props={ctx} onPropertyChange={onPropertyChange} />;
              })()}
            </div>
          ) : null}
        </div>
      </div>
    </context.Provider>
  );
}
