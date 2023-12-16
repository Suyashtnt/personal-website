import { error } from '@sveltejs/kit';
import { marked } from 'marked'; // Import the marked lib
import type { PageLoad } from './$types';

export const load: PageLoad = ({ data, url }) => {
	const wantedSkill = url.searchParams.get('skill') ?? 'Svelte';

	const selectedSkill = data.skills.find(
		(skill) => skill.id.toLowerCase() === wantedSkill.toLowerCase()
	);
	if (!selectedSkill) error(404, 'Skill not found');

	const html = marked(selectedSkill.experience, {
		breaks: true,
		gfm: true
	});

	return {
		html,
		posts: data.posts,
		projects: data.projects,
		selectedSkill,
		skills: data.skills
	};
};
