import "./index.scss";
import "carbon-components-svelte/css/white.css";
import type { } from "svelte";
import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    name: "world",
  },
});

export default app;
