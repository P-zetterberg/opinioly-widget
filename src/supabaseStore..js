import { writable, readable } from "svelte/store"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://foebhsyjevotvveomyop.supabase.co"
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

//signUp()
// await signInWithEmail()
// const {
//   data: { user },
// } = await supabase.auth.getUser()
// let metadata = user
// console.log(metadata)
// const { data, error } = await supabase
//   .from("test")
//   .insert({ country: "Denmark" })
//   .select()

// async function signInWithEmail() {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email: "pontus@zetterberg.io",
//     password: "qew123w2",
//   })
//   // console.log(data);
// }
// async function signUp() {
//   const { data, error } = await supabase.auth.signUp({
//     email: "pontus@zetterberg.io",
//     password: "qew123w2",
//     options: {
//       data: {
//         full_name: "Porre",
//         avatar_url: "www.example.com",
//       },
//     },
//   })
// }
