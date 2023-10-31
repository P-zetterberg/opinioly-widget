import { writable, derived } from "svelte/store"

// Create a writable store
export const validationStatus = writable({})

export function addKeyValuePair(key, value) {
  validationStatus.update((current) => {
    return { ...current, [key]: value }
  })
}
export const allValuesAreTrue = derived(validationStatus, ($object) => {
  for (const key in $object) {
    if ($object[key] !== false) {
      return true
    }
  }
  return false
})
