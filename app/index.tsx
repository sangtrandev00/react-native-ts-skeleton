import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Link, Stack } from 'expo-router';
import { button as ButtonCmp } from '@/components';
import { Box, NativeBaseProvider } from 'native-base';
import { styled } from 'nativewind';
import { withExpoSnack } from 'nativewind';
const StyledView = styled(View)
const StyledText = styled(Text)

type Props = {}
import { Button } from "native-base";
const Index = (props: Props) => {
  return (
    <SafeAreaView>
        <Stack.Screen options={{ 
            title: 'Index',
            headerStyle: {backgroundColor: '#2e78b7'},
            }}></Stack.Screen>
        <View >
            <Text style={styles.textWhite}>Index page</Text>
            <ButtonCmp/>
            <Link href="/layout/header">
                <Text style={styles.textWhite}>header</Text>
            
            </Link>
        </View>
        <View>
            <NativeBaseProvider>
                <Box>Hello world</Box>
                <Box alignItems={"center"}>
                    <Button size={"lg"} onPress={() => console.log("hello world")}>Click Me</Button>
                </Box>
            </NativeBaseProvider>
        </View>
        <StyledView className="flex-1 items-center justify-center">
            <StyledText className="text-red-500 text-center">
                Try editing me! 🎉
            </StyledText>
            </StyledView>
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

export default withExpoSnack(Index)