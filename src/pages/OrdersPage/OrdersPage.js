import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./OrdersPage.css";

export default function OrdersPage() {
    const {currentUser} = useAuth();
    const [orderedItems, setOrderedItems] = useState([]);
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
                setOrderedItems([...ordersData]);
    
            }
            getOrdersData();
        }
    },[currentUser]);
  return (
    <div>
        {orderedItems.length === 0 && <h2 style={{textAlign: "center"}}>No Orders Yet</h2>}
        <div id="ordersContainer">
            {orderedItems.map((item, i) => {
                return (
                    <div className="orderItem">
                        <div className="orderItemName">
                            <p>{item.name}</p>
                        </div>
                        <div className="priceAndQuantity">
                            <p><b>Price</b> : {item.price}</p>
                            <p><b>Quantity</b> : {item.qty}</p>
                            <p><b>Total Amount</b> : {item.price* item.qty}</p>
                        </div>
                    </div>
                );
            })}
            
        </div>
    </div>
  )
}
