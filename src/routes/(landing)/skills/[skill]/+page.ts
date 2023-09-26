import { error } from '@sveltejs/kit';
import { marked } from 'marked'; // Import the marked lib
import type { EntryGenerator, PageLoad } from './$types';

import { _skills } from '../+layout';

export const load: PageLoad = ({ params }) => {
	const selectedSkill = _skills.find(
		(skill) => skill.id.toLowerCase() === params.skill.toLowerCase()
	);
	if (!selectedSkill) throw error(404, 'Skill not found');

	const html = marked(selectedSkill.experience, {
		breaks: true,
		gfm: true,
	});

	return {
		html,
		selectedSkill
	};
};

export const entries = (() => {
	return _skills.map((skill) => ({
		skill: skill.id.toLowerCase()
	}));
}) satisfies EntryGenerator;
