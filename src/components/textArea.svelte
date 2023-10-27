<script>
  export let label = ""
  let t = ""
  $: l = 250 - t.length
</script>

<div class="input__container">
  <label for="feedback">{label ?? "Feedback"}</label>
  <textarea
    maxlength="250"
    bind:value={t}
    spellcheck="false"
    name="feedback"
    class="form__element"
  />
  <span class="max__length">{l}</span>
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
  }
  textarea {
    border: none;
    border-radius: 5px;
    width: 100%;
    resize: vertical;
    min-height: 100px;
    font-size: 14px;
    font-weight: 300;
  }
  textarea:focus {
    outline: transparent;
    border: 1px solid black;
  }
  .max__length {
    align-self: flex-end;
    color: rgba(0, 0, 0, 0.5);
  }
</style>
