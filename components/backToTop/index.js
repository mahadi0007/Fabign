import React, { useState, useEffect } from 'react'
import { Icon } from 'react-icons-kit'
import { triangle } from 'react-icons-kit/feather'

const Index = () => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            let isTop = window.scrollY > 400
            if (isTop !== true)
                setShow(false)
            else
                setShow(true)
        })
    }, [])

    const gotoTop = () => {
        return window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="go-to-top-container">
            {show ?
                <button type="button" className="badge-btn shadow rounded-circle border-0" onClick={gotoTop}>
                    <Icon icon={triangle} size={18} />
                </button>
                : null}
        </div>
    );
};

export default Index;