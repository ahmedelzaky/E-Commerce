import { useState } from "react";
import { createContext } from "react";


export const darkContext = createContext();



const DarkContextProvider = (props) => {

    
const [dark , setDark] = useState(false);

const handleDarkMode = () =>{

    setDark(!dark);
}


  return (
     <darkContext.Provider value={{handleDarkMode , dark , setDark}}>
        {props.children}
     </darkContext.Provider>
  )
}
export default DarkContextProvider;