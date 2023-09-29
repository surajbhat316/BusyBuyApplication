import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function CartPage() {

    const {currentUser} = useAuth();
    const [cartItems, setCartItems] = useState([]);
    useEffect(()=>{
        if(currentUser){
            console.log(currentUser.email);
            async function getCartData(){
                let cartData = [];
                const docRef = doc(db, "users", currentUser.email);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data().cart);
                    cartData = docSnap.data().cart;
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }
                setCartItems([...cartData]);

            }

            getCartData();

        }
        
    },[currentUser]);

  return (
    <div>
        
        {cartItems.length === 0? <h1>Cart is Empty</h1>: <h1>Cart has some Items</h1>}
    </div>
  )
}
