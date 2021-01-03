import React from "react";
import {Frame, GenericCode} from "../../components/blocks";
import {Blue, Bullet, Highlight, Important} from "../../components/components";
import {InfoIcon} from "../../components/bubble";

export function TomcatCheats() {
    return (
        <>
            {getTomcatStructure()}
            {getWeblogicFeatures()}
        </>
    )
}

function getTomcatStructure() {
    return (
        <Frame title={'Tomcat'}>
            <InfoIcon>
                <Blue>What is the difference between tomcat, weblogic, jboss, …?</Blue><br/>
                The difference is up to their container. The most important thing about application server is its
                container.

                <p>
                    Container provides an isolated environment which executes our application along its all
                    dependencies.
                    Therefor any technology inside the application must be supported by the container.<br/>
                    For example, consider that tomcat container does not supports EJB. So you can not serve an ejb
                    application with the help of tomcat. To do that, one option is using TomEE.<br/>
                    Let's say we are going to include JSF into our application. If you are planning to hire
                    weblogic, then you have to Mojara instead of JSF<br/><br/>
                    In fact each company is free to implement a technology as it's willing but they have to follow a
                    specification. That's why we should take care of hired technologies.
                </p>
                <p><Important>As Tomcat is heavy to load and execute, it is recommended to
                    use <Highlight>Pivotal</Highlight> or <Highlight>Jetty</Highlight> in development
                    time.</Important></p>
            </InfoIcon>
            <GenericCode title={'Tomcat structure'}>
                {`
                catalina root
                ├── bin
                │   ├── shutdown.bat
                │   ├── shutdown.sh
                │   ├── startup.bat
                │   ├── startup.sh
                │   ├── ...
                ├── BUILDING.txt
                ├── conf
                │   ├── Catalina
                │   ├── catalina.policy
                │   ├── catalina.properties
                │   ├── context.xml
                │   ├── jaspic-providers.xml
                │   ├── jaspic-providers.xsd
                │   ├── logging.properties
                │   ├── server.xml
                │   ├── tomcat-users.xml
                │   ├── tomcat-users.xsd
                │   └── web.xml
                ├── CONTRIBUTING.md
                ├── lib //All jars in this dir shares among all applications
                │   ├── servlet-api.jar
                │   ├── websocket-api.jar
                │   └── ...
                ├── LICENSE
                ├── logs
                │   ├── catalina.2020-04-05.log
                │   └── ...
                ├── NOTICE
                ├── original libs.zip
                ├── README.md
                ├── RELEASE-NOTES
                ├── RUNNING.txt
                ├── temp //Tomcat temp files. Useless for us
                │   └── safeToDelete.tmp
                ├── webapps //Put war or exploded files here
                │   ├── docs
                │   ├── host-manager
                │   ├── manager
                │   └── ROOT
                └── work
                └── Catalina
                `}
            </GenericCode>
        </Frame>
    )
}

function getWeblogicFeatures() {
    return (
        <Frame title={'weblogic features'}>
            <Bullet title={'1. Coherence:'}> cache server for session. Clustering for session, if all servers go down,
                user
                will not be logged out.</Bullet>
            <Bullet title={'2. SLA:'}> promises to keep success on a gate way for example 80% and on the other
                70%</Bullet>
            <Bullet title={'3. CICD:'}> let’s say we update the project,-→ logged in user will not thrown out and new
                users
                will be on new</Bullet>
        </Frame>
    )
}