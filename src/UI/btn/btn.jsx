

function StyledBtn(props) {
    const style = {
        border: "none",
        marginTop : "1em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "10em",
        height: "2.5em",
        padding: "0.5em",
        borderRadius: "1em",
        backgroundColor: props.backgroundColor,
        fontSize: "1.1em",

    }
    
    return <button style={style} onClick={(e) => { props.handler(e) }}>{props.text}</button>
}

export default StyledBtn