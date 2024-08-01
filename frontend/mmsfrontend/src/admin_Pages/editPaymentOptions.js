
import React, { useState } from 'react';
import './editPaymentOptions.css';
import './AdminHeader.js';
import AdminHeader from './AdminHeader.js';

const EditPaymentOptions = () => {
    const [paymentInfo, setPaymentInfo] = useState('');
    const [paymentOptions, setPaymentOptions] = useState([]);

    const handleSavePaymentInfo = (e) => {
        e.preventDefault();
        const newPaymentOption = {
            info: paymentInfo,
            date: new Date().toLocaleDateString(),
        };
        setPaymentOptions([...paymentOptions, newPaymentOption]);
        setPaymentInfo('');
    };

    const handleDeletePaymentOption = (index) => {
        const newPaymentOptions = paymentOptions.filter((_, i) => i !== index);
        setPaymentOptions(newPaymentOptions);
    };

    return ( 
        <div className="container">
            <AdminHeader headertitle={"Payment Options"} />
            <main>
                <form className="form" onSubmit={handleSavePaymentInfo}>
                    <fieldset className="fieldset">
                        <legend className="legend">Payment Information</legend>
                        <textarea
                            className="textarea"
                            value={paymentInfo}
                            onChange={(e) => setPaymentInfo(e.target.value)}
                            required
                        ></textarea>
                    </fieldset>
                    <button type="submit" className="saveButton">SAVE</button>
                </form>
                <h2 className="paymentOptionsTitle">PAYMENT OPTIONS</h2>
                <table className="paymentOptionsTable">
                    <thead>
                        <tr>
                            <th>PAYMENT INFORMATION</th>
                            <th>DATE ADDED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentOptions.map((option, index) => (
                            <tr key={index}>
                                <td>{option.info}</td>
                                <td>{option.date}</td>
                                <td>
                                    <button
                                        className="deleteButton"
                                        onClick={() => handleDeletePaymentOption(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default EditPaymentOptions;

