import { error } from "@sveltejs/kit";
import { marked } from 'marked'; // import the marked lib
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, parent }) => {
    const { skills } = await parent()

    const selectedSkill = skills.find(skill => skill.name.toLowerCase() === params.skill.toLowerCase())
    if(selectedSkill === undefined) return error(404, 'Skill not found')

    const html = marked(selectedSkill.experience, {
        mangle: false,
        headerIds: false,
        gfm: true,
        breaks: true,
    }) // convert the markdown to html

    return {
        selectedSkill,
        html
    }
};