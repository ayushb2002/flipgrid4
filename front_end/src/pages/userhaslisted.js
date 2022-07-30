import React, {useState,useEffect,useRef} from "react"
import { Grid } from '@material-ui/core'
import Listed from "../components/Product/Listed";
import {app,database} from '../firebaseconfig'
import {collection,addDoc,getDocs,doc,updateDoc,deleteDoc,where,query,onSnapshot} from "firebase/firestore";
import { getStorage,ref } from "firebase/storage";
import { WalletContext } from '../context';

export const User_has_listed = () => {
    const { wal,setWal }=React.useContext(WalletContext)
    const itemsRef = collection(database,'items')
    

    const [getVer, setGetVer] = useState(false); 
    const [products, setProducts]= useState([])
    var index=1;
    const getItemsouter=()=>{
        const getItems = async ()=>{
            var temparray=[]
            if(wal!==undefined)
            {   const Query =  query(itemsRef,where("owner",'==',wal))
                 const get= await getDocs(Query)
                get.forEach(async (doc)=>{
                    if (doc.data()['onsale']){
                        const link=doc.data()['ipfs']
                        var temp={
                            id: index++,
                            name: doc.data()['name'],
                            serial_number: doc.data()['serial'],
                            tokenview: doc.data()['nft_link']
                        }
                        const fromipfs=async ()=>{
                            const response =await fetch(link)
                            const body= await response.json()
                            Object.keys(body).forEach((element)=>{
                                temp[element]=body[element]
                            })   
                        }
                        await fromipfs()
                        temparray.push(temp)
                        setProducts([...temparray])
                    }
            })}
            console.log(1)
            
        }
        getItems()
    }
    
      useEffect(getItemsouter,[wal])
    return (

        <div style={{width: 'auto', padding: '2%',marginTop:'5%'}} >
           
           <Grid container justify="center" spacing={3}>
               {products.map((product) => (
                   <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                       <Listed product={product} />
                   </Grid>
               ))}
           </Grid>
     
           </div>

    );
}
