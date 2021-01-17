import React, {useState} from "react";
import {Index as TomcatIndex} from "../contents/tomcat";
import {Index as SpringIndex} from "../contents/spring5";
import {Index as JavaIndex} from "../contents/java8";
import {Index as MavenIndex} from "../contents/maven";
import {Index as RegexIndex} from "../contents/regex";
import {Index as GitIndex} from "../contents/git";
import {GitCheats} from "../contents/git/git-cheats";

export function Content() {
    const [data, setData] = useState();
    React.useEffect(() => {
        setData(<GitCheats/>);
    }, []);
    return (
        <div style={{margin: '3px'}}>
            <div style={{background: '#90ccff', marginBottom: '10px'}} id={'header'}>
                <GitIndex setData={c => setData(c)}/>
                <JavaIndex setData={c => setData(c)}/>
                <RegexIndex setData={c => setData(c)}/>
                <TomcatIndex setData={c => setData(c)}/>
                <MavenIndex setData={c => setData(c)}/>
                <SpringIndex setData={c => setData(c)}/>
            </div>
            <div className={'hidden-scroll-all page'}>{data}</div>
            <a href={'#header'} style={{position: 'fixed', bottom: '5px', right: '5px', zIndex: '999'}}>
                <svg viewBox="0 0 512 512" width={30} height={30}>
                    <path fill={'#1d72aa'}
                          d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm143.6 28.9l72.4-75.5V392c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V209.4l72.4 75.5c9.3 9.7 24.8 9.9 34.3.4l10.9-11c9.4-9.4 9.4-24.6 0-33.9L273 107.7c-9.4-9.4-24.6-9.4-33.9 0L106.3 240.4c-9.4 9.4-9.4 24.6 0 33.9l10.9 11c9.6 9.5 25.1 9.3 34.4-.4z"/>
                </svg>
            </a>
        </div>
    )
}