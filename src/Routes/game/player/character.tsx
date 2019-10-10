import React from "react"
import character from "../../../../public/Images/game gallery/character.jpg"
import BackGround from "../../../Components/Background/Background"

function playerCaracter(props){
    return (
        <div
        style={{
            position: 'relative',
            top: props.position[1],
            left: props.position[0],
            backgroundImage: "url("+ {character} +")",
            backgroundPosition: '0, 0',
            width: "25px",
            height: "60px"

        }}
        />
    )
}