import { slots } from '../dummydata/index'
import { Card } from '../card'
import { Text } from '../text'
import { ArrowLeft } from 'react-feather'
import {Carousel} from '../carousel/index'

export const TailorSlot = () => {


    const monthnames = ["January", "February", "March", "April", "May", "June", "July", "Auguast", "September", "Octobar", "November", "December"];

    return (
        <div>
            <Card.Simple>
                <Card.Header className="bg-white border-0">
                    <div className='d-flex'>
                        <Text className="fs-18 ml-1 mt-1 mb-0 text-capitalize fw-bolder"> <ArrowLeft size={20} /> Select a Slot </Text>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="slot-section">
                        <Text className="text-12"><span className="fw-bold">Select Date </span><span className="fw-thin">{new Date().getDate() + "-" + monthnames[new Date().getMonth()] + "-" + new Date().getUTCFullYear()}</span></Text>
                    </div>
                    <Carousel/>
                        {/* {slots.map((slot, index) => {
                            return (
                                <div key={index}>

                                        <Card.Simple>
                                            <Text className="text-12"><span className="fw-bold">{slot.time}</span></Text>
                                        </Card.Simple>

                                    
                                        <Card.Simple>
                                            <Text className="text-12"><span className="fw-bold">{slot.day}</span></Text>
                                        </Card.Simple>

                                    
                                </div>
                            )
                        })}
                    </Carousel> */}
                </Card.Body>
            </Card.Simple>
        </div>
    )
}


// export const AddressForm = () => {
//     return (

//     )
// }


// export const FebricAndMeasurement = () => {
//     return (

//     )
// }

// export const BookingDetails = () => {
//     return (

//     )
// }

// export const TotalAmount = () => {
//     return (

//     )
// }

// export const TailorCall = () => {
//     return (

//     )
// }