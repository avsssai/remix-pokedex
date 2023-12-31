import { STATS } from "utils/constants";

export default function Stat({
	name,
	value,
	type,
}: {
	name: string;
	value: number;
	type: string;
}) {
	return (
		<div className='flex gap-8 items-center'>
			<h5 className='text-sm w-[30px] font-bold'>{STATS[name]}</h5>
			<div className='flex gap-1 flex-1 items-center'>
				<p className='text-sm w-[30px]'>{value}</p>
				<div className='relative w-full h-2 rounded'>
					<div
						style={{
							background: `var(--color-${type})`,
							width: `${value / 2}%`,
						}}
						className='absolute h-full rounded'></div>
				</div>
			</div>
		</div>
	);
}
