<script>
  import { allValuesAreTrue } from "../validationStore"
  import { feedback, inputWasSent } from "../stores/widgetDataStore"
  import Loading from "./loading.svelte"

  export let buttonText
  export let widgetId
  export let type

  let loading = false
  function postData() {
    if (type === "web") return
    loading = true
    const url = "http://localhost:3000/widget/feedback/new"
    const data = {
      widgetId: widgetId,
      feedback: $feedback,
    }
    const jsonData = JSON.stringify(data)
    const headers = {
      "Content-Type": "application/json",
    }

    fetch(url, {
      method: "POST",
      headers: headers,
      body: jsonData,
    })
      .then((response) => {
        if (response.ok) {
          loading = false
          $inputWasSent = true
          return response.json()
        } else {
          throw new Error("Request failed with status: " + response.status)
        }
      })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }
</script>

{#if loading}
  <button class="submit loading" disabled={$allValuesAreTrue}>
    <Loading small="small" />
  </button>
{:else}
  <button disabled={$allValuesAreTrue} class="submit" on:click={postData}
    >{buttonText ?? "Submit"}</button
  >
{/if}

<style>
  * {
    font-family: "Poppins", sans-serif;
    box-sizing: border-box;
  }
  .submit {
    all: unset;
    width: 100%;
    color: var(--primary-button-text, white);
    background-color: var(--primary-button, black);
    height: 45px;
    border-radius: var(--border-radius);
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-weight: 600;
    cursor: pointer;
    transition:
      background-color ease-in 150ms,
      opacity ease-in 150ms;
    text-align: center;
    min-height: 45px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px;
    transition: scale ease-in 150ms;
    &:hover {
      background-color: var(--primary-button, black);
      opacity: 0.85;
    }
    &:disabled {
      background-color: var(--primary-button, black);
      opacity: 0.3;
      cursor: not-allowed;
    }
    &:active:not(:disabled) {
      scale: 1.02;
    }
  }
  .loading {
    display: flex;
    justify-content: center;
    opacity: 0.7;
    cursor: wait;
    &:hover {
      opacity: 0.7;
    }
  }
</style>
