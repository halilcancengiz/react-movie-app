import { SpinnerDotted } from 'spinners-react';

export default function Loading() {
    return (
        <div style={{ minHeight: "100vh", background: "linear-gradient(200deg,rgba(255,255,255,.8),rgba(255,255,255,.8))" }} className="position-relative">
            <SpinnerDotted size={100} color='darkblue' className='position-absolute' style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%" }} />
        </div>
    )
}
