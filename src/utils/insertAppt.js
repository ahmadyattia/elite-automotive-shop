import { supabase } from "./supabase";

export default async function insertAppt(appt) {
  const { data, error } = await supabase
    .from("appointments")
    .insert(appt)
    .select();

  if (error) {
    console.error(error);
  }

  console.log(error, "here!");
  return error;
}
