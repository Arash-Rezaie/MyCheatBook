import React from "react";

/**
 *
 * @param props wh:[width, height], shapeFactory:DrawBox
 * @returns {JSX.Element}
 * @constructor
 */
export function DrawBoxComponent(props) {
    const r = React.useRef();
    React.useEffect(
        () => props.shapeFactory.render(r.current)
        ,);
    return <div style={{width: props.wh[0], minHeight: props.wh[1], margin: '0 10px 10px 0'}}
                className={'float-holder'}>
        {props.children}
        <canvas width={props.wh[0]} height={props.wh[1]} className={props.className} ref={r}/>
    </div>
}

export function TableHeader(props) {
    return <span className={'header'}>{props.children}</span>
}