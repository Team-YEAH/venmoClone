

export default function StackImg(props){

    return(
        <div className="StackContainer">
            if (orientation === "left")
            {<>
            <div>
                <img src={props.imgUrl}/>
            </div>

            <div>
                <p>
                   {props.text}
                </p>
            </div>
            </>}
            else
            {<>
            <div>
                <p>
                   {props.text}
                </p>
            </div>

            <div>
                <img src={props.imgUrl}/>
            </div>
            </>}
        </div>
    )
}
