import { useDeletePostMutation, useGetPostsQuery } from '@/services/blog.service'
import PostItem from '../PostItem'
import { Fragment } from 'react'
import SkeletonPost from '../SkeletonPost'
import { useDispatch, useSelector } from 'react-redux'
import { startEditingPost } from '@/slices/blog.slice'
import { RootState } from '@/store/store'
import tw from 'twrnc';
import { Text, View } from 'react-native'
export default function PostList() {
  // Sự khác nhau giữa isLoading và isFetching là gì ?
  // isLoading chỉ dành cho lần fetch đầu tiên
  // isFetching là cho mỗi lần gọi API

  const { data, isFetching } = useGetPostsQuery()
  const [deletePost, deletePostResult] = useDeletePostMutation()
  const dispatch = useDispatch()

  const startEditing = (id: string) => {
    dispatch(startEditingPost(id))
  }

  const deletePostHandler = (id: string) => {
    deletePost(id)
  }

  return (
    <View style={tw `bg-white py-6 sm:py-8 lg:py-12`}>
      <View style={tw `mx-auto max-w-screen-xl px-4 md:px-8`}>
        <View style={tw `mb-10 md:mb-16`}>
          <View style={tw `mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl`}>
            <Text>Được Dev Blog</Text>
          </View>
          <View style={tw `x-auto max-w-screen-md text-center text-gray-500 md:text-lg`}>
            <Text>Đừng bao giờ từ bỏ. Hôm nay khó khăn, ngày mai sẽ trở nên tồi tệ. Nhưng ngày mốt sẽ có nắng</Text>
          </View>
        </View>
        <View style={tw `grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8`}>
          {isFetching && (
            <Fragment>
              <SkeletonPost />
              <SkeletonPost />
            </Fragment>
          )}
          {!isFetching &&
            data?.map((post) => (
              <PostItem onStartEditing={startEditing} key={post.id} post={post} onDeletePost={deletePostHandler} />
            ))}
        </View>
      </View>
    </View>
  )
}
