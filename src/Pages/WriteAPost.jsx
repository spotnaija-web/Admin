// import React, { useRef } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import { uploadImageApi } from '../apis/imagesapi';
import { useLogin } from '../hooks/useLogin';
import { getCategoriesApi, getSubCategoriesApi, getTimelinesApi } from '../apis/categoriesapi';
import { createPostApi } from '../apis/postsapi';
import { useNavigate } from 'react-router-dom';

import { FaTimes } from 'react-icons/fa';

const WriteAPost = () => {
  const {accessToken} = useLogin()
  const navigate = useNavigate()

  const [preview, setPreview] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null)
  const [coverPhotoUrl, setCoverPhotoUrl] = useState("")
  const [content, setContent] = useState('');
  const [mainCategoryId, setMainCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [timelineId, setTimelineId] = useState('')
  const [section, setSection] = useState("")
  const [title, setTitle] = useState('');

  const [categoriesArr, setCategoriesArr] = useState([])
  const [subCategoriesArr, setSubCategoriesArr] = useState([])
  const [timelinesArr, setTimelinesArr] = useState([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({error: false, message: ""})

  let categoriesTabs = categoriesArr?.map((category, i)=>(
      <div key={category.id}>
        <label htmlFor={category.name}>{category.name}</label>
        <input type='radio' name='category' value={category.id} onChange={()=> {setMainCategoryId(category.id)}} id={category.name} />
      </div>
    ))

  let subCategoriesTabs = subCategoriesArr?.map((subcategory, i)=>(
    <div key={subcategory.id}>
      <label htmlFor={subcategory.name}>{subcategory.name}</label>
      <input type='radio' name='sub-category' value={subcategory.id} onChange={()=> {setSubCategoryId(subcategory.id)}} id={subcategory.name} />
    </div>
  ))

  let timelineTabs = timelinesArr?.map((timeline, i)=>(
    <div key={timeline.id}>
      <label htmlFor={timeline.name}>{timeline.name}</label>
      <input type='radio' name='timeline' value={timeline.id} onChange={()=> {setTimelineId(timeline.id)}} id={timeline.name} />
    </div>
  ))

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)

    if(!coverPhoto){
      setError({error: true, message: "no cover photo"})
      setLoading(false)
      return
    }

    if(!title || !content || !mainCategoryId || !subCategoryId || !timelineId){
      setError({error: true, message: "fill all fields and select required options"})
      setLoading(false)
      return
    }
    
      console.log("credentials filled")
      let coverPhotoUrl = await uploadAndGetCoverPhotoUrl()
      console.log(coverPhotoUrl)
      if(coverPhotoUrl){
  
        let postBody = {
          title: title,
          body: content,
          cover_photo: coverPhotoUrl,
          publish_status: true,
          content_type: "article",
          main_category_id: mainCategoryId,
          sub_category_id: subCategoryId,
          timeline: timelineId
        }

        console.log(postBody)
  
        let result = await createPostApi(postBody, accessToken)
        console.log("result", result)
        if(result.status === false){
          setError({error: true, message: result.message})
          setLoading(false)
        }else{
          console.log("post successfull")
          navigate("/")
          setLoading(false)
        }
    

    }
  }

  function handleTitleChange(e){
    console.log(e.target.value)
    setTitle(e.target.value)
  }

  function handleEditorChange(value, editor) {
    setContent(value);
    console.log("value,", value)
  }

  function coverPhotoSet(e){
    console.log(e.target.files)
    setCoverPhoto(e.target.files[0])
    const file = e.target.files[0];
    setCoverPhoto(file);
    setPreview(URL.createObjectURL(file));
  }

  function removePreview() {
    setPreview(null);
    setCoverPhoto(null);
  }


  async function uploadAndGetCoverPhotoUrl(){
      let result = await uploadImageApi(coverPhoto, coverPhoto.name, accessToken)
      if(result.result.Location){
        return result.result.Location
      }else{
        setError({error: true, message: "Error uploading"})
      }
  }

  async function handleImageUpload(blobInfo, progress){

    console.log(blobInfo.blob())

   let result = await uploadImageApi(blobInfo.blob(), blobInfo.filename(), accessToken)
   console.log(result.result.location)

    return new Promise((resolve, reject)=>{
      if(result.status !== true){
        reject("error uploading image")
      }else{
        resolve(result.result.Location)
      }
    })
   
  }

  useEffect(()=>{
    async function categoriesArrSet(){
      let result = await getCategoriesApi()
      setCategoriesArr(result.categories)
    }

    async function subCategoriesArrSet(){
      let result = await getSubCategoriesApi()
      setSubCategoriesArr(result.sub_categories)
    }

    async function timelineArrSet(){
      let result = await getTimelinesApi()
      setTimelinesArr(result.timelines)
    }

    categoriesArrSet()
    subCategoriesArrSet()
    timelineArrSet()
  },[])


  return (
    <div className="bg-white-A700 flex flex-col font-inter items-center justify-start mx-auto w-full">

    <div className="h-auto px-5 pt-10 md:px-0 relative w-[90%]">
    <form onSubmit={handleSubmit}>
    <div className="flex justify-end mt-2 pb-10">
      <button
        className="text-[color:white] px-4 py-2 rounded bg-green-900"
        disabled={loading}
        type="submit"
      >
        {loading ? "..." : "Publish"}
      </button>
    </div>
      <div className='my-4'>
      {/* <div className="upload-preview">
        {preview && (
          <>
            <img src={preview} alt="Preview" />
            <FaTimes onClick={removePreview} />
          </>
        )}
      </div> */}
        <label>Upload cover image</label>
        <br />
        <input onChange={coverPhotoSet} type='file' accept='image/*' />
        <div className="upload-preview">
        {preview && (
          <>
          <FaTimes onClick={removePreview} className="mt-5 mb-5 md:my-5" />
            <img src={preview} alt="Preview" className="w-84 h-44 mt-5 mb-5 md:my-5" />
          </>
        )}
      </div>
      </div>

      {error.error && <div className='text-xl font-medium text-red-500'>{error.message}</div>}

      <div className='my-2'>
        <label className='text-2xl'>Title</label>
        <div>
          <input value={title} onChange={handleTitleChange} type='text' className='w-full border border-green-500 p-2 rounded-md' />
        </div>
      </div>
      
    <div className="flex">
      <div className="w-2/3 pr-5">
        <Editor
          initialValue="<p>Enter your post content here</p>"
          apiKey="iwiz8uvasav8rywbtd7915gj9o96w0k05f7u3k7w6tix4kho"
          init={{
            height: 950,
            menubar: false,
            /*images_upload_url: 'http://3.213.159.44:3000/api/photo',*/
            images_upload_handler: handleImageUpload,
            images_upload_base_path: 'http://3.213.159.44:3000',
            images_upload_credentials: true,
            images_reuse_filename: true,
            automatic_uploads: true,
            plugins: "advlist anchor autosave image link linkchecker lists media searchreplace table template visualblocks wordcount",
            toolbar:"undo redo | styles fontsizeinput | bold italic | align bullist numlist | table link image media pageembed | spellcheckdialog a11ycheck code | inserttemplate"
          }}
          onEditorChange={handleEditorChange}
        />
      </div>
      

    <div className="w-1/3">
      <div className='my-4'>
        <label className='text-2xl'>Category</label>
        <div>
          { categoriesTabs && categoriesTabs }
        </div>
      </div>

      <div className='my-4'>
        <label className='text-2xl'>Sub Category</label>
        <div>
          {subCategoriesTabs && subCategoriesTabs}
        </div>
      </div>

      <div className='my-4'>
        <label className='text-2xl'>Timeline</label>
        <div>
          {timelineTabs && timelineTabs}
        </div>
      </div>
      </div>
    </div>
    </form>
    </div>
    </div>
  );
}



export default WriteAPost;