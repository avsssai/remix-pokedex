import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { getOnePokemonFromName } from "data";
import invariant from "tiny-invariant";
import { Anchor, ArrowLeft, ChevronsDown, ChevronsUp } from "react-feather";
import Tag from "~/components/Tag";
import Stat from "~/components/Stat";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.pokemonId, "Missing pokemon Id from params");
	const pokeData = await getOnePokemonFromName(params.pokemonId);
	if (!pokeData) {
		throw new Response("Not Found", { status: 404 });
	}

	return json({ pokeData });
};
export default function PokemonPage() {
	const { pokeData } = useLoaderData<typeof loader>();
	const navigate = useNavigate();
	return (
		<section className='bg-white flex-1 m-2 rounded-lg p-2'>
			<div className='flex gap-2 items-center'>
				<ArrowLeft
					onClick={() => navigate(-1)}
					color='gray'
					className='font-bold'
				/>{" "}
				<span className='text-2xl font-extrabold text-gray-500 capitalize'>
					{pokeData.name}
				</span>
			</div>
			<div className='mt-4'>
				<div className='relative aspect-square w-full h-32'>
					<img
						className='w-full h-full absolute'
						src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokeData.id}.svg`}
						alt={`image of pokemon ${pokeData.name}`}
					/>
				</div>
				<div className='flex gap-2 mt-4 justify-center'>
					{pokeData.types.map((type) => (
						<Tag name={type.type.name} />
					))}
				</div>
				<h2 className='mt-4 font-extrabold text-gray-500 text-center'>
					About
				</h2>
				<div className='mt-4 flex gap-2 justify-evenly'>
					<div className='flex items-center flex-col justify-between gap-4'>
						{" "}
						<div className='flex items-center gap-2 m-auto'>
							{" "}
							<Anchor className='text-gray-500' size={16} />
							<span className='text-sm text-gray-500 '>
								{pokeData.weight}
							</span>
						</div>
						<span className='text-xs'>Weight</span>
					</div>
					<div className='flex items-center flex-col justify-between gap-4'>
						{" "}
						<div className='flex items-center gap-2 m-auto'>
							{" "}
							<ChevronsUp className='text-gray-500' size={16} />
							<span className='text-md text-gray-500 m-auto'>
								{pokeData.height}
							</span>
						</div>
						<span className='text-xs'>Height</span>
					</div>
					<div className='flex items-center flex-col justify-between gap-4'>
						{" "}
						<div className='flex flex-1 items-center m-auto'>
							{" "}
							<div className='text-sm text-gray-500'>
								{pokeData.abilities.map((ability) => (
									<p
										key={ability.ability.name}
										className='text-center'>
										{ability.ability.name}
									</p>
								))}
							</div>
						</div>
						<span className='text-xs'>Abilities</span>
					</div>
				</div>
				<div className='mt-4 px-4'>
					<h2 className='text-xl font-extrabold text-gray-500 mb-4 text-center'>
						Base Stats
					</h2>

					<div>
						{pokeData.stats.map((stat) => (
							<Stat
								name={stat.stat.name}
								value={stat.base_stat}
								type={pokeData.types[0].type.name}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
