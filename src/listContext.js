import React, { createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import fire from "./fire";
import { useEffect } from "react";

export const listContextFire = createContext();

const INIT_STATE = {
  todo: [],
  doing: [],
  done: [],
};

const reducer = (prevState = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_TODO":
      return {
        ...prevState,
        todo: action.payload,
      };
    case "GET_DOING":
      return {
        ...prevState,
        doing: action.payload,
      };
      case "GET_DONE":
      return {
        ...prevState,
        done: action.payload,
      };
  }
};


const ListContextFire = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  // console.log(state.products);

    useEffect(()=>{
        getTasksTODO();
    },[])
  const db = getFirestore(fire);

  const getTasksTODO = async () => {
try{
    let res={}
    res = await getDocs(collection(db,"TODO"));
  
    console.log(res)
    let arr = res.docs.map((doc)=>({
        ...doc.data(),
        id : doc.id
        
    }))
    
    console.log(arr);
    dispatch({
        type:"GET_TODO",
        payload:arr
    })
    console.log()
}catch(err){
    console.log(err);
}
  };

  
  const getTasksDOING = async () => {
    try{
        let res={}
        res = await getDocs(collection(db,"DOING"));
      
        console.log(res)
        let arr = res.docs.map((doc)=>({
            ...doc.data(),
            id : doc.id
            
        }))
        
        console.log(arr);
        dispatch({
            type:"GET_DOING",
            payload:arr,
        })
        console.log()
    }catch(err){
        console.log(err);
    }
      };




//   const getOneProduct = async (id) => {
//     console.log(id);
//     try {
//       let data = await getDocs(collection(db, "list"));
//       let productDet = {};
//       data.docs.forEach((doc) =>
//         doc.id === id ? (productDet = doc.data()) : null
//       );
//       dispatch({
//         type: "GET_ONE_PRODUCT",
//         payload: productDet,
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   };

  const addTodo = async (task) => {
    try {
      await addDoc(collection(db, "TODO"), task);
      getTasksTODO();
    } catch (e) {
      console.log(e);
    }
  };

  const addDoing = async (task) => {
    try {
      await addDoc(collection(db, "DOING"), task);
      getTasksDOING();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTodo = async (id) => {
    try {
      let todo = doc(db, "TODO", id);
      console.log(todo);
      await deleteDoc(doc(db, "TODO", id));
      getTasksTODO();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteDoing = async (id) => {
    try {
      let todo = doc(db, "DOING", id);
      console.log(todo);
      await deleteDoc(doc(db, "DOING", id));
      getTasksTODO();
    } catch (error) {
      console.log(error);
    }
  };


  const editProduct = async (id, obj) => {
    try {
      let editedProduct = doc(db, "TODO", id);
      await updateDoc(editedProduct, obj);
      getTasksTODO();
    } catch (error) {
      console.log(error);
    }
  };

  const cloud = {
    getTasksTODO,
    // getOneProduct,
    addTodo,
    addDoing,
    deleteTodo,
    deleteDoing,
    editProduct,
    todoArr: state.todo,
    productDetails: state.productDetails,
    pageTotalCount: state.pageTotalCount,
  };

  return (
    <listContextFire.Provider value={cloud}>
      {children}
    </listContextFire.Provider>
  );
};

export default ListContextFire;
