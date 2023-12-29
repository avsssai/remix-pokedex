import { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.pokemonId, "Missing pokemon Id from params");
};
export default function PokemonPage() {
	return <section></section>;
}
