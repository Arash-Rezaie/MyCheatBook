import React from "react";
import PopupHandler from "./popup-handler";

/**
 * <Bubble><firstElement:anchor><secondElement:popup></Bubble>
 */
export class Bubble extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: undefined};
        this.r = React.createRef();
    }

    showBubble(e) {
        console.log('show popup');
        PopupHandler.showPopup('bubble', this.r.current, this.props.children[1], {
            arrow: true,
            // placement: 'right',
            className: 'arrowed-menu',
            interactive: true,
            modifiers: [{name: 'offset', options: {offset: [5, 5],},},],
        });
    }

    render() {
        return <div ref={this.r} className={'inline ' + this.props.className} style={this.props.style}
                    onMouseEnter={e => this.showBubble(e)}>{this.props.children[0]}</div>;
    }
}

/**
 *<InfoIcon><children:popup></InfoIcon>
 */
export function InfoIcon(props) {
    return (
        <Bubble className={'info-bubble icon-size'}>
            <svg viewBox="0 0 512 512">
                <path fill={'#1d72aa'}
                      d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"/>
            </svg>
            {props.children}
        </Bubble>
    )
}