import React, { useState } from "react";
import HeaderPerfil from "../../componentes/Header/HeaderPerfil";
import Menu from "../../componentes/Menu/Menu";
import { ButtonStyle, ContainerCriarPost, FormStyle, InputStyle, TextareaStyle } from "./styles";
import Historicos from "../../componentes/Historicos/Historicos";
import { createPost } from "../../services/requests";
import { useVerificarToken } from "../../hooks/useverificarToken";

const CriarPost = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [hashtag, setHashtag] = useState('')

  const criarPostApi = async (e)=>{
    e.preventDefault()
    if(little || !content){
      alert("Título e conteúdo são campos obrigatórios.")
    }

    const hashtagsArray = hashtag.split(",")

    await createPost(title, content, image, hashtagsArray)
    .then((response) =>{
      console.log("Post criado com sucesso!", response)
    })
    .cath((error) =>{
      console.log("Erro ao criar o post:", error)
    })

  }

  useVerificarToken()

  return (
   <>
   <HeaderPerfil titulo={"New Question"} />
   <ContainerCriarPost>
    {/* {<Menu/>} */}
    <FormStyle onSubmit={criarPostApi}>
      <InputStyle
      placeholder="Título"
      value={titlle}
      onChange={(e) => setTittle(e.target.value)}
      required/>

      <TextareaStyle
      placeholder="Conteúdo"
      value={content}
      onChange={(e)=> setContent(e.target.value)}
      required/>

      <InputStyle
      type="text"
      placeholder="Hashtags"
      value={hashtag}
      onChange={(e)=> setImage(e.target.value)}
      />
      <ButtonStyle type="submit">Enviar</ButtonStyle>
      </FormStyle>
   </ContainerCriarPost>
   </>
  );
};

export default CriarPost;
