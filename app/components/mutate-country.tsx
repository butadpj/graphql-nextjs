"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import { ADD_COUNTRY } from "../lib/mutations";

const names = [
  "Liam",
  "Emma",
  "Noah",
  "Olivia",
  "William",
  "Ava",
  "James",
  "Isabella",
  "Oliver",
  "Sophia",
  "Benjamin",
  "Mia",
  "Elijah",
  "Charlotte",
  "Lucas",
  "Amelia",
  "Mason",
  "Harper",
  "Logan",
  "Evelyn",
  "Alexander",
  "Abigail",
  "Ethan",
  "Emily",
  "Jacob",
  "Ella",
  "Michael",
  "Elizabeth",
  "Daniel",
  "Camila",
  "Henry",
  "Luna",
  "Jackson",
  "Sofia",
  "Sebastian",
  "Avery",
  "Aiden",
  "Mila",
  "Matthew",
  "Aria",
  "Samuel",
  "Scarlett",
  "David",
  "Penelope",
  "Joseph",
  "Layla",
  "Carter",
  "Chloe",
  "Owen",
  "Victoria",
  "Wyatt",
  "Madison",
  "John",
  "Eleanor",
  "Jack",
  "Grace",
  "Luke",
  "Nora",
  "Jayden",
  "Riley",
  "Dylan",
  "Zoey",
  "Levi",
  "Hannah",
  "Isaac",
  "Hazel",
  "Gabriel",
  "Lily",
  "Julian",
  "Ellie",
  "Mateo",
  "Violet",
  "Anthony",
  "Lillian",
  "Jaxon",
  "Zoe",
  "Grayson",
  "Stella",
  "Andrew",
  "Aurora",
  "Christopher",
  "Natalie",
  "Joshua",
  "Emilia",
  "Thomas",
  "Everly",
  "Theodore",
  "Leah",
  "Caleb",
  "Aubrey",
  "Ryan",
  "Willow",
  "Asher",
  "Addison",
  "Nathan",
  "Lucy",
  "Leo",
  "Audrey",
];

function getRandomNames(array: String[], count: number) {
  const selectedNames = [];
  const usedIndices = new Set();

  while (selectedNames.length < count) {
    const randomIndex = Math.floor(Math.random() * array.length);
    if (!usedIndices.has(randomIndex)) {
      selectedNames.push(array[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }

  return selectedNames;
}
export default function MutateCountry() {
  const queryClient = useQueryClient();

  // Example usage
  const randomNames = getRandomNames(names, 1);

  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      request(`${process.env.NEXT_PUBLIC_HOST}/api/graphql`, ADD_COUNTRY, {
        code: randomNames[0],
        name: randomNames[0],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
    },
  });

  return (
    <div style={{ textAlign: "center" }}>
      <hr />
      <h2>MUTATION</h2>
      <button disabled={isPending} onClick={() => mutate()}>
        {!isPending ? "Add country" : "Adding..."}
      </button>
    </div>
  );
}
