import { Bookmark } from "react-feather"
import { Text } from "../text"
import { useRouter } from "next/dist/client/router"
import Image from "next/image"
import { Requests } from "../../utils/Http/index"

export const Category = (props) => {
    const router = useRouter()
    const hosturl = Requests.HostUrl
    return (
        <div className="card mb-3" style={{ maxWidth: "540px", cursor: "pointer" }} onClick={() => router.push(`/products/${props.item._id}`)}>
            <div className="row">
                <div className="col-4 my-auto text-center p-0 m-0" >
                    <div className="pt-1 pb-1">
                        {props.item && props.item.icon ? <img src={hosturl+props.item.icon} alt="" height={90} width={150} /> :
                            <Bookmark size={75} className="text-primary" />}
                    </div>
                </div>
                <div className="col-6 my-auto">
                    <div className="card-body m-0 p-0 ms-2 ">
                        <Text className="mb-0 fw-normal fs-16 mb-0">{props.item.name}</Text>
                        <Text className="fw-normal fs-12 m-0 p-0 text-muted">{props.item && props.item.products.length} Items in Category</Text>
                    </div>
                </div>
            </div>
        </div>
    )
}