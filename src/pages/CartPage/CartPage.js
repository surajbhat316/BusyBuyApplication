import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import "./CartPage.css";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';


export default function CartPage() {

    const {currentUser} = useAuth();
    let [cartItems, setCartItems] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [total, setTotal] = useState(0);

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

    useEffect(() => {
        console.log("Enters second useEffect");
        calculateTotalCartAmount(cartItems)
    },[cartItems]);

    useEffect(()=>{
        if(currentUser){
            async function getOrdersData(){
                let ordersData = [];
                const docRef = doc(db, "users", currentUser.email);
                const docSnap = await getDoc(docRef);
    
                if (docSnap.exists()) {
                    console.log("Orders:", docSnap.data().orders);
                    ordersData = docSnap.data().orders;
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }

                console.log("oreders data ", ordersData);
                setOrderItems([...ordersData]);
    
            }
            getOrdersData();
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
        cartItems = filteredItems;
        setCartItems([...cartItems])
    }
    async function updateCartForTheCurrentUser(email, cart){
        const currentUserCart = doc(db, "users", email);
        await updateDoc(currentUserCart, {
            cart : cart
        });
    }


    function calculateTotalCartAmount(cartItems){
        let totalAmount = 0;
        cartItems.forEach((item) =>{
            console.log(item);
            totalAmount+= parseInt(item.qty) * parseInt(item.price)
        })
        setTotal(totalAmount);
    }

    function handleMakePayment(){
        if(currentUser){
            console.log("Enters handleMakePayment");
            console.log(orderItems);
            let orderedItems = [...orderItems];
            orderedItems.unshift(...cartItems);
            console.log(orderedItems);
            updateOrdersForTheCurrentUser(currentUser.email, orderedItems);
            toast("Order Placed");
        }
        

        
    }


    async function updateOrdersForTheCurrentUser(email, orderedItems) {
        const currentUserCart = doc(db, "users", email);
        await updateDoc(currentUserCart, {
            orders : orderedItems
        });
        setCartItems([]);
        updateCartForTheCurrentUser(email, []);
    }

  return (
    <div>
        <ToastContainer />
        <div className="cartItemsContainer">
        {cartItems.length === 0?
         <h1>Cart is Empty</h1>:
         
         cartItems.map((items,i) => {
            return (
                <div className="cartItem" key={i}>
                    <div className="nameAndPrice">
                        <div>
                            {items.name}
                        </div>
                    </div>
                    <div style={{margin: "auto", fontWeight: "bold"}}>
                        Total Price: {items.qty*items.price}
                    </div>
                    <div className="btnGroup">
                        <button onClick={() => addMoreItems(items)} className="btn btn-primary">+</button>
                        <p>{items.qty}</p>
                        <button onClick={() => removeItems(items)} className="btn btn-primary">-</button>
                    </div>
                </div>
            )
         })}
        </div>
        <div className='totalsAndPayment'>
            <div className='amtContainer'>
                <div>
                    Total Amount
                </div>
                <div>
                    {total}
                </div>
            </div>
            {total !== 0 && <div className='btnContainer'>
                <button onClick={handleMakePayment} className='btn btn-secondary'>Make Payment</button>
            </div> }
            
        </div>
    </div>
  )
}
