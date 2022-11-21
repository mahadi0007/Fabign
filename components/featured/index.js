import Shirt from '../../public/assets/artwork.jpg'
import User from '../../public/assets/user.jpeg'
import { useRouter } from 'next/dist/client/router'

export const Featured = () => {

    const router = useRouter()

    const handleClick = () => {
        router.push("/profile")
    }

    return (
        <div className="tagcontainer">
            <div className="cover-photo" style={{ backgroundImage: `url(${Shirt.src})` }}>
                <img src={User.src} className="profile"/>
            </div>
            <div className="fs-25 text-dark pt-5 mt-2">Beni Smith</div>
            <p className="about">8 artworks</p>
            <button className="btn btn-secondary shadow-none mb-2" onClick={() => {handleClick()}}>View Shop</button>
        </div>
    )
}