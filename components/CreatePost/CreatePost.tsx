import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { useAddPostMutation, useGetPostQuery, useUpdatePostMutation } from '@/services/blog.service';
import { cancelEditingPost } from '@/slices/blog.slice';
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'; 
import { Post } from 'types/blog.type'
import { isEntityError, isFetchBaseQueryError } from '@/utils/helpers'
import { Button, TextInput, View } from 'react-native'
import { Box, FormControl, FormControlError, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, Input, InputField } from '@gluestack-ui/themed'
import { FormControlLabelText } from '@gluestack-ui/themed'
import { FormControlErrorIcon } from '@gluestack-ui/themed'
import { AlertCircleIcon } from '@gluestack-ui/themed';
// import { RootState, useAppDispatch } from 'store'
import tw from 'twrnc';
import { Text } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

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

  const dispatch = useDispatch()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      if (postId) {
        const formDataWithId = {
          ...formData,
          id: postId
        }

        try {
          const result = await updatePost(formDataWithId).unwrap()
          console.log(result)
          setFormData(initialState)
        } catch (error) {
          setFormData(formDataWithId)
        }

        console.log(updatePostResult)
        // dispatch(updatePost(formDataWithId)).unwrap().then((res)=> {
        //   console.log(res)
        //   setErrorForm(null);
        //   setFormData(initialState)

        // })
        // .catch((error) => {
        //   console.log(error)
        //   setErrorForm(error.error);
        // })
      } else {
        console.log(formData)
        const result = await addPost(formData).unwrap()
        setFormData(initialState)
        console.log(result)
        // try {
        //   const res = await dispatch(addPost(formData))
        //   const result = unwrapResult(res);
        //   console.log(result);

        //   setErrorForm(null);
        //   setFormData(initialState)
        // } catch (error: any) {
        //   console.log(error);

        //   setErrorForm(error.error);
        // }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const errorForm: FormError = useMemo(() => {
    const errorResult = postId ? updatePostResult.error : addPostResult.error
    // Vì errorResult có thể là FetchBaseQueryError | SerializedError | undefined, mỗi kiểu lại có cấu trúc khác nhau
    // nên kiểm tra như thế nào cho đúng ?

    if (isEntityError(errorResult)) {
      console.log(errorResult)

      return errorResult.data.error as FormError
    }
    return null

    // if((errorResult as FetchBaseQueryError).data && (errorResult as FetchBaseQueryError).status) {
    //   return (errorResult as FetchBaseQueryError).data.error
    // }

    // return errorResult as any
  }, [addPostResult.error, postId, updatePostResult.error])

  useEffect(() => {
    if (data && postId) {
      setFormData(data)
    } else {
      setFormData(initialState)
    }
  }, [data, postId])

  const cancelHandler = () => {
    dispatch(cancelEditingPost())
  }

  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event: Event, selectedDate: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
        
        <Box>

          {/* Title of post */}
          <FormControl size="md" isDisabled={false} isInvalid={false} isReadOnly={false} isRequired={false} >
            <FormControlLabel mb='$1'>
              <FormControlLabelText>Title of Post</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                defaultValue="12345"
                placeholder="title"
                style={tw `w-full border border-gray-300 p-2` }
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Must be at least 6 characters.
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon
                as={AlertCircleIcon}
              />
              <FormControlErrorText>
                At least 6 characters are required.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Feature image of post */}
          <FormControl size="md" isDisabled={false} isInvalid={false} isReadOnly={false} isRequired={false} >
            <FormControlLabel mb='$1'>
              <FormControlLabelText>Feature Image</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                defaultValue="12345"
                placeholder="Feature Image"
                style={tw `w-full border border-gray-300 p-2` }
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Must be at least 6 characters.
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon
                as={AlertCircleIcon}
              />
              <FormControlErrorText>
                At least 6 characters are required.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/*  Description of post */}
          <FormControl size="md" isDisabled={false} isInvalid={false} isReadOnly={false} isRequired={false} >
            <FormControlLabel mb='$1'>
              <FormControlLabelText>Description</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                defaultValue="12345"
                placeholder="Description"
                style={tw `w-full border border-gray-300 p-2` }
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Must be at least 6 characters.
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon
                as={AlertCircleIcon}
              />
              <FormControlErrorText>
                At least 6 characters are required.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/*  Publish Date of post */}
          <FormControl size="md" isDisabled={false} isInvalid={false} isReadOnly={false} isRequired={false} >
            <FormControlLabel mb='$1'>
              <FormControlLabelText>Publish Date (Date picker)</FormControlLabelText>
            </FormControlLabel>
            
            <Button onPress={showDatepicker} title="Show date picker!" />
            <Button onPress={showTimepicker} title="Show time picker!" />
            <Text>selected: {date.toLocaleString()}</Text>

            <FormControlHelper>
              <FormControlHelperText>
                Must be at least 6 characters.
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon
                as={AlertCircleIcon}
              />
              <FormControlErrorText>
                At least 6 characters are required.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        </Box>
      
    </View>
  )
}
