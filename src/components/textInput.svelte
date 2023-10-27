<script>
  export let label = ""
  export let placeholder = ""
</script>

<div class="input__container">
  <label for="name">{label}</label>
  <input class="form__element" type="text" name="name" {placeholder} />
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
  input:focus {
    border: 1px solid black;
    outline: transparent;
  }
</style>
