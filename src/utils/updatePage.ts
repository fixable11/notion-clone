import { Page } from './types.ts';
import { supabase } from '../supabaseClient.ts';
import { debounce } from './debounce.ts';

export const updatePage = debounce(async (page: Partial<Page> & Pick<Page, 'id'>) => {
  await supabase.from('pages').update(page).eq('id', page.id);
}, 500);
