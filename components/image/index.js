import React from 'react'
import Image from 'next/image'

export const GeneralImage = (props) => {
    return (
        <div>
            <img
                src={props.src.src}
                className={"img-fluid " + props.className}
                alt={props.alt}
                width={props.x ? props.x : "100%"}
                height={props.y ? props.y : "100%"}
            />
        </div>
    )
}

// Circle image
export const CircleImage = (props) => {
    return (
        <div
            style={{
                width: props.x ? props.x : "100%",
                height: props.y ? props.y : "100%",
                borderRadius: "50%",
                overflow: "hidden"
            }}
        >
            <img
                src={props.src}
                alt={props.alt}
                style={{
                    width: props.x ? props.x : "100%",
                    height: props.y ? props.y : "100%"
                }}
            />
        </div>
    )
}