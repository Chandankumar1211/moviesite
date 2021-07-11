import React, { memo } from 'react';
import { Input, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import SearchImge from '../img/search-icon.png';
import HomeImg from '../img/home.png';

const Header = ({ onSearch, searchValue, title }) => {
    let history = useHistory();
    const onHomeClick = () => {
        history.push('/');
    }
    return (
        <header className="hearder">
            <Row className="header-bar">
                <Col xs={9} sm={9} md={6} lg={6}>
                    {
                        title && <div className="header-title fw-500">{title}</div>
                    }
                    {onSearch && <>
                        <img src={SearchImge} alt="No Image" className="search-icon" />
                        <Input type="text" name="email" placeholder="Search" className="search-box" onChange={onSearch} value={searchValue} />
                    </>
                    }
                </Col>
                <Col xs={3} sm={3} md={6} lg={6} className="home-icon cursor-pnt">
                    <img src={HomeImg} alt="No Image" onClick={onHomeClick} />
                </Col>
            </Row>
        </header>
    )
}

export default memo(Header)
