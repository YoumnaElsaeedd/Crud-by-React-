import React, { useState } from 'react';

function App(){
  const[deletitem,setdeleteitem]=useState(true)
  const [data,setdata]=useState(["one","two","three"])
  const[name,setname]=useState("");
  function deleteFun(index){
    setdata(data.filter((el, id) => id !== index));
  }

 

  return (
    <>
    <input type="text" onChange={(e)=>setname(e.target.value)} />
    <button onClick={()=>setdata([...data,name])}>add value</button>
    
    
     <div>
      {
        data.map((el,index)=>{
          return(
            <h2> {el} <button onClick={()=>deleteFun(index)}>x</button> </h2>
                   
          )
      } )}
     </div>
    
     </>
  )
 
}

export default App;
