import { dev } from '$app/environment';

export const prerender = false;

export const load = async ({ parent }) => {
    const { storyblokApi } = await parent();

    const dataStory = await storyblokApi.get("cdn/stories/home", {
        version: dev ? "draft" : "published",
    });

    return {
        story: dataStory.data.story
    };
}
