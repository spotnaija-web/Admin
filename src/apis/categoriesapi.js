import axios from "axios";
import { baseurl } from "./apiconfig";;

async function getCategoriesApi(){

    try{
        let result = await axios.get(`${baseurl}/api/category/main`)
        console.log(result)
        return result.data
    }catch(err){
        console.log(err)
        return err
    }
   
}

async function getSubCategoriesApi(){
    try{
        let result = await axios.get(`${baseurl}/api/category/subcategories`)
        console.log("subcategory", result)
        return result.data
    }catch(err){
        return err
    }
}

async function getTimelinesApi(){
    try{
        let result = await axios.get(`${baseurl}/api/category/timelines`)
        console.log("timeline", result)
        return result.data
    }catch(err){
        return err
    }
}

export { getCategoriesApi, getSubCategoriesApi, getTimelinesApi }