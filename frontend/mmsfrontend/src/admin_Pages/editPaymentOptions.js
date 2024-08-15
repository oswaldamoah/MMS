import React, { useState } from 'react';
import './editPaymentOptions.css';
import './AdminHeader.js';
import AdminHeader from './AdminHeader.js';

const EditPaymentOptions = () => {
    const [paymentTitle, setPaymentTitle] = useState('');
    const [paymentInfo, setPaymentInfo] = useState('');
    const [paymentOptions, setPaymentOptions] = useState([]);

    const handleSavePaymentInfo = (e) => {
        e.preventDefault();
        const newPaymentOption = {
            title: paymentTitle,
            info: paymentInfo,
        };
        setPaymentOptions([...paymentOptions, newPaymentOption]);
        setPaymentTitle('');
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
                        <legend className="legend">Payment Title and Details</legend>
                        <input
                            type="text"
                            className="input"
                            placeholder="Enter Payment Title"
                            value={paymentTitle}
                            onChange={(e) => setPaymentTitle(e.target.value)}
                            required
                        />
                        <textarea
                            className="textarea"
                            placeholder="Enter Payment Details"
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
                            <th>PAYMENT TITLE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentOptions.map((option, index) => (
                            <tr key={index}>
                                <td>{option.title}</td>
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
