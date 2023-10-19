import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Link, Stack } from 'expo-router';
import { button as ButtonCmp } from '@/components';
import { GluestackUIProvider, Box as GlueBox } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config" // Optional if you want to use default theme
import { styled } from 'nativewind';
import tw from 'twrnc';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
const StyledText = styled(Text);
type Props = {}
const Index = (props: Props) => {
    
  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
      
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
      <View>
            <Text>Hello World</Text>
        </View>

        <GlueBox width="100%" justifyContent="center" alignItems="center">
        <Text className="text-red-300">Open up App.js to start working on your app!</Text>
          <StyledText style={tw `text-red-300 font-bold  bg-blue-300 p-4`}>Ahihi</StyledText>
      </GlueBox>
  
    </SafeAreaView>

    </GluestackUIProvider>

    </Provider>
   
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