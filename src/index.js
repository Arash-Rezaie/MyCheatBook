import React from "react";
import ReactDOM from 'react-dom';
import './res/styles/main.css';
import {Content} from "./components/content";
import PopupHandler from "./components/popup-handler";
import {Xml} from "./components/blocks";

function getMainContent() {
    return <><Content/><PopupHandler/></>;
}

function getScript() {
    return (
        <Xml title={true} description={'this config fails'}>
            {`<bean id="student" class="com.arash.models.disorderedbean.Student">
                                    <constructor-arg ref="shoes"/>
                                </bean>
                                <bean id="shoes" class="com.arash.models.disorderedbean.Shoes">
                                    <constructor-arg ref="student"/>
                                </bean>`}
        </Xml>
    )
}

ReactDOM.render(getMainContent(), document.querySelector('#root'));
// ReactDOM.render(getScript(), document.querySelector('#root'));