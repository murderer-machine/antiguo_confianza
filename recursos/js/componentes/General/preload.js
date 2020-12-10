import React, { useState, useEffect } from 'react'
import { URL } from '../../Variables'
import './preload.scss'
const Preload = ({ texto, visible }) => {
    return (
        <>
            <div id="preload" style={{ display: visible ? 'flex' : 'none' }}>
                <div className="preload_hijo">
                    <img
                        className="my-3 block"
                        src={`${URL}recursos/img/logo_mini.svg`}
                        alt="Third slide"
                    />
                </div>
                <div className="spinner preload_hijo">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
                <div className="preload_hijo">
                    <h5 className="py-2">{texto}</h5>
                </div>
            </div>
        </>
    )
}
export default Preload
