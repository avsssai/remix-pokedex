import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { getData, getPokeData } from "data";
import { PokeAPIResp } from "types/PokeApiResponse";
import { data } from "../../dummyData";
export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export const loader = async () => {
	const pokemonList = await getData();
	// const pageData: PokeAPIResp[] = [];
	const pageData = await Promise.all(
		pokemonList.results.map(async (res) => {
			const data = await getPokeData(res.url);
			if (data !== null) {
				return data;
			}
		})
	);
	return json({ pageData });
};

export default function Index() {
	const { pageData } = useLoaderData<typeof loader>();
	console.log(pageData);
	return (
		<div className='grid grid-cols-3 bg-white mx-2 rounded-md flex-1 mb-2 overflow-y-scroll'>
			{pageData.map((item) => (
				<PokeCard key={item.id} data={item} />
			))}
		</div>
	);
}

function PokeCard({ data }: { data: PokeAPIResp }) {
	return (
		<div className='relative rounded-lg shadow-md border border-1'>
			<div className='text-gray-400 text-end px-2 py-1 text-xs font-bold right-0 absolute'>
				#{data.id.toString().padStart(3, "0")}
			</div>
			<div className='relative aspect-square'>
				<img
					className='absolute w-full h-full'
					src={data.sprites.front_default}
					alt={`picture of pokemon ${data.name}`}
				/>
			</div>
			<h4 className='text-center mt-[-16px] capitalize'>{data.name}</h4>
		</div>
	);
}
