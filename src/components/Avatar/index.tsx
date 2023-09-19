import React from 'react';
import { Image } from '@chakra-ui/react';
import type { ImageProps } from '@chakra-ui/react';
import { LOGO_ICON } from '@/utils/common';

const Avatar = ({ ...props }: ImageProps) => {
  return (
    <Image
      fallbackSrc={LOGO_ICON}
      fallbackStrategy={'onError'}
      borderRadius={'50%'}
      objectFit={'cover'}
      alt=""
      p={'1px'}
      {...props}
    />
  );
};

export default Avatar;
