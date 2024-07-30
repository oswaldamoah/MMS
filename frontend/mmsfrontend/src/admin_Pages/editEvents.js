.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
}




main {
    flex: 1;
    margin-top: 60px; /* Adjust according to your header height */
    margin-bottom: 60px; /* Adjust according to your footer height */
    overflow-y: auto;
    padding: 20px;
}

.form {
    margin-bottom: 20px;
}

.fieldset {
    margin-bottom: 15px;
}

.legend {
    font-weight: bold;
}

.input, .textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.buttonContainer {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.importButton, .saveButton {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.importButton {
    background-color: #f0f0f0;
    color: #333;
}

.saveButton {
    background-color: #4CAF50;
    color: white;
}

.eventTitle {
    margin-top: 20px;
    text-align: center;
}

.eventTable {
    width: 100%;
    border-collapse: collapse;
}

.eventTable th, .eventTable td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

.eventImage {
    max-width: 100px;
}

.deleteButton {
    background-color: #f44336;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

