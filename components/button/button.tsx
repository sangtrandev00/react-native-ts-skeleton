import React from 'react';
import { Text } from 'react-native';

export interface buttonProps {
  prop?: string;
}

export function button({prop = 'default value'}: buttonProps) {
  return <Text >button {prop}</Text>;
}
