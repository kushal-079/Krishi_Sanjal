import React from 'react'
import './Middle1.css'
import { assets } from '../../../assets/assets'

const Middle1 = () => {
  return (
    <div className="Middle1">
      <div className="middle">
                <div className="inventory">
                    <img src={assets.inventory} alt="Inventory"/>
                    <div className="h31">Inventory Management</div>
                    <div className="p1">Easily manage your inventory by adding, editing, or removing products to keep listings accurate and updated.</div>
                    <div className="b1">
                        <button>Manage Inventory</button>
                    </div>
                </div>
                <div className="order">
                <img src={assets.order} alt="order"/>
                <div className="h32">View Orders</div>
                <div className="p2">Track all your orders and view details, status, and manage deliveries efficiently. </div>
                <div className="b2">
                    <button>Order Status</button>
                </div>
                </div>
                <div className="setting">
                    <img src={assets.setting} alt="Setting"/>
                    <div className="h33">Create Profile</div>
                    <div className="p3">Create a profile to represent your farm, add contact details for seamless customer communication.</div>
                    <div className="b3">
                        <button>Setup Profile</button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Middle1