import React, {useState,useEffect} from "react"
import { Grid } from '@material-ui/core'
import {Product }from "../components/Product/Product";
import {app,database} from '../firebaseconfig'
import {collection,addDoc,getDocs,doc,updateDoc,deleteDoc,where,query,onSnapshot} from "firebase/firestore";
import { getStorage,ref } from "firebase/storage";


export const Things = () => {
    const itemsRef = collection(database,'items')
    const Query =  query(itemsRef,where("onsale",'==',true))
    const [getVer, setGetVer] = useState(false); 
    const [products, setProducts]= useState([
        // {id: 1, name:'Laptop', description:'Asus Tuf A15', price: '₹112000', image: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8&w=1000&q=80'},
        // {id: 2, name:'Keyboard', description:'Redgear Keyboard', price: '₹1100', image:'https://m.media-amazon.com/images/I/71TBg4r1oNL._AC_SY450_.jpg'},
        // {id: 3, name:'Laptop', description:'Asus Tuf A15', price: '₹112000', image: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8&w=1000&q=80'},
        // {id: 4, name:'Keyboard', description:'Redgear Keyboard', price: '₹1100', image:'https://m.media-amazon.com/images/I/71TBg4r1oNL._AC_SY450_.jpg'},
        // {id: 5, name:'Laptop', description:'Asus Tuf A15', price: '₹112000', image: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8&w=1000&q=80'},
        // {id: 6, name:'Keyboard', description:'Redgear Keyboard', price: '₹1100', image:'https://m.media-amazon.com/images/I/71TBg4r1oNL._AC_SY450_.jpg'},
        // {id: 7, name:'Keyboard', description:'Redgear Keyboard', price: '₹1100', image:'https://m.media-amazon.com/images/I/71TBg4r1oNL._AC_SY450_.jpg'},
        // {id: 8, name:'Laptop', description:'Asus Tuf A15', price: '₹112000', image: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8&w=1000&q=80'},
        // {id: 9, name:'Keyboard', description:'Redgear Keyboard', price: '₹1100', image:'https://m.media-amazon.com/images/I/71TBg4r1oNL._AC_SY450_.jpg'},
        // {id: 10, name:'Laptop', description:'Asus Tuf A15', price: '₹112000', image: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8&w=1000&q=80'},
        // {id: 11, name:'Keyboard', description:'Redgear Keyboard', price: '₹1100', image:'https://m.media-amazon.com/images/I/71TBg4r1oNL._AC_SY450_.jpg'},
    ])
    var index=1;
    const getItemsouter=()=>{
        const getItems = async ()=>{
            var temparray=[]
            const get= await getDocs(Query)
            get.forEach(async (doc)=>{
                const link=doc.data()['ipfs']

                var temp={
                    docid:doc.id,
                    id: index++,
                    name: doc.data()['name'],
                    serial_number: doc.data()['serial'],
                    owner: doc.data()['owner'],
                    ipfs:doc.data()['ipfs']
                }
                const fromipfs=async ()=>{
                    const response =await fetch(link)
                    const body= await response.json()
                    Object.keys(body).forEach((element)=>{
                        temp[element]=body[element]
                    })   
                }
                await fromipfs()
                console.log(temp)
                temparray.push(temp)
                setProducts([...temparray])
            })
            
            console.log('temp')
        }
        getItems()
    }
    useEffect(getItemsouter,[])
    return (
        <div style={{width: 'auto', padding: '2%',marginTop:'5%'}} >
           
        <Grid container justify="center" spacing={3}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} />
                </Grid>
            ))}
        </Grid>
  
        </div>  
    );
}
