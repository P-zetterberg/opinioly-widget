<svelte:options customElement="op-widget" />
<script>

export let name = 'green';
export let options = ''
// export let primary = ''
export function changeColor(sheet) {
  console.log(sheet);
}

let clean = JSON.parse(options)

</script>

<main>
 <h1 part="title">kek</h1>
 <p class="subheader" part="subheader">subtest</p>
<button>{clean.msg ? clean.msg : 'default'}</button>
<p>{clean.test}</p>
<p>{name}</p>
</main>

<style>
  :host {
    --color:purple;
  }
  .subheader {
    color:var(--colors, red);
  }
  h1 {
    color:var(--color, red);
  }

main {
  position: absolute;
  bottom: 1em;
  right: 1em;
  height: 200px;
  width: 200px;
  border: 1px solid black;
}
</style>
