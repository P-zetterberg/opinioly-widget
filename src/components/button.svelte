<script>
  import { allValuesAreTrue } from "../validationStore"
  import { feedback } from "../stores/widgetDataStore"

  export let buttonText
  export let widgetId

  function postData() {
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

<button disabled={$allValuesAreTrue} class="submit" on:click={postData}
  >{buttonText ?? "Submit"}</button
>

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
    transition: background-color ease-in 150ms, opacity ease-in 150ms;
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
</style>
