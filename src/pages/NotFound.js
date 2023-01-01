import { Result } from 'antd'
import { NavLink } from 'react-router-dom';

export default function NotFound() {
    return (
        <Result
            className='position-absolute bg-white'
            style={{ top: 0 }}
            status="404"
            subTitle="Üzgünüz bu sayfa bulunamadı."
            extra={<NavLink to="/" type="primary">Ana Sayfaya Dön</NavLink>}
        />
    )
}
