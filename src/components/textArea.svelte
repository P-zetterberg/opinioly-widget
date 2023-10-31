<script>
  import { validationStatus, addKeyValuePair } from "../validationStore"

  let notValid = false
  let value = ""

  export let label = ""
  export let placeholder = ""
  export let required = false
  export let i

  $: l = 250 - value.length

  function handleInput(event) {
    if (!required) return
    value = event.target.value
    notValid = value.length === 0
    addKeyValuePair(i, notValid)
  }
  //
  function handleBlur() {
    if (!required) return
    notValid = value.length === 0
    addKeyValuePair(i, notValid)
  }
</script>

<div class="input__container">
  <div class="flex">
    <label for="feedback">{label ?? "Feedback"}</label>
    <span class="max__length">{l}</span>
  </div>
  <textarea
    {required}
    on:blur={handleBlur}
    on:input={handleInput}
    placeholder={notValid ? "Required" : placeholder}
    maxlength="250"
    bind:value
    spellcheck="false"
    name="feedback"
    class="form__element {notValid ? 'error' : ''}"
  />
</div>

<style lang="scss">
  * {
    font-family: "Poppins", sans-serif;
    box-sizing: border-box;
  }
  .input__container {
    display: flex;
    flex-direction: column;

    label {
      font-weight: 600;
      align-self: start;
    }
  }
  .form__element {
    border: 1px solid;
    border-radius: var(--border-radius);
    border-color: lightgrey;
    background: #ffffff;
    height: 45px;
    padding: 5px;
    transition: border-color ease-in 150ms;
    &.error {
      border-left: 5px solid var(--error);
      color: var(--error);

      &::placeholder {
        opacity: 1;
      }
    }
  }
  textarea {
    border: none;
    border-radius: var(--border-radius);
    width: 100%;
    resize: vertical;
    min-height: 100px;
    font-size: 14px;
    font-weight: 300;
  }
  textarea:focus {
    outline: transparent;
    border: 1px solid rgba(0, 0, 0, 0.5);
  }
  .max__length {
    align-self: flex-end;
    color: rgba(0, 0, 0, 0.5);
  }
  .flex {
    display: flex;
    justify-content: space-between;
  }
</style>
