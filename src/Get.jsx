import React, { useEffect, useState } from 'react'

const Get = () => {
    const [state, setState] = useState([])


    useEffect(() => {
        fetch('https://7869-89-236-218-10.ngrok-free.app/api/v1/posts/user/getpost/')
            .then(response => response.json())
            .then(data => setState(data))
            .catch(error => console.error('Error:', error));

    }, [])

    console.log(state);

    return (
        <div>Get</div>
    )
}

export default Get