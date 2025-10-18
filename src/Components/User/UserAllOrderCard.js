import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import mobile from '../../images/mobile.png'
const UserAllOrderCard = ({ item }) => {
    
    return (
        <div>
            <Row className="d-flex mb-2">
                <Col xs="3" md="2" className="d-flex justify-content-start">
                    <Link to={`/products/${item._id}`} style={{ textDecoration: 'none' }}>
                        <img width="93px" height="120px" src={item.imageCover} alt="" />
                    </Link>
                </Col>
                <Col xs="8" md="6">
                    <div className="d-inline pt-2 cat-title">
                        {item.title || ''}
                    </div>
                    <div className="mt-3">
                        <div className="cat-text">المنتج: {item.title}</div>
                        <div className="cat-text">الفئة: {item.category?.name || 'غير محدد'}</div>
                        {item.duration && (
                            <div className="cat-text">المدة: {item.duration}</div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserAllOrderCard
