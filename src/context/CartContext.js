import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";


const CartContext = createContext();

export function useCartContext(){
    return useContext(CartContext);
}

export default function CartContextProvider({ children }) {
    const [cart, setCart] = useState([]);
    const {currentUser} = useAuth();


    const handleAdd = (prod) => {
        console.log("ENTERS HANDLE ADD ", typeof prod.id);
        console.log("CART ", cart);
        const index = cart.findIndex((item) => parseInt(item.id) === parseInt(prod.id));
        if(index === -1){
            console.log("Enter -1");
            const cartItems = cart;
            cartItems.push({...prod, qty: 1});
            // setCart([...cart, {...prod, qty: 1}]);
            setCart([...cartItems])
        }else{
            console.log("Enters index");
            cart[index].qty++;
            setCart(cart);
        }
        updateCartForTheCurrentUser(currentUser.email, cart);
    };

    const handleRemove = (prod) => {
        const index = cart.findIndex((item) => item.id === prod.id);
        if(index === -1){
            console.log("item not Present in the cart");
        }else{
            console.log(cart[index]);
            if(cart[index].qty >1){
                cart[index].qty--;
                setCart(cart);
            }
            else if(cart[index].qty <=1){
                removeItemFromCart(index);
            }
        }
        console.log(prod);
    };

    async function updateCartForTheCurrentUser(email, cart){
        const currentUserCart = doc(db, "users", email);
        await updateDoc(currentUserCart, {
            cart : cart
        });
    }


    function removeItemFromCart(index){
        let filteredItems = cart.filter((item) => item.id !== cart[index].id)
        console.log("filtered Items ", filteredItems);
        setCart([...filteredItems]);
    }
    const value = {
        handleAdd,
        handleRemove,
        cart,
        setCart

    }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
