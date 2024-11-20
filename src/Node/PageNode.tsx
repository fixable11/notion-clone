import { NodeData } from '../utils/types.ts';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient.ts';
import cx from 'classnames';
import styles from './Node.module.css';
import { AppStateContext } from '../state/appContext.ts';

type PageNodeProps = {
  node: NodeData;
  isFocused: boolean;
  index: number;
};

export const PageNode = ({ node, isFocused, index }: PageNodeProps) => {
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState('');
  const { removeNodeByIndex } = useContext(AppStateContext);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === 'Backspace') {
        removeNodeByIndex(index);
      }
      if (event.key === 'Enter') {
        navigate(`/${node.value}`);
      }
    };
    if (isFocused) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {};
  }, [isFocused, removeNodeByIndex, index, navigate, node]);

  useEffect(() => {
    const fetchPageTitle = async () => {
      const { data } = await supabase.from('pages').select('title').eq('slug', node.value).single();
      setPageTitle(data?.title);
    };
    if (node.type === 'page' && node.value) {
      fetchPageTitle();
    }
  }, [node.type, node.value]);

  const navigateToPage = () => {
    navigate(`/${node.value}`);
  };

  return (
    <div
      onClick={navigateToPage}
      className={cx(styles.node, styles.page, {
        [styles.focused]: isFocused
      })}>
      📄 {pageTitle}
    </div>
  );
};
