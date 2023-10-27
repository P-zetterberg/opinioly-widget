<script>
  import TextArea from "./components/textArea.svelte"
  import TextInput from "./components/textInput.svelte"
  import Description from "./components/description.svelte"
  export let type = ""
  export let msg = ""
  export let label = ""
  export let placeholder = ""
</script>

{#if type === "textinput"}
  <TextInput {label} {placeholder} />
{:else if type === "textarea"}
  <TextArea {label} />
{:else}
  <Description {msg} />
{/if}
