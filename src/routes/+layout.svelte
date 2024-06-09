<script>
	import { DarkMode, Footer, FooterCopyright, FooterIcon, Tooltip} from 'flowbite-svelte';
	import {  GithubSolid, MailBoxSolid } from 'flowbite-svelte-icons';
	import '../app.css';
</script>

<header>
	<DarkMode />
</header>

<slot></slot>

<Footer footerType="socialmedia" class="my-4">
	<div class="mx-auto max-w-screen-xl text-center">
		<span class="dark:text-white text-xs">Built as open source in 2024 by Tiagop</span>
		<div class="flex space-x-6 rtl:space-x-reverse justify-center mt-3">
		  <FooterIcon href="https://github.com/TiagoGrosso/irs-calculator">
			<GithubSolid class="w-5 h-5 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white" />
			<Tooltip>Source code</Tooltip>
		  </FooterIcon>
		  <FooterIcon href="mailto:tiagop.grosso@gmail.com">
			<MailBoxSolid class="w-5 h-5 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white" />
			<Tooltip>Email me!</Tooltip>
		  </FooterIcon>
	</div>
</Footer>
