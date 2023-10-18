import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Link, Stack } from 'expo-router';
import { button as ButtonCmp } from '@/components';

type Props = {}
const Index = (props: Props) => {
  return (
    <SafeAreaView>
        <Stack.Screen options={{ 
            title: 'Index',
            headerStyle: {backgroundColor: '#2e78b7'},
            }}>

        </Stack.Screen>
        
        <View >
            <Text style={styles.textWhite}>Index page</Text>
            <ButtonCmp/>
            <Link href="/layout/header">
                <Text style={styles.textWhite}>header</Text>
            
            </Link>
        </View>

        <View>
            
        </View>
  
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textWhite: {
        color: "white"  
    }
})

export default Index