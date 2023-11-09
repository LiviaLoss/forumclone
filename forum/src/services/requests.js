import axios from "axios";
import { BASE_URL } from "../constants/url";
import { response } from "express";

const token = localStorage.getItem('token')

export const getPostAll =(salvarPosts)=>{
    axios.get(`${BASE_URL}/post/all`)
    .them((response)=>{
        salvarPosts(response.data)
    })
    .catch((err) =>{console.log(err)})
}

export const createPost = (title, content, image, hashtag) =>{
    return new Promise((resolve, reject)=>{
        let body ={
            'title':title,
            'content': content,
            'image': image,
            'hashatag': hashtag,
        }

        axios.post(`${BASE_URL}/post/create`, body, {headers: {Authorization: token}})
        .then((response) =>{
            getPostAll()
            resolve(response.data)
            console.log('body', body)
        })
        .catch((err) =>{
            reject(err)
        })
        
        })

    }

    export const createComment = (postId, comment)=>{
        const body ={
            'postId': postId,
            'comment': comment
        }

        axios.post(`${BASE_URL}*comment/create`, body, {header: {Authorization: token}})
        .then((response) =>{
            getPostAll()
        })
        .catch((error) =>{
            console.error("Erro so criar o comentário:", error)
        })
    }
