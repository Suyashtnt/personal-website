import { error } from "@sveltejs/kit";
import { marked } from 'marked'; // import the marked lib
import { _skills } from '../+layout'
import type { PageLoad, EntryGenerator } from "./$types";
export const prerender = true;

export const load: PageLoad = ({ params }) => {
    const selectedSkill = _skills.find(skill => skill.name.toLowerCase() === params.skill.toLowerCase())
    if (!selectedSkill) return error(404, 'Skill not found')

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

export const entries = (() => {
    return _skills.map(skill => ({
        skill: skill.name.toLowerCase()
    }))
}) satisfies EntryGenerator;
