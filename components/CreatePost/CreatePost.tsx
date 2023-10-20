import { useAddPostMutation, useGetPostQuery, useUpdatePostMutation } from '@/services/blog.service';
import { cancelEditingPost } from '@/slices/blog.slice';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Post } from 'types/blog.type';
import { Pressable, TextInput, View } from 'react-native';
import { Box } from '@gluestack-ui/themed';
// import { RootState, useAppDispatch } from 'store'
import tw from 'twrnc';
import { Text } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Toast from 'react-native-toast-message';
const initialState: Post = {
  id: '',
  title: '',
  description: '',
  publishDate: '',
  featuredImage: '',
  published: false
}

export default function CreatePost() {
  const [formData, setFormData] = useState<Post>(initialState)
  const [addPost, addPostResult] = useAddPostMutation()
  const [updatePost, updatePostResult] = useUpdatePostMutation()
  // const [errorForm, setErrorForm] = useState<null | ErrorForm>(null)

  const postId = useSelector((state: RootState) => state.blog.postId)

  const { data } = useGetPostQuery(postId, { skip: !postId, refetchOnMountOrArgChange: 5 }) // Thêm skip khi postId tồn tại !!!

  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<Omit<Post, "id">>();

  // Style for web
  const titleInputStyle = useMemo(() => tw`mb-2 border-2 border-orange-300 p-2`, [tw]);
  const descriptionInputStyle = useMemo(() => tw`mb-2 border-2 border-orange-300 p-2`, [tw]);
  const publishDateInputStyle = useMemo(() => tw`mb-2 border-2 border-orange-300 p-2`, [tw]);
  const featuredImageStyle = useMemo(() => tw`mb-2 border-2 border-orange-300 p-2`, [tw]);
  const submitPostBtnStyle = useMemo(() => tw`bg-orange-300 w-[8rem] p-2`, [tw]);
  const resetPostBtnStyle = useMemo(() => tw`mb-2 border-2 border-orange-300 p-2`, [tw]);


  const onSubmit: SubmitHandler<Omit<Post, "id">> = (data) => {

      const formData = {
        ...data,
        published: true
      }

      console.log("form data: ", formData);

     if(postId){

      const formDataWithId = {
        ...formData,
        id: postId
      }

      updatePost(formDataWithId).unwrap().then((result) => {
        console.log("result", result);
        Toast.show({
          type: 'success',
          text1: 'Hello',
          text2: 'This is some something 👋'
        });
      }).catch((error) => {
        console.log("error: ", error);

        Toast.show({
          type: "error",
          text1: "Error",
        })
      })

     }else {
     
      addPost(formData).unwrap().then((result) => {
        console.log("result", result);

        Toast.show({
          type: 'success',
          text1: 'Hello',
          text2: 'This is some something 👋'
        });
      

      }).catch((error) => {
        console.log("error: ", error);
      })
    }

  };

  const dispatch = useDispatch();

  useEffect(() => {

    console.log("change post Id: ", postId)

    setValue("title", data?.title || "")
    setValue("description", data?.description || "")
    setValue("publishDate", data?.publishDate || "")
    setValue("featuredImage", data?.featuredImage || "")
  }, [postId])


  const resetForm = () => {
    console.log("reset form: ");

    reset();
    dispatch(cancelEditingPost());

    setValue("title", "")
    setValue("description", "")
    setValue("publishDate", "")
    setValue("featuredImage", "")
  }

  return (
    <View>
        
        <Box>
        {/* Title form input */} 
        <label htmlFor="title">
          Title
          </label>
        <Controller
        defaultValue=""
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
          style={titleInputStyle}
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="title"
      />
      {errors.title && <Text>This is required.</Text>}
          
          {/* Description form group input */}
          <label htmlFor="description">
          Description
          </label>
          <Controller
          defaultValue=""
        control={control}
          rules={{
            required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={descriptionInputStyle}
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="description"
      />
      {errors.description && <Text>Text Input required</Text>}
          {/* Feature Image form group input */}
          <label htmlFor="publishDate">
          Publish Date
          </label>
          <Controller
          defaultValue=""
        control={control}
        rules={{
         required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={publishDateInputStyle}
            placeholder="publishDate"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="publishDate"
      />
      {errors.publishDate && <Text>Text Input Required</Text>}
          {/* Feature Image form group input */}
          <label htmlFor="featuredImage">
            Feature Image
          </label>
          <Controller
          defaultValue=''
        control={control}
        rules={{
         required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={featuredImageStyle}
            placeholder="featuredImage"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="featuredImage"
      />
      {errors.featuredImage && <Text>Text Input Required</Text>}

       <Pressable onPress={handleSubmit(onSubmit)} style={submitPostBtnStyle}>
         <Text>Submit Post</Text>
       </Pressable>
       <Pressable onPress={resetForm} style={resetPostBtnStyle}>
         <Text>Reset Form</Text>
       </Pressable>

        </Box>
        {/* Toast here */}
        <Toast/>
      
    </View>
  )
}
