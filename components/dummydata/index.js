import AllImage from '../allimage/index'
import { Camera, ShoppingCart, ZoomIn } from "react-feather"

export const options = [
    {
        active: true,
        title: "Shirt",
        description: "starting from 127 BDT",
        img: AllImage.Shirt,

    },
    {
        active: false,
        title: "pant",
        description: "starting from 127 BDT",
        img: AllImage.Pant,
        className: "rounded-0"
    },
    {
        active: false,
        title: "suite",
        description: "starting from 127 BDT",
        img: AllImage.Suit,
        className: "rounded-0"
    },
    {
        active: false,
        title: "panjabi",
        description: "starting from 127 BDT",
        img: AllImage.Panjabi
    },
]


export const works = [
    {
        img: AllImage.FirstImage,
        title: "SignUp/Login",
        description: `You can sign-up through Gmail or any social media account.
                                Also, You can Create new Account.
                    Storefront URL, to access your product, will be provided.`
    },
    {
        img: AllImage.SecondImage,
        title: "Select febric",
        description: `You can sign-up through Gmail or any social media account.
                                Also, You can Create new Account.
                    Storefront URL, to access your product, will be provided.`
    },
    {
        img: AllImage.ThirdImage,
        title: "Customize Design",
        description: `You can sign-up through Gmail or any social media account.
                                Also, You can Create new Account.
                    Storefront URL, to access your product, will be provided.`
    },
    {
        img: AllImage.FourthImage,
        title: "Self-measurement",
        description: `You can sign-up through Gmail or any social media account.
                                Also, You can Create new Account.
                    Storefront URL, to access your product, will be provided.`
    },
    {
        img: AllImage.FifthImage,
        title: "Payment Gateway",
        description: `You can sign-up through Gmail or any social media account.
                                Also, You can Create new Account.
                    Storefront URL, to access your product, will be provided.`
    },
    {
        img: AllImage.SixthImage,
        title: "Sell it",
        description: `You can sign-up through Gmail or any social media account.
                                Also, You can Create new Account.
                    Storefront URL, to access your product, will be provided.`
    },
]



export const showsidebar = [
    {
        title: 'Cart',
        comp: <ShoppingCart size={20} />
    },
    {
        title: 'Zoom',
        comp: <ZoomIn size={20} />
    },
    {
        title: 'Camera',
        comp: <Camera size={20} />
    }
]


export const slots = [
    {
        day: 'Saturday',
        time: new Date().getDate()
    },
    {
        day: 'Sunday',
        time: new Date().getDate()
    },
    {
        day: 'Monday',
        time: new Date().getDate()
    },
    {
        day: 'Tuesday',
        time: new Date().getDate()
    },
    {
        day: 'Wednesday',
        time: new Date().getDate()
    },
    {
        day: 'Thursday',
        time: new Date().getDate()
    },
    {
        day: 'Friday',
        time: new Date().getDate()
    },
]

export const febrics = [
    {
        qtype: "EASY IRON",
        title: "Royale, White",
        desc: "Satin, 100% Long Staple Cotton, 134 g/m",
        recommended: true,
        recommendation_type: "First-Shirt",
        rating: 4.6,
        price: "127 BDT",
        Img: AllImage.Febric1,
        active: true
    },
    {
        qtype: "EASY IRON",
        title: "Royale, White",
        desc: "Satin, 100% Long Staple Cotton, 134 g/m",
        recommended: true,
        recommendation_type: "Another-Shirt",
        rating: 4.6,
        price: "127 BDT",
        Img: AllImage.Febric2
    },
    {
        qtype: "EASY IRON",
        title: "Royale, White",
        desc: "Satin, 100% Long Staple Cotton, 134 g/m",
        recommended: true,
        recommendation_type: "First-Shirt",
        rating: 4.2,
        price: "85 BDT",
        Img: AllImage.Febric3
    },
    {
        qtype: "EASY IRON",
        title: "Royale, White",
        desc: "Satin, 100% Long Staple Cotton, 134 g/m",
        recommended: true,
        recommendation_type: "First-Shirt",
        rating: 4.6,
        price: "29 BDT",
        Img: AllImage.Febric1
    },
    {
        qtype: "EASY IRON",
        title: "Royale, White",
        desc: "Satin, 100% Long Staple Cotton, 134 g/m",
        recommended: false,
        recommendation_type: "First-Shirt",
        rating: 4.6,
        price: "122 BDT",
        Img: AllImage.Febric4
    },
    {
        qtype: "EASY IRON",
        title: "Royale, White",
        desc: "Satin, 100% Long Staple Cotton, 134 g/m",
        recommended: true,
        recommendation_type: "First-Shirt",
        rating: 4.6,
        price: "127 BDT",
        Img: AllImage.Febric2
    },
    {
        qtype: "EASY IRON",
        title: "Royale, White",
        desc: "Satin, 100% Long Staple Cotton, 134 g/m",
        recommended: true,
        recommendation_type: "First-Shirt",
        rating: 4.6,
        price: "127 BDT",
        Img: AllImage.Febric3
    }
]