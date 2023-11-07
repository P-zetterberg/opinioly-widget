import { writable } from "svelte/store"

export const feedback = writable({})

export const updateData = (key, value) => {
  feedback.update((data) => {
    // If the key exists, update the value; otherwise, add a new key-value pair
    data[key] = value
    return data
  })
}
