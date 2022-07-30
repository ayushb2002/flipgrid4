import { createContext,useState } from "react";
export const WalletContext=createContext()
export const WalletProv=({children})=>{
    const [wal,setWal]=useState(null)
    return(
        <WalletContext.Provider value={{wal:wal,setWal:setWal}}>{children}</WalletContext.Provider>
    )
}