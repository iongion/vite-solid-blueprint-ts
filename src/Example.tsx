import { createContext, useContext } from "solid-js";
import type { JSX } from "solid-js";
import { createStore } from "solid-js/store";
import { Key } from "@solid-primitives/keyed";
import * as y from "yup";
import { useI18n } from "solid-i18n";
import { v4 } from "uuid";

import { Props } from "@blueprint/core";
import { HTMLTable, Label } from "@blueprint/components";

import "./Example.css";

function SchemaForm<T>({ schema, props, onPropertyChange }: { schema: y.ObjectSchema<any>; props: T; onPropertyChange: (name: string, value: any) => void }) {
  const { t } = useI18n();
  const guid = v4();
  // console.debug("context", { schema, props, setProperty });
  return (
    <form class="ExampleSchemaForm">
      <HTMLTable compact striped interactive>
        <thead>
          <tr>
            <th>{t("Property")}</th>
            <th>{t("Value")}</th>
          </tr>
        </thead>
        <tbody>
          <Key each={Object.keys(schema.fields)} by={(it) => it}>
            {(fieldName) => {
              const name = fieldName();
              const field = schema.fields[name];
              const desc = field.describe();
              const value = (props?.[name] as any) || (desc as any).default;
              let widget: JSX.Element | null;
              const items: string[] = (desc as any).oneOf || [];
              // console.debug(name, value, { desc, field }, items);
              // console.debug("render form input", name, value);
              const identityProps = {
                id: `${name}-${guid}`,
                name: `${name}-${guid}`,
              };
              switch (desc.type) {
                case "boolean":
                  widget = (
                    <input
                      {...identityProps}
                      type="checkbox"
                      checked={value || false}
                      onChange={(e) => {
                        onPropertyChange(name, e.currentTarget.checked);
                      }}
                    />
                  );
                  break;
                case "number":
                  widget = (
                    <input
                      {...identityProps}
                      type="number"
                      value={value || undefined}
                      onChange={(e) => {
                        onPropertyChange(name, Number(e.currentTarget.value));
                      }}
                    />
                  );
                  break;
                case "string":
                  if (items.length) {
                    widget = (
                      <select
                        {...identityProps}
                        value={value || undefined}
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
                        value={value || ""}
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
                  <td>
                    <Label for={name}>{name}</Label>
                  </td>
                  <td>{widget}</td>
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
  render?: (context: PropsSchema) => JSX.Element;
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
        <h2 class="AppExampleTitle">{example || title}</h2>
        <div class="AppExampleContent">
          <div class="AppExampleComponentPreview">
            {render && schema
              ? (() => {
                  const ctx = useContext(context);
                  // console.debug(">>> CTX", ctx);
                  return ctx === undefined ? undefined : render(ctx);
                })()
              : children}
          </div>
          {schema && context ? (
            <div class="AppExampleComponentProperties">
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
