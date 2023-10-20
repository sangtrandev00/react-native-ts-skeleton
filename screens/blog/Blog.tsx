import CreatePost from "@/components/CreatePost";
import PostList from "@/components/PostList";
import { store } from "@/store/store";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";

export default function Blog() {
  return (
   <Provider store={store}>
    <SafeAreaView>
      <View className='p-5'>
        <CreatePost />
        <PostList   />
      </View>
   </SafeAreaView>
   </Provider>
  )
}
