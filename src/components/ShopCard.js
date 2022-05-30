import React, { useContext } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

// Components
import Card from "./Card";

// Context
import { CardContext } from "../contexts/CardContextProvider";

const ShopCard = () => {
  const { state, dispatch } = useContext(CardContext);

  return (
    <div className="shopCard-container">
      <div className="checkout-container">
        {state.itemsCounter > 0 && (
          <div className="total-container">
            <div>
              <p>
                <span>Total Items:</span> {state.itemsCounter}
              </p>
              <p>
                <span>Total Payments:</span> ${state.total}
              </p>
            </div>

            <div className="btn-container">
              <button onClick={() => dispatch({ type: "CHECKOUT" })}>
                Check Out
              </button>
              <button
                onClick={() => dispatch({ type: "CLEAR" })}
                className="clear-btn"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {state.checkout &&
        (swal({
          text: "Checked Out Successfully!",
          icon: "success",
        }),
        (
          <div className="checkout-card">
            <h3>Checked Out Successfully!</h3>
            <Link to="/products">Back to shop</Link>
          </div>
        ))}

      {!state.checkout && state.itemsCounter === 0 && (
        <div className="empty-card">
          <h3>Your card is empty!</h3>
          <Link to="/products">Back to Shop</Link>
        </div>
      )}
      <div>
        {state.selectedItems.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ShopCard;
