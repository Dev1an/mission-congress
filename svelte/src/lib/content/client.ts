import { createClient } from 'contentful/dist/es-modules/contentful.js';
import type { ContentfulClientApi } from 'contentful';
import { space, environment, accessToken } from '$lib/content/Endpoint description';

export const client: ContentfulClientApi = createClient({
    space,
    environment,
    accessToken
})