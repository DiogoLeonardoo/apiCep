import { Item } from "@/types/Item";

 type AddAction = {
    type: 'add';
    payload: {
        text: string;
    }
 }

 type EditTextAction = {
    type: 'editText';
    payload: {
        id: number;
        newText: string;
    }
 }

 type ToggleDoneAction = {
    type: 'toggleDone';
    payload: {
        id: number;
    }
 }

 type RemoveAction = {
    type: 'remove';
    payload: {
        id: number;
    }
 }

 type ListActions = AddAction | EditTextAction | ToggleDoneAction | RemoveAction;
 

                     //Dados Originais    //Ação a ser executada
export const listReducer = (list: Item[], action: ListActions) => {

    switch(action.type) {

        case 'add':
            return [...list, { 
                id: list.length,
                text: action.payload.text, 
                done:false
              }]

        case 'editText':
            return list.map(t => {
                if (t.id === action.payload.id) {
                    t.text = action.payload.newText;
                }
                return t;
                });
            
        //list.map é utilizado para criar um novo array, com os resultados
        //a função é aplicada a cada item t no array list.
        //Verificar se o id do item t atual é igual ao id fornecido em action.payload.id
        //Altera o status da checkbox (DONE!)  --> Primeiros passos da verificação de estado

        //O return {...t, done: !t.done} criar um novo objeto cópia do item t, mas com
        //o valor done

        case 'toggleDone':
            return list.map(t => {
              if (t.id === action.payload.id) {
                return { ...t, done: !t.done };
              }
              return t;
            });

        case 'remove':
            return ( list.filter(t => t.id !== action.payload.id) );
        
        default:
            return list;
    }
        //Executar alguma ação -> Action.
        action.type    // Qual ação
        action.payload //Carga enviada junto a ação -> Paramêtros

        return list;
}