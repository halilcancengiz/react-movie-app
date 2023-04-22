import { SpinnerDotted } from 'spinners-react';
import React from 'react';
import "../css/loading.css"

export default function Loading({ isLoading }) {
    return (
        <>
            {
                isLoading === false ? "" : (
                    <div className='loading-container' >
                        <SpinnerDotted size={100} color='white' />
                    </div>
                )

            }
        </>

    )
}
