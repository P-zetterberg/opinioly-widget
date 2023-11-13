<script>
  import { addKeyValuePair } from "../validationStore"
  import { updateData } from "../stores/widgetDataStore"

  let hadFocus = false
  let notValid = false
  let value = ""

  $: updateData("textinput", { value, label })
  $: if (hadFocus) notValid = required
  $: if (!required) {
    notValid = false
    hadFocus = false
  }

  export let label = ""
  export let placeholder = ""
  export let required = false
  export let i

  function handleInput(event) {
    if (!required) return
    value = event.target.value
    notValid = value.length === 0
    addKeyValuePair(i, notValid)
    hadFocus = true
  }

  function handleBlur() {
    if (!required) return
    notValid = value.length === 0
    addKeyValuePair(i, notValid)
    hadFocus = true
  }
</script>

<div class="input__container">
  <label for="name">{label} {required ? "*" : ""}</label>
  <input
    on:blur={handleBlur}
    on:input={handleInput}
    class="form__element {notValid ? 'error' : ''}"
    type="text"
    name="name"
    bind:value
    placeholder={notValid ? "Required" : placeholder}
    {required}
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
    border-radius: 0px;
    border-color: lightgrey;
    background: #ffffff;
    height: 45px;
    padding: 5px;
    transition: border-color ease-in 150ms;
    border-radius: var(--border-radius);
    font-size: 14px;

    &.error {
      border-left: 5px solid var(--error);
      color: var(--error);

      &::placeholder {
        opacity: 1;
      }
    }
  }
  input:focus {
    border: 1px solid rgba(0, 0, 0, 0.5);
    outline: transparent;
  }
</style>
