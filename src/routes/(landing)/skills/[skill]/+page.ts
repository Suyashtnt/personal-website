import {error} from '@sveltejs/kit';
import {marked} from 'marked'; // Import the marked lib
import {_skills} from '../+layout';
import type {EntryGenerator, PageLoad} from './$types';

export const prerender = true;

export const load: PageLoad = ({params}) => {
    const selectedSkill = _skills.find(
        (skill) =>
            skill.name.toLowerCase() === params.skill.toLowerCase()
    );
    if (!selectedSkill) return error(404, 'Skill not found');

    const html = marked(selectedSkill.experience, {
        breaks: true,
        gfm: true,
        headerIds: false,
        mangle: false
    }); // Convert the markdown to html

    return {
        html,
        selectedSkill
    };
};

export const entries = (() => {
    return _skills.map((skill) => ({
        skill: skill.name.toLowerCase()
    }));
}) satisfies EntryGenerator;
