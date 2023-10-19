import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { useAddPostMutation, useGetPostQuery, useUpdatePostMutation } from '@/services/blog.service';
import { cancelEditingPost } from '@/slices/blog.slice';
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'; 
import { Post } from 'types/blog.type'
import { isEntityError, isFetchBaseQueryError } from '@/utils/helpers'
import { Button, Pressable, TextInput, View } from 'react-native'
import { Box, FormControl, FormControlError, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, Input, InputField } from '@gluestack-ui/themed'
import { FormControlLabelText } from '@gluestack-ui/themed'
import { FormControlErrorIcon } from '@gluestack-ui/themed'
import { AlertCircleIcon } from '@gluestack-ui/themed';
// import { RootState, useAppDispatch } from 'store'
import tw from 'twrnc';
import { Text } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

const initialState: Post = {
  id: '',
  title: '',
  description: '',
  publishDate: '',
  featuredImage: '',
  published: false
}

type FormError =
  | {
      [key in keyof typeof initialState]: string
    }
  | null

export default function CreatePost() {
  const [formData, setFormData] = useState<Post>(initialState)
  const [addPost, addPostResult] = useAddPostMutation()
  const [updatePost, updatePostResult] = useUpdatePostMutation()
  // const [errorForm, setErrorForm] = useState<null | ErrorForm>(null)

  const editingPost = useSelector((state: RootState) => state.blog.editingPost)

  const loading = useSelector((state: RootState) => state.blog.loading)
  const postId = useSelector((state: RootState) => state.blog.postId)

  const { data, isFetching, refetch } = useGetPostQuery(postId, { skip: !postId, refetchOnMountOrArgChange: 5 }) // Thêm skip khi postId tồn tại !!!
  // const dispatch = useAppDispatch()


  const { control, handleSubmit, formState: { errors } } = useForm<Omit<Post, "id">>();

  const onSubmit: SubmitHandler<Omit<Post, "id">> = (data) => {
    console.log(data);
  };

  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event: Event, selectedDate: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  // const showMode = (currentMode) => {
  //   DateTimePickerAndroid.open({
  //     value: date,
  //     onChange,
  //     mode: currentMode,
  //     is24Hour: true,
  //   });
  // };

  // const showDatepicker = () => {
  //   showMode('date');
  // };

  // const showTimepicker = () => {
  //   showMode('time');
  // };

  const submitFormHandler = () => {
    console.log(formData)
  }

  return (
    <View>
        
        <Box>
        {/* Title form input */} 

        <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="First name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="title"
      />
      {errors.title && <Text>This is required.</Text>}
          
          {/* Description form group input */}

          <Controller
        control={control}
        rules={{
         maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="description"
      />



        <Pressable onPress={handleSubmit(onSubmit)} style={tw `bg-orange-300 w-[8rem] p-2`}>
          <Text>Submit Post</Text>
        </Pressable>

        </Box>
      
    </View>
  )
}
