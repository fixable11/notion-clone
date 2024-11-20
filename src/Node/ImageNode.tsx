import { NodeData } from '../utils/types.ts';
import { ChangeEvent, useContext, useEffect, useRef } from 'react';
import cx from 'classnames';
import styles from './Node.module.css';
import { FileImage } from '../components/FileImage.tsx';
import { uploadImage } from '../utils/uploadImage.ts';
import { AppStateContext } from '../state/appContext.ts';

type ImageNodeProps = {
  node: NodeData;
  isFocused: boolean;
  index: number;
};

export const ImageNode = ({ node, isFocused, index }: ImageNodeProps) => {
  const { removeNodeByIndex, changeNodeValue, changeNodeType } = useContext(AppStateContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!node.value || node.value.length === 0) {
      fileInputRef.current?.click();
    }
  }, [node.value]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === 'Backspace') {
        removeNodeByIndex(index);
      }
      if (event.key === 'Enter') {
        fileInputRef.current?.click();
      }
    };
    if (isFocused) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {};
  }, [isFocused, removeNodeByIndex, index, node]);

  const onImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (!target.files) {
      await changeNodeType(index, 'text');
    }
    try {
      const result = await uploadImage(target.files?.[0]);
      if (result?.filePath) {
        changeNodeValue(index, result?.filePath);
      }
    } catch (e) {
      console.error(e);
      await changeNodeType(index, 'text');
    }
  };

  return (
    <div
      className={cx(styles.node, styles.image, {
        [styles.focused]: isFocused
      })}>
      <FileImage filePath={node.value} />
      <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={onImageUpload} />
    </div>
  );
};
