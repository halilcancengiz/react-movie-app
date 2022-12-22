import { Result } from 'antd'
import { NavLink } from 'react-router-dom';

export default function NotFound() {
    return (
        <Result
            className='position-absolute bg-white'
            style={{ top: 0 }}
            status="404"
            title="404"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<NavLink to="/" type="primary">Back Home</NavLink>}
        />
    )
}
