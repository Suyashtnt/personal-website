export const slugFromPath = (path: string) => {
    const slug = /([\w-]+)\.(svelte\.md|md|svx)/i.exec(path)?.[1];

    if (!slug)
        throw new Error(`Could not get slug from path ${path}`);

    return slug;
};
