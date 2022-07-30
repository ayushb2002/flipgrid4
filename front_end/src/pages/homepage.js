import './homepagee.css'
import { useState,useEffect} from 'react'
import {MyWallet} from './wallet'
const Home =()=>{
    return(
        <>
        <div className='normaldabba'>
        <div className='tedhadabba'>
            
        </div></div>
        <div></div>
        <div style={{marginTop:"225px",  position:'absolute',left:'20%',top:'0%',fontSize:30}}>Welcome to WarrantyNFT</div>
        <div style={{marginTop:"260px",  position:'absolute',left:'20%',top:'0%',fontSize:30}}>A one stop solution for all your buying needs</div>
        <div style={{marginTop:"350px",  position:'absolute',left:'20%',top:'0%',fontSize:30}}>Simply connect your Matic wallet to start</div>
        <MyWallet/>
        
        </>
    )
    
}
export default Home;