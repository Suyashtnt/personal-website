import { PUBLIC_STORYBLOK_TOKEN } from "$env/static/public"
import { apiPlugin, storyblokInit, useStoryblokApi } from "@storyblok/svelte";

import Hero from './(landing)/Hero.svelte';
import Contact from './(landing)/Contact.svelte';
import AboutToBlog from './(landing)/AboutToBlog.svelte';

import Page from "$lib/bloks/Page.svelte";
import Section from "$lib/bloks/Section.svelte";

import Tabs from "$lib/bloks/tabs/Tabs.svelte";
import Tab from "$lib/bloks/tabs/Tab.svelte";

import Games from "$lib/bloks/about-sections/Games.svelte";
import Projects from "$lib/bloks/about-sections/Projects.svelte";
import Skills from "$lib/bloks/about-sections/Skills.svelte";

export const load = async () => {
    storyblokInit({
        accessToken: PUBLIC_STORYBLOK_TOKEN,
        use: [apiPlugin],
        components: {
            page: Page,
            section: Section,

            tabs: Tabs,
            tab: Tab,

            games: Games,
            projects: Projects,
            skills: Skills,

            hero: Hero,
            contact: Contact,
            aboutToBlog: AboutToBlog,
        }
    })

    const storyblokApi = useStoryblokApi()

    return {
        storyblokApi
    }
}