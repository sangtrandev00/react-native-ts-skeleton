import { Post } from 'types/blog.type'
import tw from 'twrnc';
import { Image, Pressable, View } from 'react-native';
import { Text } from 'react-native';

interface PostItemProps {
  post: Post
  onStartEditing: (id: string) => void
  onDeletePost: (id: string) => void
}

export default function PostItem({ post, onStartEditing, onDeletePost }: PostItemProps) {
  const { id, title, publishDate, description, featuredImage } = post

  console.log("feature image: ", featuredImage);

  return (
    <View style={tw `flex flex-col items-center overflow-hidden rounded-lg border md:flex-row`}>
      <View style={tw `group relative block h-48 w-full shrink-0 self-start overflow-hidden bg-gray-100 md:h-full md:w-32 lg:w-48`}>
        <Image
          source={{uri: featuredImage}}
          // loading='lazy'
          // alt={post.title}
          style={tw `absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110`}
        />
      </View>
      <View style={tw `flex flex-col gap-2 p-4 lg:p-6`}>
        <View style={tw `text-sm text-gray-400`}><Text>{publishDate}</Text></View>
        <View style={tw `text-xl font-bold text-gray-800`}><Text>{title}</Text></View>
        <Text style={tw `text-gray-500`}>{description}</Text>
        <View>
          <View style={tw `inline-flex rounded-md shadow-sm`} role='group'>
            <Pressable
              style={tw `rounded-l-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700`}
              onPress={() => onStartEditing(id)}
            >
              Edit
            </Pressable>
            <Pressable
              style={tw `rounded-r-lg border-t border-b border-r border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700`}
              onPress={() => onDeletePost(id)}
            >
              Delete
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}
