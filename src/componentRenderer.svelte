<script>
  import TextArea from "./components/textArea.svelte"
  import TextInput from "./components/textInput.svelte"
  import Description from "./components/description.svelte"
  import Dropdown from "./components/dropdown.svelte"
  i
  export let type = ""
  export let msg = ""
  export let label = ""
  export let placeholder = ""
  export let required = false
  export let options = []
  export let i
</script>

{#if type === "textinput"}
  <TextInput {label} {placeholder} {required} {i} />
{:else if type === "textarea"}
  <TextArea {label} {required} {placeholder} {i} />
{:else if type === "dropdown"}
  <Dropdown {label} {required} {options} {i} />
{:else}
  <Description {msg} />
{/if}
