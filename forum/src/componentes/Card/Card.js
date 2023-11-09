import React, { useContext, useEffect, useState } from 'react';
import { ButtonCard, CardPost, CardStyle, ContainerCard, ContainerCardHome, ContainerPerfil, ConteudoCard, EditPost, ImgCard, ImgPost, MensagemCard, NomeCard, PerfilUsuario, TituloCard } from './style';
import { getPostAll } from '../../services/requests';
import Comentar from '../Comentar/Comentar';
import { GlobalStateContect } from '../../GlobalState/GlobalStateContext';

function Card() {

  const [loading, setLoading] = useState(true)
  const [forumTopics, setForumTopics]= useState({})

  const [selectedPostId] = useContext(GlobalStateContect)


  useEffect(()=>{
    getPostAll(setForumTopics)
  },[])

  return (
    <ContainerCardHome>
    {
      loading ?(
        <ContainerCard>
          {forumTopics && forumTopics.map(dado =>{
            return(
              <CardStyle key={(dado.post.id)}>
                <PerfilUsuario>
                  <ImgCard src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.dreamstime.com%2Ffotos-de-stock-tarde-quente-do-ver%25C3%25A3o-image2557863&psig=AOvVaw2-jVGDpXju31JJapaSQJq3&ust=1698419563452000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNi6goiAlIIDFQAAAAAdAAAAABAJ'>
                  </ImgCard>

                  <ContainerPerfil>
                    <NomeCard> {dado.creator_username} </NomeCard>
                    <MensagemCard>{dado.post_created_at}</MensagemCard>
                    <CardPost>
                      <ImgPost src={dado.post_image} alt='fotopost'/>
                      <ConteudoCard>{dado.post_content}</ConteudoCard>
                    </CardPost>
                    <EditPost>
                      <Comentar 
                        postId={dado.post.id}
                        comments={dado.comments}
                        autorId={dado.created.id}
                      />
                    </EditPost>
                  </ContainerPerfil>
                </PerfilUsuario>
                <TituloCard>{dado.post_tittle}</TituloCard>
              </CardStyle>
            )
          })}
        </ContainerCard>
      ):(<p>loading</p>)
    }
  
  
    </ContainerCardHome>
  )
}

export default Card