import React from "react";

import '../res/styles/highlight.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('java', java);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);
hljs.initHighlightingOnLoad();

class Block extends React.Component {
    getStyleClass() {
    }

    render() {
        let extraClsName = this.props.title ? 'block-top-gap ' : '';
        return (
            <div className={'block ' + extraClsName + this.getStyleClass()} style={this.props.style}>
                <span className={'block-header'}>{this.props.title}</span>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

/**
 * @param props title:string
 */
export class Frame extends Block {
    getStyleClass() {
        return 'frame'
    }
}

class Code extends React.Component {
    constructor(props) {
        super(props);
        this.r = React.createRef();
    }

    getStyleClass() {
        return 'code';
    }

    getTitleText() {
        let title = '';
        if (this.props.title)
            title = this.getLanguage();
        if (this.props.description)
            title += ' (' + this.props.description + ')';
        return title.length === 0 ? undefined : '- ' + title + ' ---';
    }

    getLanguage() {
    }

    componentDidMount() {
        this.correctIndention();
        hljs.highlightBlock(this.r.current);
    }

    correctIndention() {
        let str = this.r.current.innerHTML;
        let k, result, indent = 0;

        let m2 = str.search(/(?<=\n *)\S/g); //the first char after \n
        if (m2 <= 0) {//content is only 1 line
            result = str.trimStart();
        } else {//content is more than 1 line
            let m1 = str.search(/\n *\S/g) + 1; //the first \n
            indent = m2 - m1;
            m1 = str.search(/(?<=\S *)\n/g);
            result = str.substr(0, m1).trimStart();

            let l = str.length;
            while (m1 < l) {
                m2 = str.indexOf('\n', m1) + 1;
                k = m1 + indent;
                if (m2 <= 0)
                    m2 = l;
                result += k < m2 ? str.substr(k, m2 - k) : '\n';
                m1 = m2;
            }
        }
        this.r.current.innerHTML = result.trimEnd();
    }

    countStartingWhitSpace(str, start) {
        let k;
        for (k = start; k < str.length && str[k] === ' '; k++) ;
        return k - start;
    }

    render() {
        return (
            <pre>
                <span className={'code-header'}>{this.getTitleText()}</span>
                <code className={this.getLanguage()} ref={this.r}>{this.props.children}</code>
            </pre>
        )
    }
}

/**
 * @param props title:boolean, description:string
 */
export class Java extends Code {
    getLanguage() {
        return 'java'
    }
}

/**
 * @param props title:boolean, description:string
 */
export class Xml extends Code {
    getLanguage() {
        return 'xml'
    }
}

/**
 * @param props title:boolean, description:string
 */
export class Javascript extends Code {
    getLanguage() {
        return 'javascript'
    }
}

export class Bash extends Code {
    getLanguage() {
        return 'bash'
    }
}

/**
 * @param props title:String
 */
export class GenericCode extends Code {
    getLanguage() {
        return this.props.title;
    }
}