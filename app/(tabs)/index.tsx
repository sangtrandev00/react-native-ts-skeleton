import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { useRouter } from 'expo-router';

export default function TabOneScreen() {

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <View><Text style={{color: "blue", marginRight: 10}} onPress={() => router.push("/") } >Home Screen</Text></View>
        <View><Text style={{color: "blue", marginRight: 10}} onPress={() => router.push("/shop") } >Shop Screen</Text></View>
        <View><Text style={{color: "blue", marginRight: 10}} onPress={() => router.push("/blog") } >Blog Screen</Text></View>
        <View><Text style={{color: "blue", marginRight: 10}} onPress={() => router.push("/") } >Item 1</Text></View>
      </View>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
