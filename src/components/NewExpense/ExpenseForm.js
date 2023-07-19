// import { getAllByAltText } from '@testing-library/react';
import './ExpenseForm.css';

import React, { useState } from 'react';
// import userEvent from '@testing-library/user-event';
const ExpenseForm = () => {
    const submitHandler = (event) => {
        event.preventDefault();
        const ExpenseData = {
            title: enteredTitle,
            product: enteredProduct,
            date: new Date(enteredDate)
        }
    let textString =  "Issue raise for "+  ExpenseData.product+" - on " + ExpenseData.date + " with description "+ ExpenseData.title;          
    let jsonData ={ "type":"message",
              "attachments":[
               {
                  "contentType":"application/vnd.microsoft.card.adaptive",
                  "contentUrl":null,
                  "content":{
                     "$schema":"http://adaptivecards.io/schemas/adaptive-card.json",
                     "type":"AdaptiveCard",
                     "version":"1.4",
                     "msTeams": { "width": "full" },
                     "body":[
                         {
                         "type": "TextBlock",
                         "text": textString,
                         "wrap": true
                         }
                     ]
                  }
               }
            ]
         };
        fetch('https://eygs.webhook.office.com/webhookb2/4f29d528-07c6-41c3-b0ba-2b34307292d4@5b973f99-77df-4beb-b27d-aa0c70b8482c/IncomingWebhook/6d3584eb65944fb7b578b95786a88cff/f8d13bcd-d81d-4c69-ba19-247b1840dbf4',{
            'method': 'POST',
            'mode': 'no-cors',
            'body': JSON.stringify(jsonData),
            'Content-Type' : 'application/javascript'
        });
        // to bring back the form in intial state after submit
        setEndteredDate('');
        setEndteredTitle('');
        setEnteredProduct('NA');
    }
    //**************maintaining individual useState*************
    const [enteredTitle, setEndteredTitle] = useState('');
    const [enteredDate, setEndteredDate] = useState('');
    const [enteredProduct, setEnteredProduct] = useState('');
    const titleChangeHandler = (event) => {
        setEndteredTitle(event.target.value);
    };
    const dateChangeHandler = (event) => {
        setEndteredDate(event.target.value);
    };
    const dropdownChangeHandler = (event) => {
        setEnteredProduct(event.target.value);
    };
    
    return(
        <form onSubmit={submitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                        <label>Product Name</label>
                        <select value={enteredProduct} onChange={dropdownChangeHandler}>
                            <option value='NA' default>NA</option>
                            <option value='Product1'>Product1</option>
                            <option value='Product2'>Product2</option>
                            <option value='Product3'>Product3</option>
                            <option value='Product4'>Product4</option>
                        </select>
                </div>
                <div className='new-expense__control'>
                    <label>Description</label>
                    <input type='text' value={enteredTitle} onChange={titleChangeHandler}/>
                </div>
                <div className='new-expense__control'>
                    <label>Date</label>
                    <input type='date' value={enteredDate} min='2021-01-01' max='2023-12-31' onChange={dateChangeHandler}/>
                    {/* <input type='date' onChange={(event) => inputChangeHandler('date',event.target.value)}/> */}
                </div>
            </div>
            <div className='new-expense__actions'>
                <button type='submit'>Create Ticket</button>
            </div>
        </form>
    );
}

export default ExpenseForm;