import { goto } from '$app/navigation';
import type { Action } from 'svelte/action';
import { writable } from 'svelte/store';

// a list of all the intersection observers we've created, along with their targets
export const observers = writable<{
    observer: IntersectionObserver;
    target: HTMLElement;
}[]>([]);


export const autoHash: Action<HTMLElement> = (node) => {
    const callback: IntersectionObserverCallback = (entries) => {
        const entry = entries.find(entry => entry.isIntersecting);

        if (entry) {
            const id = entry.target.id;
            goto(`#${id}`, { replaceState: true, noScroll: true });
        }
    };

    const observer = new IntersectionObserver(callback, {
        threshold: 1,
    });

    observer.observe(node);
    observers.update(observers => [...observers, { observer, target: node }]);


    return { destroy: () => {
        observer.disconnect();
        observers.update(observers => observers.filter(({ target }) => target !== node));
    } };
}