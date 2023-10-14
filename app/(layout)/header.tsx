import React from 'react'
import { Text, View } from 'react-native'

type Props = {}

function header({}: Props) {
  return (
    <View>
        <Text style={{color: "blue"}}>
            header mobile application
        </Text>
    </View>
  )
}

export default header