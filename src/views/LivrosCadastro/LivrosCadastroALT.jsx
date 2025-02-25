import { useState } from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { LivrosService } from '../../api/LivrosService'

const LivrosCadastro = () => {

  const [livro, setLivro] = useState([])

  async function createLivro(e) {
    e.preventDefault();
    const body = {
      id: Number(livro.id),
      titulo: livro.titulo,
      num_paginas: Number(livro.num_paginas),
      isbn: livro.isbn,
      editora: livro.editora
    }
    try {
      await LivrosService.createLivro(body)
      .then((response) => {
        window.location = '/livros'
        alert(response.data.mensagem)
      }) 
    } catch (error) {
      alert('Código: '+error.response.status+' '+(error.response.data.mensagem ? error.response.data.mensagem : error.response.data.validation.body.message))
    }


  }

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        <div>
          <form id="formulario" onSubmit={async function (e) { await createLivro(e) }}>
            <div className='form-group'>
              <label>Id</label>
              <input type="text" id='id' required onChange={(event) => { setLivro({ ...livro, id: event.target.value }) }} ></input>
            </div>
            <div className='form-group'>
              <label>Titulo</label>
              <input type="text" id='titulo' required onChange={(event) => { setLivro({ ...livro, titulo: event.target.value }) }}></input>
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="text" id='num' required onChange={(event) => { setLivro({ ...livro, num_paginas: event.target.value }) }}></input>
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text" id='isbn' required onChange={(event) => { setLivro({ ...livro, isbn: event.target.value }) }}></input>
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text" id='editora' required onChange={(event) => { setLivro({ ...livro, editora: event.target.value }) }}></input>
            </div>
            <div className='form-group'>
              <button
                type='submit'
              >Cadastrar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>)

}

export default LivrosCadastro