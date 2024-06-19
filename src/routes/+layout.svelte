<script>
	import { DarkMode, Footer, FooterIcon, Tooltip } from 'flowbite-svelte';
	import { GithubSolid, MailBoxSolid } from 'flowbite-svelte-icons';
	import '../app.css';
</script>

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
