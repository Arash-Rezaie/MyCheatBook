import React from "react";

export function Title1(props) {
    return <span className={'title1'}>{props.children}</span>
}

export function Title2(props) {
    return <span className={'title2'}>{props.children}</span>
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
    const r = React.useRef();
    React.useEffect(() => {
        let title = r.current.children[0];
        let w = title.offsetWidth;
        if (w === 0) {
            w = title.clientWidth;
        }

        if (w > 0) {
            r.current.children[1].style.textIndent = (w - 10) + 'px';
            r.current.children[1].style.marginLeft = (-w + 15) + 'px';
        }
    });

    let leftMargin = 0;
    if (props.level)
        leftMargin = props.level * props.level * 5 + 'px';
    return (
        <div style={{marginLeft: leftMargin}} className={'bullet'} ref={r}>
            <span className={'blue bold'}>{props.title}</span>
            <div className={'inline'} style={{textIndent: (props.title.length / 1.75) + 'em'}}>{props.children}</div>
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
        setLocation(location.filter((v, i) => i !== location.length - 1));
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