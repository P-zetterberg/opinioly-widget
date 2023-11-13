<script>
  import { validationStatus, addKeyValuePair } from "../validationStore"
  import { updateData } from "../stores/widgetDataStore"

  let hadFocus = false
  let selectedOption = null
  let isOpen = false
  let notValid = false
  let validationLabel = null

  export let label = ""
  export let required = false
  export let options = []
  export let i

  $: if (selectedOption !== null) addKeyValuePair(i, notValid)
  $: updateData("dropdown", { selectedOption, label })
  $: if (hadFocus && !selectOption) notValid = required
  $: if (!required) {
    notValid = false
    validationLabel = null
  }

  function handleBlur(e) {
    hadFocus = true
    if (e.relatedTarget?.tagName.toLowerCase() == "li") {
      e.preventDefault()
    } else {
      if (required && !selectedOption) {
        notValid = true
        validationLabel = "Required *"
      } else {
        notValid = false
        validationLabel = null
      }
      isOpen = false
    }
  }
  function toggleDropdown() {
    hadFocus = true
    if (required && isOpen && !selectedOption) {
      notValid = true
      validationLabel = "Required *"
    } else {
      notValid = false
      validationLabel = null
    }
    isOpen = !isOpen
  }

  function selectOption(option) {
    selectedOption = option
    isOpen = false
  }
</script>

<div class="custom-select">
  <div
    role="button"
    tabindex="0"
    class="selected-option {isOpen ? 'open' : ''}{notValid ? 'error' : ''}"
    on:click={toggleDropdown}
    on:keypress={toggleDropdown}
    on:blur={handleBlur}
  >
    {selectedOption || validationLabel || `${label}${required ? " *" : ""}`}
    <span class="arrow">{isOpen ? "▲" : "▼"}</span>
  </div>

  {#if isOpen}
    <ul class="options">
      {#each options as option (option)}
        <li
          role="option"
          aria-selected="false"
          tabindex="0"
          on:click={() => selectOption(option)}
          on:keydown={() => selectOption(option)}
        >
          {option}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">
  @use "../global.scss";

  .custom-select {
    font-size: 14px;
    position: relative;
    width: 100%;
    background: #ffffff;
    border-radius: var(--border-radius);
  }

  .selected-option {
    padding: 10px;
    border: 1px solid lightgrey;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    border-radius: var(--border-radius);
    &.open {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: 1px solid #ffffff;
    }
  }

  .arrow {
    margin-left: 10px;
  }

  .options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid lightgrey;
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: fit-content;
    overflow-y: auto;
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }

  .options li {
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #e7e7e7;
  }

  .options li:hover {
    background-color: #f0f0f0;
  }
  .error {
    border-left: 5px solid var(--error);
    color: var(--error);
  }
</style>
