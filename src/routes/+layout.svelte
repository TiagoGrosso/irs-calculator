<script>
	import { DarkMode, Footer, FooterIcon, Tooltip } from 'flowbite-svelte';
	import { GithubSolid, MailBoxSolid } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';

	import '../app.css';
	import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
	openGraph={{
		url: `${$page.url.protocol}//${$page.url.host}`,
		type: 'website',
		images: [
			{
				url: `${$page.url.protocol}//${$page.url.host}/thumbnail.png`,
				width: 1200,
				height: 630
			}
		],
		title: 'Calculadora IRS',
		description:
			'Calculadora de IRS AnualUma aplicação web simples para calcular o teu IRS (em Portugal) e comparar alteração no imposto. Nao tem em conta as deduções, regimes especiais em que possas estar inserido ou outras fontes de rendimento.'
	}}
/>

<header>
	<DarkMode />
</header>

<slot></slot>

<Footer footerType="socialmedia" class="my-4">
	<div class="mx-auto max-w-screen-xl text-center">
		<span class="text-xs dark:text-white">Built as open source in 2024 by Tiagop</span>
		<div class="mt-3 flex justify-center space-x-6 rtl:space-x-reverse">
			<FooterIcon href="https://github.com/TiagoGrosso/irs-calculator" target="_blank">
				<GithubSolid
					class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
				/>
				<Tooltip>Source code</Tooltip>
			</FooterIcon>
			<FooterIcon href="mailto:tiagop.grosso@gmail.com">
				<MailBoxSolid
					class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
				/>
				<Tooltip>Email me!</Tooltip>
			</FooterIcon>
		</div>
	</div></Footer
>
