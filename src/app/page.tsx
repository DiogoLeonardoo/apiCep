"use client"; // Convenção utilizada para indicar que o código é executado no lado client

import { useEffect, useState } from "react";    //Importações 
import { useStyleRegistry } from "styled-jsx";
import { Cep } from "@/types/Cep";


const Page = () => {

  //Declarações de estados, usando hook useState 
  const [cep, setCep] = useState<Cep | null>(null);  //Armazena dados do CEP (inicialmente é null)
  const [loading, setLoading] = useState(false);     //Indica se a requisição está em andamento
  const [inputCep, setInputCep] = useState('');      //Armazena o valor digitado pelo usuário (concatena na url da APi)



  //GET dentro da API, me retornando a lista de usuários
  //Um hook que causa um efeito colateral, requisição a API
  useEffect(() => {
          setLoading(true);

  //Assíncrona --> Promisse de uma resposta no futuro (THEN)  --> ((Requisição da API)) <--
          fetch(`https://viacep.com.br/ws/${inputCep}/json/`)
          .then((resposta) => resposta.json())                // --> Conversão da resposta para JSON
          .then(json => {                                     // --> Manipula os dados JSON retornados
            console.log('Executando requisição')
            setCep(json);                                    // --> Atualiza o estado do CEP com os dados retornados
          })

  //Executado quando ocorrer algum erro
          .catch(() => {
            setLoading(false) // --> Indica que a requisição terminou
            console.log("Error durante execução...")
          })

  // Fim do processo...
          .finally(() => {
            setLoading(false);
          })
        
  },[inputCep]);

  const handleChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCep(e.target.value);
  }

  return (    
      <div className=" flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded shadow-md w-full mx-w-md text-center border p-4 text-black">
          <h1 className="text-3xl mb-4">INFORMAÇÕES DO CEP</h1>
      
      <input
        type="text"
        value={inputCep}
        onChange={handleChange}
        placeholder="Digite o CEP"
        className="border p-2" />

      {loading  && <p>'Carregando...'</p>}

    {cep && (
      <div>
        <p><strong>Bairro:</strong>{cep.bairro}</p>
        <p><strong>Estado:</strong>{cep.estado}</p>
        <p><strong>Localidade:</strong>{cep.localidade}</p>
        <p><strong>Uf:</strong>{cep.uf}</p>
        <p><strong>Logradouro:{cep.logradouro}</strong></p>
        <p><strong>Região</strong>{cep.regiao}</p>
        <p><strong>DDD:</strong>{cep.ddd}</p>
      </div>
    )}
    </div>
  </div>
  )
}

export default Page;