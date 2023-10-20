import { Post } from 'types/blog.type'
import tw from 'twrnc';
import { Image, Pressable, View } from 'react-native';
import { Text } from 'react-native';
import { useMemo } from 'react';
import tailwind from 'twrnc';

interface PostItemProps {
  post: Post
  onStartEditing: (id: string) => void
  onDeletePost: (id: string) => void
}

export default function PostItem({ post, onStartEditing, onDeletePost }: PostItemProps) {
  const { id, title, publishDate, description, featuredImage } = post
  const containerStyle = useMemo(() => tw `flex flex-col items-center overflow-hidden rounded-lg border md:flex-row`, [tw]);
  const wrapImageStyle = useMemo(() => tw `group relative block h-48 w-full shrink-0 self-start overflow-hidden bg-gray-100 md:h-full md:w-32 lg:w-48`, [tw]);
  const imageAvatarStyle = useMemo(() => tw `absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110`, [tw]);
  const pressEditStyle = useMemo(() => tw `rounded-l-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700`, [tw]);
  const buttonsGroupStyle = useMemo(() => tw `rounded-r-lg border-t border-b border-r border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700`, [tw]);
  const pressDeleteStyle = useMemo(() => tw `rounded-r-lg border-t border-b border-r border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700`, [tw]);
  const publishDateStyle = useMemo(() => tw `text-sm text-gray-400`, [tw]);
  const descriptionStyle = useMemo(() => tw `rounded-r-lg border-t border-b border-r border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700`, [tw]);
  const titleStyle = useMemo(() => tw `text-xl font-bold text-gray-800`, [tw]);
  const contentWrapStyle = useMemo(() => tw `flex flex-col gap-2 p-4 lg:p-6`, [tw]);


  const handleDeletePost = () => {
    const isConfirmed = window.confirm("Are you sure want to delete this post ?");
   if(isConfirmed) {
    onDeletePost(id)
   }
  }

  return (
    <View style={containerStyle}>
      <View style={wrapImageStyle}>
        <Image
          source={{uri: featuredImage}}
          // alt={post.title}
          style={imageAvatarStyle}
        />
      </View>
      <View style={contentWrapStyle}>
        <View style={publishDateStyle}><Text>{publishDate}</Text></View>
        <View style={titleStyle}><Text>{title}</Text></View>
        <Text style={descriptionStyle}>{description}</Text>
        <View>
          <View style={buttonsGroupStyle} role='group'>
            <Pressable
              style={pressEditStyle}
              onPress={() => onStartEditing(id)}
            >
            <Text> Edit</Text>
            </Pressable>
            <Pressable
              style={pressDeleteStyle}
              onPress={handleDeletePost}
            >
            <Text> Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}
