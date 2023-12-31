export default function Tag({ name }: { name: string }) {
	return (
		<span
			className='rounded-full p-2 text-white font-extrabold flex items-center justify-center capitalize'
			style={{ background: `var(--color-${name})` }}>
			{name}
		</span>
	);
}
