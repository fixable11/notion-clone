import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient.ts';
import { Loader } from './Loader.tsx';
import styles from '../utils.module.css';
import * as React from 'react';

type FileImageProps = {
  filePath: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const FileImage = ({ filePath, ...props }: FileImageProps) => {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const downloadImage = async (filePath: string) => {
      setLoading(true);
      const { data } = await supabase.storage.from('images').download(filePath);
      if (data) {
        const url = URL.createObjectURL(data);
        setImage(url);
        setLoading(false);
      }
    };
    if (filePath && filePath.length > 0) {
      downloadImage(filePath);
    }
  }, [filePath]);

  if (loading) {
    return (
      <div className={styles.centeredFlex}>
        <Loader />
      </div>
    );
  }

  return <img src={image} alt={filePath} {...props} />;
};
