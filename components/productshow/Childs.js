import { SecondaryButton } from "../button"
import { Text } from "../text"
import { Menu, Heart, FileText, Aperture, RefreshCw, Download } from "react-feather"

export const ChildButton = (props) => {
    return(
        <div className="mt-1 text-end hoverbutton" onClick={() => props.handleAction(props.title)}>
            <SecondaryButton className="p-2 pt-1 pb-1">
                {props.title ? <span className="hoveritem" >{props.title} </span> : null} {props.children}
            </SecondaryButton>
        </div>
        
    )
}


export const ChildButtons = (props) => {
    return (
        <div>
            <SecondaryButton className="p-2 pt-1 pb-1 mt-1" onClick={() => props.action("favourite")}>
                <Heart size={20} />
            </SecondaryButton>
            <br />
            <SecondaryButton className="p-2 pt-1 pb-1 mt-1" onClick={() => props.action("pdfgen")}>
                <FileText size={20} />
            </SecondaryButton>
            <br />
            <SecondaryButton className="p-2 pt-1 pb-1 mt-1" onClick={() => props.action("measurement")}>
                <Aperture size={20} />
            </SecondaryButton>
            <br />
            <SecondaryButton className="p-2 pt-1 pb-1 mt-1" onClick={() => props.action("reset")}>
                <RefreshCw size={20} />
            </SecondaryButton>
            <br />
            <SecondaryButton className="p-2 pt-1 pb-1 mt-1" onClick={() => props.action("download")}>
                <Download size={20} />
            </SecondaryButton>
        </div>
    )
}