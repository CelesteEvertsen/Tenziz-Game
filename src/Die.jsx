export default function Die(props) {
    const styles ={
        backgroundColor: props.isHeld ? "#59E391" : "white",
    }
    return (
       <button 
       aria-label={`Die showing ${props.value}`}
       style={styles} 
       onClick={props.holdDice} 
       className="dice-btn">
        {props.value}
        </button> 
        /* {props.value} er ett object vi ssender verdien fra app.jsx som value={1} da tallet er verdien vi onser a sende.*/
    );
}