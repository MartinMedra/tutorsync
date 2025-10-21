import socket from '../../../socket'
import { useState, useContext } from "react";
import {AuthContext} from '../../../context/AuthContext/AuthContext';

function Chat(){
    const [message, setMessage] = useState('');
    const {user} = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('join', user.id);
        socket.emit('message', message);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Escribe tu mensaje..." onChange={(e) => setMessage(e.target.value)} />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
    
}

export default Chat;
