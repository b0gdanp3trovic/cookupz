import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routing from "./Routing";
import {AppContext} from "./contexts/AppContext";


function App() {
    const [value, setValue] = useState(null);

    return (
        <div>
            <AppContext.Provider value={{value, setValue}}>
                <Routing/>
            </AppContext.Provider>
        </div>
    );
}

export default App;
