import { nanoid } from 'nanoid';
import { Page } from './types.ts';

export const createPage = (): Page => {
  const slug = nanoid();
  const id = nanoid();

  return {
    title: 'Untitled',
    id,
    slug,
    nodes: [],
    cover: 'notion-brand-logo.png'
  };
};
