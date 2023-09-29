import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import "./CartPage.css";


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


    function addMoreItems(prod){
        console.log("Enters Add More Items");
        console.log("CART ITEMS before", cartItems);
        const index = cartItems.findIndex((item) => parseInt(item.id) === parseInt(prod.id));
        if(index === -1){
            console.log("Not such item present");
        }
        else{
            cartItems[index].qty+=1;
        }
        console.log("Cart Items after", cartItems);
        setCartItems([...cartItems]);
        updateCartForTheCurrentUser(currentUser.email, cartItems);
    }


    function removeItems(prod){
        console.log("Enters Remove Items");
        const index = cartItems.findIndex((item) => item.id === prod.id);
        console.log(index);
        if(index === -1){
            console.log("item not Present in the cart");
        }else{
            // console.log(cartItems[index]);
            if(cartItems[index].qty >1){
                console.log("Enters this part");
                cartItems[index].qty--;
                setCartItems([...cartItems]);
            }
            else if(cartItems[index].qty <=1){
                removeItemFromCart(index);
            }
            updateCartForTheCurrentUser(currentUser.email, cartItems);
        }
    }

    function removeItemFromCart(index){
        let filteredItems = cartItems.filter((item) => item.id !== cartItems[index].id)
        console.log("filtered Items ", filteredItems);
        setCartItems([...filteredItems]);
    }
    async function updateCartForTheCurrentUser(email, cart){
        const currentUserCart = doc(db, "users", email);
        await updateDoc(currentUserCart, {
            cart : cart
        });
    }
  return (
    <div>
        <div className="cartItemsContainer">
        {cartItems.length === 0?
         <h1>Cart is Empty</h1>:
         
         cartItems.map((items,i) => {
            console.log(items);
            return (
                <div className="cartItem" key={i}>
                    <div className="nameAndPrice">
                        <div>
                            {items.name}
                        </div>
                        <div>
                            {items.qty*items.price}
                        </div>
                    </div>
                    <div className="btnGroup">
                        <button onClick={() => addMoreItems(items)} className="btn btn-primary">+</button>
                        {items.qty}
                        <button onClick={() => removeItems(items)} className="btn btn-primary">-</button>
                    </div>
                </div>
            )
         })}
         </div>
    </div>
  )
}
