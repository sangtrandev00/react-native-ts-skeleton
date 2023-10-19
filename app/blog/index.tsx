import Blog from '@/screens/blog';
import React from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'
import tw from 'twrnc';

type Props = {}

function BlogScreen({}: Props) {
  return (
    <View>
        <Text style={tw `font-bold`}>BlogScreen</Text>
        <View>
          <Blog/>
        </View>
    </View>
  )
}

export default BlogScreen