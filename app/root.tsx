import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
	Form,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "./tailwind.css";

export const links: LinksFunction = () => [
	...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
	{ rel: "stylesheet", href: stylesheet },
];

export default function App() {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<Meta />
				<Links />
			</head>
			<body>
				<div className='bg-red-500 h-screen flex flex-col gap-2'>
					<header className='px-2 py-4'>
						<div className='flex '>
							<div className='relative w-10 min-w-10'>
								<img
									src='/pokeball.svg'
									className='absolute w-full h-full'
									alt='pokeball logo'
								/>
							</div>
							<h3 className='text-white text-2xl font-extrabold'>
								Pokemon
							</h3>
						</div>
						<Form className='mt-4'>
							<input
								type='text'
								name='pokemon'
								placeholder='Find a pokemon...'
								className='w-full px-3 py-2 rounded-full font-bold text-gray-500 text-xl'
							/>
						</Form>
					</header>
					<Outlet />
				</div>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
