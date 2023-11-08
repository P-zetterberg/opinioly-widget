<svelte:options customElement="opinioly-widget" />

<script>
  import { onMount } from "svelte"
  // import { supabase } from "./supabaseStore."
  import ComponentRenderer from "./componentRenderer.svelte"
  import Loading from "./components/loading.svelte"
  import { addKeyValuePair } from "./validationStore"
  import Submit from "./components/button.svelte"
  import json from "../jsonSchema.js"

  export let widgetId
  export const webData = json
  export let type = ""

  let widget = {}
  let wData = []
  let toggle = true
  let loading = false
  let buttonText

  async function getData(id) {
    if (type === "web") return
    const res = await fetch(`http://localhost:3000/widget/get?id=${id}`)
    widget = await res.json()
    wData = JSON.parse(widget.data).data
    loading = false
    buttonText = widget?.data?.buttonText
    wData.forEach((item, i) => {
      if (item.type !== "description") addKeyValuePair(i, item.required)
    })
  }

  onMount(async () => {
    getData(widgetId)
    if (type === "web") {
      widget = webData
      wData = webData.data
      loading = false
    }
  })
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@1,900&family=League+Gothic&family=Montserrat:wght@100;300&family=Poppins:wght@100;200;300;400;500;600;700;900&family=Roboto:wght@300;400;500;700;900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="container">
  <main class={toggle ? "open" : "closed"} part={type === "web" ? "main" : ""}>
    <div class="top-section">
      <h1 class="title">Give feedback</h1>
    </div>
    <div class="content-container">
      <div class="content" style={loading ? "justify-content:center;" : ""}>
        {#if !loading}
          <!-- Värt att göra spread här? om fler? -->
          {#each wData as { type, msg, label, placeholder, options, required }, i}
            <ComponentRenderer
              {type}
              {msg}
              {label}
              {placeholder}
              {options}
              {required}
              {i}
            />
          {/each}
          <Submit {buttonText} {widgetId} {type} />
        {:else}
          <Loading />
        {/if}
      </div>
    </div>
    <a href="http://example.com" class="branding-bar">
      <p>Powered by Opinioly</p>
    </a>
  </main>
  <button class="toggle" on:click={() => (toggle = !toggle)}>Feedback</button>
</div>

<style lang="scss">
  @use "./global.scss";

  // * {
  //   box-sizing: border-box;
  //   font-family: "Poppins", sans-serif;
  // }
  .top-section {
    text-align: center;
    height: 75px;
    width: var(--width);
    padding: 1em;
    background-color: var(--primary-color, black);
  }
  .content-container {
    overflow: scroll;
    height: min(500px, 100% - 100px);
    min-height: 80px;
    max-height: 500px;
    max-width: 400px;
  }
  .content {
    padding: 1em;
    height: 100%;
    max-height: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .top-section h1 {
    margin: 0;
    color: var(--primary-text, white);
    font-weight: 600;
  }

  main {
    --_width: 400px;
    z-index: 57678965;
    position: fixed;
    inset: var(--top, auto) var(--right, auto) var(--bottom, auto)
      var(--left, auto);
    transform-origin: right bottom 0px;
    min-height: 80px;
    width: var(--_width);
    max-height: 500px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 40px;
    background-color: #f3f4f6;
    opacity: 1;
    transition: width 200ms ease 0s, height 200ms ease 200ms,
      max-height 200ms ease 0s, transform 300ms cubic-bezier(0, 1.2, 1, 1) 0s,
      opacity 83ms ease-out 0s;
    pointer-events: all;
  }

  .closed {
    opacity: 0;
    width: 0;
    height: 0;
    max-height: 0;
    pointer-events: none;
  }
  .open {
    border-radius: var(--frame-radius);
  }
  .branding-bar {
    --_width: 400px;
    all: unset;
    height: 25px;
    color: rgb(197, 197, 197);
    cursor: pointer;
    width: var(--_width);
    text-align: center;
    margin-top: 4px;
    display: block;
    transition: background-color ease-in-out 150ms;
  }

  .branding-bar:hover {
    background-color: rgb(238, 238, 238);
  }
  .branding-bar p {
    margin: 0;
    font-size: 14px;
  }
  .toggle {
    all: unset;
    position: absolute;
    height: 25px;
    min-width: 25px;
    width: fit-content;
    inset: var(--toggle-top, auto) var(--toggle-right, auto)
      var(--toggle-bottom, auto) var(--toggle-left, auto);
    background-color: var(--toggle-background, black);
    border-radius: var(--border-radius);
    color: var(--toggle-text, white);
    z-index: 2147483000;
    padding: 0.5em;
    line-height: 1;
    letter-spacing: 0.05em;
    font-weight: 600;
    cursor: pointer;
    transition: scale ease-in-out 200ms;
  }
  .toggle:hover {
    // background-color: rgba(0, 0, 0, 0.8);
    scale: 1.1;
  }

  @media only screen and (max-width: 400px) {
    :host {
      --width: 100vw;
    }
    main {
      width: 100vw;
      right: 0;
    }
  }
</style>
