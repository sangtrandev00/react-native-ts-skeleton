import { useDeletePostMutation, useGetPostsQuery } from '@/services/blog.service'
import PostItem from '../PostItem'
import { Fragment, useMemo } from 'react'
import SkeletonPost from '../SkeletonPost'
import { useDispatch, useSelector } from 'react-redux'
import { startEditingPost } from '@/slices/blog.slice'
import { RootState } from '@/store/store'
import tw from 'twrnc';
import { FlatList, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'
export default function PostList() {
  // Sự khác nhau giữa isLoading và isFetching là gì ?
  // isLoading chỉ dành cho lần fetch đầu tiên
  // isFetching là cho mỗi lần gọi API
  const PostListContainer = useMemo(() => tw`mb-2 border-2 border-orange-300 p-2`, [tw]);
  const PostListWrapper = useMemo(() => tw`mx-auto max-w-screen-xl px-4 md:px-8`, [tw]);
  const PostListHeadWrapper = useMemo(() => tw`mb-10 md:mb-16`, [tw]);
  const PostListHeadAuthor = useMemo(() => tw`mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl`, [tw]);
  const PostListHeadTitle = useMemo(() => tw`x-auto max-w-screen-md text-center text-gray-500 md:text-lg`, [tw]);
  const PostListContentWrapper = useMemo(() => tw`grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8`, [tw]);
  const { data, isFetching } = useGetPostsQuery()
  const [deletePost, deletePostResult] = useDeletePostMutation()
  const dispatch = useDispatch();


  const startEditing = (id: string) => {
    dispatch(startEditingPost(id))
  }

  const deletePostHandler = (id: string) => {
    deletePost(id).unwrap().then((result) => {
      console.log("result: ", result);

      Toast.show({
        type: "success",
        text1: "Success",
      })
    }).catch((error) => {
      console.log("error: ", error);
      Toast.show({
        type: "warning",
        text1: "Error"
      })
    })
  }

  return (
    <View style={PostListContainer}>
      <View style={PostListWrapper}>
        {/* Head Post List Style */}
        <View style={PostListHeadWrapper}>
          <View style={PostListHeadAuthor}>
            <Text>Được Dev Blog</Text>
          </View>
          <View style={PostListHeadTitle}>
            <Text>Đừng bao giờ từ bỏ. Hôm nay khó khăn, ngày mai sẽ trở nên tồi tệ. Nhưng ngày mốt sẽ có nắng</Text>
          </View>
        </View>
        {/* Content Post List Style */}
        <View style={PostListContentWrapper}>
          {isFetching && (
            <Fragment>
              <SkeletonPost />
              <SkeletonPost />
            </Fragment>
          )}
         
        {!isFetching && (
            <FlatList
              data={data || []}
              initialNumToRender={10}
              renderItem={({ item: post }) => (
                <PostItem onStartEditing={startEditing} key={post.id} post={post} onDeletePost={deletePostHandler} />
              )}
            />
        )}

        </View>
      </View>
    </View>
  )
}
