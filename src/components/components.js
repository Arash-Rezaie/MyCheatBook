import React from "react";

export function Title(props) {
    return <span className={'title'}>{props.children}</span>
}

export function Header(props) {
    return <span className={'header blue'}>{props.children}</span>
}

export function Blue(props) {
    return <span className={'blue'}>{props.children}</span>
}

export function Red(props) {
    return <span className={'red'}>{props.children}</span>
}

export function Purple(props) {
    return <span className={'purple'}>{props.children}</span>
}

export function Important(props) {
    return <span className={'blue'}>! {props.children}</span>
}

export function Highlight(props) {
    return <span className={'highlight'}>{props.children}</span>
}

export function HighlightBlue(props) {
    return <span className={'important highlight'}>{props.children}</span>
}

export function FlexRow(props) {
    return <div className={'flex-row'}>{props.children}</div>
}

export function FloatHolder(props) {
    return <div className={'float-holder ' + props.className} style={props.style}>{props.children}</div>
}

export function Bold(props) {
    return <span className={'bold'}>{props.children}</span>
}

export function BlueBold(props) {
    return <span className={'bold blue'}>{props.children}</span>
}

/**
 * <Bullet level={1..n} title={}>body</Bullet>
 * @param props level:number, title:string
 * @returns {*}
 * @constructor
 */
export function Bullet(props) {
    let indent = 0;
    if (props.level)
        indent = props.level * 10 + 'px';
    return (
        <div style={{marginLeft: indent}} className={'bullet'}>
            <span className={'blue bold bullet-first-child'}>{props.title}</span>
            <div className={'inline'}>{props.children}</div>
        </div>
    )
}

export function LocationFinder() {
    const [location, setLocation] = React.useState([]);
    const r = React.useRef();
    const handleOnClick = e => {
        let x = e.clientX;
        let y = e.clientY;
        let rect = r.current.getBoundingClientRect();
        let item = <span
            key={location.length}>{`${location.length + 1}:\t( ${x - rect.left} , ${y - rect.top} )`}</span>;
        setLocation(location.concat(item));
        console.log(item);
    };

    const handleRemove = e => {
        e.stopPropagation();
        setLocation(location.filter((v, i) => i != location.length - 1));
    };

    return (
        <div className={'location-finder'} onClick={e => handleOnClick(e)} ref={r}>
            <button style={{position: 'absolute', left: '0', top: '0', fontSize: '8px'}}
                    onClick={e => handleRemove(e)}>{`<-`}</button>
            {location}
        </div>
    )
}

export function HorizontalLine() {
    return <div className={'horizontal-line'}/>
}

export function VerticalLine() {
    return <div className={'vertical-line'}/>
}