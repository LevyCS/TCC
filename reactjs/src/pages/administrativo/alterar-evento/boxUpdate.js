import Container from './boxUpdate-styled'

export default function BoxUpdate(props) {

    const dates = props.dates;
    
    return (
        <Container>
            <div className="second-h">  
                    {!dates ? <div> </div> :
                    dates.map((item, i) => {
                        return <div> 
                                    {console.log(item)}
                                    <input type="date" value={(item.data).substring(0, 10)} onChange={e => props.updateDate(e.target.value, i)}/>
                                    {item.horarios.map(item2 => {
                                        return <input type="time" value={item2} />
                                    })}
                                </div>
                    })}
                </div>
        </Container>
    )
}