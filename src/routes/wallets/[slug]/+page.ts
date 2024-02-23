import { type PageLoad } from './$types';

export const load: PageLoad = ({ params: { slug }}) => {
    return {
        slug
    };
};