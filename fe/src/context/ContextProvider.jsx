import React, {createContext} from 'react'

const loading= {
  isLoadingData:true,

}
const dataContext={
  loading,

}
export const ThemeContext=createContext()

const ThemeContextProvider= ({children}) =>{
  return (
    <ThemeContext.Provider value={dataContext}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider