/** Layout along the vertical or horizontal axis. */
export const Layout = {
  VERTICAL: "vertical" as "vertical",
  HORIZONTAL: "horizontal" as "horizontal",
};
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Layout = typeof Layout[keyof typeof Layout];
