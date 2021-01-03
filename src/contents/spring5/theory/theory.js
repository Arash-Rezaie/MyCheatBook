import React from "react";
import {InfoIcon} from "../../../components/bubble";
import {Blue, Bullet, FloatHolder, Highlight, Important, Purple, Red} from "../../../components/components";
import springStructure from "../../../res/images/spring-structure.png";
import {Frame, Java} from "../../../components/blocks";
import {Float} from "../../../components/float";

export function Theory() {
    return (
        <>
            {getBasics()}
            {getInjectionTypes()}
            {getBeanDefinition()}
            {getContextProvider()}
        </>
    )
}

function getBasics() {
    return (
        <Frame title={'Basic information'}>
            <InfoIcon>
                <Important>Best way is a mixture of technologies such as Ejb and Spring, So it is recommended to make
                    yourself familiar with other technologies.</Important><br/>
                <Purple>Why Ejb?</Purple><br/>
                Object pooling (sending object away) in Ejb seems so suitable to minimise object creation:<br/>
                <Bullet title={'1.'}>local object pooling: sharing an object inside a container</Bullet>
                <Bullet title={'2.'}>remote object pooling: sharing an object over network</Bullet>
                <br/>
                <Highlight>so it seems better to write model layer on ejb, service layer on spring.</Highlight>
            </InfoIcon>
            The fundamental idea in spring is IOC. <Red>What is IOC?</Red><br/>
            Normally, developer controls the flow of program and it is the developer who is responsible to call
            different methods to reach a goal, In the other hand, in Inversion Of Control, it's the program which is in
            charge of flow control. By this way, developer must provide some methods and framework manages the flow to
            reach the goal.
            <br/><br/>
            <Blue>What are IOC advantages?</Blue>
            <Bullet title={'1.'}>Predefined templates</Bullet>
            <Bullet title={'2.'}>loose coupling</Bullet>
            <Bullet title={'3.'}>easy to test</Bullet>
            <Bullet title={'4.'}>lightweight</Bullet>
            <Bullet title={'5.'}>fast development</Bullet>
            <Bullet title={'6.'}>powerful abstraction</Bullet>
            <Bullet title={'7.'}>declarative support</Bullet>
            <br/>
            <Blue>Spring modules:</Blue><br/>
            The Spring framework comprises many modules such as core, beans, context, expression language, AOP,
            Aspects, Instrumentation, JDBC, ORM, OXM, JMS, Transaction, Web, Servlet, Struts etc.<br/>
            These modules are grouped into <Highlight>Test, Core Container, AOP, Aspects, Instrumentation, Data
            Access/Integration, Web (MVC / Remoting)</Highlight> as displayed in the following diagram.<br/>
            <FloatHolder className={'center-horizontally-relative'} style={{minWidth: '700px'}}>
                <img src={springStructure} alt={'spring skeleton'} className={'center-horizontally-relative'}/>
                <Float l={0} t={218} lineTo={[370, 266]}>
                    <div style={{width: '150px'}}>This module supports internationalization (I18N), EJB, JMS, Basic
                        Remoting
                    </div>
                </Float>
                <Float l={0} t={300} lineTo={[196, 295]}>
                    <div style={{width: '150px'}}>These modules provide IOC and DI features</div>
                </Float>
                <Float l={540} t={80} lineTo={[511, 203]}>
                    <div style={{width: '150px'}}>These modules support aspect oriented programming. you can use
                        Advices, Pointcuts, etc. to decouple the code.
                    </div>
                </Float>
                <Float l={540} t={220} lineTo={[495, 296]}>
                    <div style={{width: '150px'}}>It is an extension for the EL defined in JSP. It provides support for
                        accessing properties, method invocation, accessing collections and indexers, named variables,
                        logical and arithmetic operators, retrieval of objects by name, etc.
                    </div>
                </Float>
            </FloatHolder>

            <p>
                Every operation in Spring is based on a container. <Blue>What is IOC container?</Blue><br/>
                The IoC container is responsible to instantiate, configure and assemble the objects we need.<br/>
                IoC container does this by provided configuration which which comes from XML, annotations or java
                code.<br/>
                <Blue>Main tasks performed by IoC container are:</Blue><br/>
                • to instantiate the application class
                • to configure the object
                • to assemble the dependencies between the objects
            </p>
            <br/><br/>
            In fact IOC container Injects required dependencies. DI means providing dependency not the literal
            word.<br/>
            DI is handled via context. <Blue>What is context?</Blue><br/>
            Context is a container for other classes and is in charge of providing dependencies among contents in
            order to connect all prats together.

            <Blue>Why we are attempting to do DI?</Blue><br/>
            The more software structure is loos coupled, the more flexible it is. To reach that follow below
            rules:<br/>
            <Bullet title={'1.'}>Use interface as much as possible instead of cement classes</Bullet>
            <Bullet title={'2.'}>Do not new your classes and let just somebody else give it to you</Bullet>
            <Bullet title={'•'} level={1}>one way is to use a factory. Therefore, you can leave instantiation to the
                factory</Bullet>
            <Bullet title={'•'} level={1}>Just announce your desired dependency by annotation and let others inject
                it for you</Bullet>
        </Frame>
    )
}

function getInjectionTypes() {
    return (
        <Frame title={'Injection types'}>
            There are 3 ways available to inject a dependency:<br/>
            <Bullet title={'1. Constructor injection:'}>assert your dependency in class constructor</Bullet>
            <Bullet title={'• Pros:'} level={1}>we make sure that the desired dependencies are resolved as
                constructor runs at first</Bullet>
            <Bullet title={'• Cons:'} level={1}>there is no way to alter a dependency as constructor gets called only
                once</Bullet>
            <br/>
            <Bullet title={'2. Setter injection:'}>assert your dependency with setters</Bullet>
            <Bullet title={'• Pros:'} level={1}>the dependency can be altered later by calling its setter</Bullet>
            <Bullet title={'• Cons:'} level={1}>there is probability of NullPointerException as usage may happen
                before setter</Bullet>
            <br/>
            <Bullet title={'3. Field injection:'}>assert your dependency with field and container will do it via
                reflection</Bullet>
            <Bullet title={'• Pros:'} level={1}>the dependency can be altered later by calling its setter</Bullet>
            <Bullet title={'• Cons:'} level={1}>there is probability of NullPointerException as usage may happen
                before setter</Bullet>
        </Frame>
    )
}

function getBeanDefinition() {
    return (
        <Frame title={'Bean definition'}>
            Spring manages a special classes which is called Bean. <Blue>What is a Bean?</Blue><br/>
            A bean class must follow some specific pattern. <br/>
            It must have default constructor, setter and getter and it must be introduced to spring container<br/>
            <Java>
                {`public class Person implements Serializable {
                    private String name;
                    private int age;
                
                    public Person() {
                    }
                
                    public String getName() {
                        return name;
                    }
                
                    public void setName(String name) {
                        this.name = name;
                    }
                
                    public int getAge() {
                        return age;
                    }
                
                    public void setAge(int age) {
                        this.age = age;
                    }
                }`}
            </Java>
        </Frame>
    )
}

function getContextProvider() {
    return (
        <Frame title={'ContextProvider.class'}>
            You'll see ContextProvider class time to time. The body is as the following:
            <Java>
                {`
                public class ContextProvider {
                    //context to reach a bean from annotation configuration class
                    private static ApplicationContext ANNOTATION_CONTEXT;
                    
                    //context to reach a bean from xml configuration file
                    private static ApplicationContext XML_CONTEXT;
                    
                    //context to reach a bean from java configuration class
                    private static ApplicationContext JAVA_CONTEXT;
                
                    static {
                        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
                        ctx.register(AppConfig.class);
                        ctx.refresh();
                        ANNOTATION_CONTEXT = ctx;
                
                        XML_CONTEXT = new ClassPathXmlApplicationContext("containerconfig.xml");
                
                        AnnotationConfigApplicationContext ctx2 = new AnnotationConfigApplicationContext();
                        ctx2.register(com.arash.config.javaconfig.AppConfig.class);
                        ctx2.refresh();
                        JAVA_CONTEXT = ctx2;
                    }
                
                    public static ApplicationContext getJavaContext() {
                        return JAVA_CONTEXT;
                    }
                
                    public static ApplicationContext getAnnotaionContext() {
                        return ANNOTATION_CONTEXT;
                    }
                
                    public static ApplicationContext getXmlContext() {
                        return XML_CONTEXT;
                    }
                }
                `}
            </Java>
        </Frame>
    )
}