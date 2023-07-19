import ExpenseDate from './ExpenseDate';
import './ExpenseItem.css';
import Card from '../UI/Card';
import React, { useState } from 'react';

const ExpenseItem = (props) => {  
    const [title, setTitle] = useState(props.title); 
    const subClickHandler = () => {
        setTitle("Updated");
        // console.log("clicked !"); this line will also get executed before the component execution get triggered by userSate
    }
    return (
        <Card className="expense-item">
            <ExpenseDate date={props.date}/>
            <div className="expense-item__description">
                <h2>{title}</h2>
                <div className='expense-item__price'>${props.amount}</div>
            </div>
            <button onClick={subClickHandler}>Change Title</button>
        </Card>
    );
}

export default ExpenseItem; 