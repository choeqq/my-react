import test from "ava";
import browserEnv from "browser-env";
import { render } from "../src/didact";

browserEnv(["document"]);

test.beforeEach((t) => {
  let root = document.getElementById("root");
  if (!root) {
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  }
  t.context.root = root;
});

test("render div", (t) => {
  const root = t.context.root;
  const element = {
    type: "div",
    props: {},
  };
  render(element, root);
  t.is(root.innerHTML, "<div></div>");
});
