import { AllPokemonResp } from "types/AllPokemonResp";
import { PokeAPIResp } from "types/PokeApiResponse";

export const URL = `https://pokeapi.co/api/v2/pokemon/`;

export const getData = async (): Promise<AllPokemonResp> => {
	try {
		const data = await fetch(URL);
		const json = await data.json();
		return json;
	} catch (error: any) {
		return error;
	}
};
export const getPokeData = async (URL: string): Promise<PokeAPIResp | null> => {
	try {
		const res = await fetch(URL);
		if (res.ok) {
			const json = await res.json();
			return json;
		} else {
			console.log(`Error for URL:${URL}, ${res.status}`);
			return null;
		}
	} catch (error: any) {
		console.log(`Error for URL:${URL}, ${error.message}`);
		return null;
	}
};
