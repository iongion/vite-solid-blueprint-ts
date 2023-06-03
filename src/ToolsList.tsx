import type { Component } from "solid-js";

import { Props } from "@blueprint/core";
import { UL } from "@blueprint/components";

import "./ToolsList.css";

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

export const ToolsList: Component<Props> = () => {
  return (
    <UL class="Tools">
      {Tools.map((tool) => {
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
