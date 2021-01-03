import React from "react";
import {Bash, Frame, GenericCode, Java, Xml} from "../../../components/blocks";
import {InfoIcon} from "../../../components/bubble";
import {
    Blue,
    BlueBold,
    Bold,
    Bullet,
    FlexRow,
    Highlight,
    HorizontalLine,
    Important,
    Purple,
    Red
} from "../../../components/components";
import {Float} from "../../../components/float";
import appContext from '../../../res/images/ApplicationContext.png';
import circularDependency from "../../../res/images/circular-dependency.png";
import beanLifecycle from "../../../res/images/bean-life-cycle.png";
import components from "../../../res/images/components.png";

export function CoreCheats() {
    return (
        <>
            {getBeanContainer()}
            {getScanningFilter()}
            {getMerging()}
            {getProfile()}
            {getMultipleCandidate()}
            {getXmlBasic()}
            {getAnnotationBasic()}
            {getAlias()}
            {getPrivateConstructor()}
            {getXmlLocalClass()}
            {getAnnotationLocalClass()}
            {getXmlCircularDependencies()}
            {getAnnotationCircularDependencies()}
            {getXmlLoadFromFile()}
            {getJavaLoadFromFile()}
            {getXmlChangingMethodBody()}
            {getCollections()}
            {getSpel()}
            {getScopes()}
            {getScopeIssue()}
            {getBeanAware()}
            {getTemplateClass()}
            {getEvent()}
        </>
    )
}

function getBeanContainer() {
    return (
        <Frame title={'Catching bean'}>
            <InfoIcon>
                <Important>!the path in which we put java source and resource files is called ClassPath. It also can
                    hold resources too.<br/>
                </Important>
                This is why, we use ClassPathXmlResource class to bring in our desired configuration file.<br/>
                Every thing under main dir is called ClassPath, so test is out of that.
            </InfoIcon>
            <FlexRow>
                <Java description={'using BeanFactory is deprecated'}>
                    {`
                    ClassPathResource resource = new ClassPathResource("containerconfig.xml");
                    BeanFactory beanFactory = new XmlBeanFactory(resource);
                    return beanFactory.getBean("targetId");
                    `}
                </Java>
                <Java description={'new fasion'}>
                    {`
                    ApplicationContext context = new ClassPathXmlApplicationContext("containerconfig.xml");
                    return (Car) context.getBean("car");`}
                </Java>
            </FlexRow>
            <Important>ApplicationContext provides multiple configuration file registration.</Important>
            <div className={'float-holder center-horizontally-relative inline'}>
                <img src={appContext} alt={'application context implementations'} style={{width: '1200px'}}/>
                <Float l={1000} t={180} lineTo={[1072, 262]}>
                    <div style={{width: '190px'}}>To fetch xml configuration from a file inside the application itself
                    </div>
                </Float>
                <Float l={850} t={120} lineTo={[835, 262]}>
                    <div style={{width: '260px'}}>To read xml configuration from a file system. Path must be relative
                    </div>
                </Float>
                <Float l={890} t={362} lineTo={[873, 364]}>
                    <div style={{width: '300px'}}>To read configuration from groovy file</div>
                </Float>
                <Float l={250} t={362} lineTo={[625, 365]}>
                    <div style={{width: '300px'}}>To configure beans by annotations</div>
                </Float>
                <Float l={10} t={260} lineTo={[383, 330]}>
                    <div style={{width: '350px'}}>To setup features via programmatic registration, rather than reading
                        bean definitions from external configuration sources. Mainly useful for testing
                    </div>
                </Float>
            </div>
            <br/><br/>
            Configuration file is due to determine instantiating mechanism.<br/>
            <Blue>How to provide configuration file:</Blue>
            <Bullet title={'1.'}>XML based configuration:
                provide a xml file to define instantiation mechanism. We name it "containerconfix.xml" in here:
                <Xml>
                    {`
                    <?xml version="1.0" encoding="UTF-8"?>
                    <beans xmlns="http://www.springframework.org/schema/beans"
                           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                           xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
                    
                        <bean id="bean1" class="Bean1"/>
                    </beans>`}
                </Xml>
                <Java>{`
                    public static void main(String[] args){
                        ApplicationContext context = new ClassPathXmlApplicationContext("containerconfig.xml");
                        Bean1 bean1 = context.getBean("bean1");
                    }`}</Java>
            </Bullet>
            <Bullet title={'2.'}>Java based configuration:
                <Java>
                    {`
                    /* provide a class to create instances and annotate it with @Configuration */
                    @Configuration
                    public class AppConfig {
                    
                        @Bean
                        public Bean1 getBean1(){
                            return new Bean1();
                        }
                    }
                    
                    public static void main(String[] args){
                        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
                        context.register(AppConfig.class);
                        context.refresh();
                        
                        Bean1 bean1 = context.getBean(Bean1.class);
                    }`}
                </Java>
            </Bullet>
            <Bullet title={'3.'}>Annotation based configuration:<br/>
                Using annotation instead of direct java codes such
                as <Bold>@Component</Bold>, <Bold>@Repository</Bold>, <Bold>@Service</Bold>, <Bold>@Configuration</Bold>,
                <Bold>@Controller</Bold><br/>
                Then we should aware spring of these classes by <Bold>@ComponentScan</Bold>
                <FlexRow>
                    <Java>
                        {`
                        @Configuration
                        @ComponentScan("com.arash")
                        public class AppConfig {
                        }
                        
                        /* bean class */
                        @Component
                        public class Bean1 {
                        }
                        
                        /* catching bean */
                        public static void main(String[] args){
                            AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
                            context.register(AppConfig.class);
                            context.refresh();
                            
                            Bean1 bean1 = context.getBean(Bean1.class);
                        }
                        `}
                    </Java>
                    <div>
                        <img src={components} alt={'Component hierarchy'}/>
                    </div>
                </FlexRow>
            </Bullet>
        </Frame>
    )
}

function getScanningFilter() {
    return (
        <Frame title={'Filtering through component scan'}>
            It is wise to exclude unwanted classes from being scanned by spring.<br/>
            <Java title={1}>
                {`
                @Configuration
                /*
                 * type = FilterType.REGEX
                 * type = FilterType.ANNOTATION
                 * type = FilterType.ASPECTJ
                 * type = FilterType.ASSIGNABLE_TYPE
                 * type = FilterType.CUSTOM
                 */
                @ComponentScan(basePackages = "com", includeFilters = {
                @ComponentScan.Filter(type = FilterType.REGEX, pattern = "*.*spring.obje*"),
                    @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = MyAnnotation.class),
                    @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = Person.class)
                })
                public class AppConfig {
                }`}
            </Java>
            <Xml title={1}>
                {`
                <beans ...>
                    <context:component-scan base-package="com">
                        <context:include-filter type="regex" expression="soWhat*"/>
                        <context:include-filter type="annotation" expression="com.arash.models.common.MyAnnotation"/>
                    </context:component-scan>
                </beans>
                `}
            </Xml>
        </Frame>
    )
}

function getXmlBasic() {
    return (
        <Frame title={'Passing arguments in xml'}>
            <InfoIcon>
                Catching data source for mysql sample:
                <Xml>
                    {`
                    <bean id="dataSource" class="org.apache.commons.dbcp2.BasicDataSource">
                        <property name="username" value="root"/>
                        <property name="password" value=""/>
                        <property name="url" value="jdbc:mysql://localhost:3306/spring"/>
                    </bean>`}
                </Xml>
            </InfoIcon>
            Passing arguments through xml configuration file is available via constructor and setters.
            <Java>
                {`
                public class Car {
                    private String name;
                    private int color;
                
                    public Car(String name, int color) {
                        this.name = name;
                        this.color = color;
                    }
                }
                
                public class Person {
                    private String name;
                    private String email;
                    private int age;
                    private int hairColor;
                    private Car car;
                
                    public Person(String name, String email, int age) {
                        this.name = name;
                        this.email = email;
                        this.age = age;
                    }
                
                    public void setHairColor(int hairColor) {
                        this.hairColor = hairColor;
                    }
                    
                    public void setCar(Car car) {
                        this.car = car;
                    }
                }
                `}
            </Java>
            <Xml>
                {`
                <bean id="car" class="com.arash.models.multiconfigfiles.Car">
                    <constructor-arg value="ford"/>
                    <constructor-arg value="-16711936"/>
                </bean>
            
                <bean id="person" class="com.arash.models.multiconfigfiles.Person">
                    <!--
                        constructor args are sent by order by default,
                        but you can provide more information such as type or index
                    -->
                    <constructor-arg value="Arash"/>
                    <constructor-arg index="1" value="arash.12@gmail.com"/>
                    <constructor-arg type="int" value="33"/>
                    
                    <!-- passing parameter by setter -->
                    <property name="hairColor" value="-16777216"/>
                    <property name="car" ref="car"/> <!-- sending by ref -->
                </bean>
                `}
            </Xml>
            <HorizontalLine/>
            It is also possible to pass values to relevant field by namespace<br/>
            <Highlight>Remember to load <Red>xmlns:p="http://www.springframework.org/schema/p"</Red> in
                header</Highlight>
            <Xml>
                {`
                    <?xml version="1.0" encoding="UTF-8"?>
                    <beans xmlns="http://www.springframework.org/schema/beans"
                           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                           xmlns:p="http://www.springframework.org/schema/p"
                           xsi:schemaLocation="
                                http://www.springframework.org/schema/beans
                                http://www.springframework.org/schema/beans/spring-beans.xsd">

                        <bean id="person2" class="com.arash.models.xml.namespace.Person"
                              p:car-ref="car"
                              p:hairColor="-16711936">
                            <constructor-arg value="Arash"/>
                            <constructor-arg index="1" value="arash.12@gmail.com"/>
                            <constructor-arg type="int" value="33"/>
                        </bean>
                    </bean>
                    `}
            </Xml>

            <Important>Using property is recommended over constructor when we face "circular dependency" or "different
                life length"</Important>
        </Frame>
    )
}

function getAnnotationBasic() {
    return (
        <Frame title={'Passing arguments in annotation'}>
            <InfoIcon>
                <p>
                    <Blue>Wiring:</Blue> connecting objects to each other is called wiring.
                </p>
                <p>
                    <Blue>@Autowired</Blue> does not work on arrays
                </p>
                <p>
                    <Purple>some equivalents for annotations:</Purple><br/>
                    <table>
                        <thead>
                        <tr>
                            <th>Spring</th>
                            <th>javax</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>@Autowired</td>
                            <td>@Inject, @Resource</td>
                        </tr>
                        <tr>
                            <td>@Component</td>
                            <td>@Named, @ManagedBean</td>
                        </tr>
                        <tr>
                            <td>@Qualifier</td>
                            <td>@Qualifier, @Named</td>
                        </tr>
                        <tr>
                            <td>@Value</td>
                            <td>---</td>
                        </tr>
                        <tr>
                            <td>@Required</td>
                            <td>---</td>
                        </tr>
                        <tr>
                            <td>@Lazy</td>
                            <td>---</td>
                        </tr>
                        <tr>
                            <td>@Scope(“singleton”)</td>
                            <td>@Singleton</td>
                        </tr>
                        </tbody>
                    </table>
                </p>
            </InfoIcon>
            <Java>
                {`
                @Component
                public class Car {
                    private String name;
                    private int color;
                
                    public Car(@Value("ford") String name, @Value("-16711936") int color) {
                        this.name = name;
                        this.color = color;
                    }
                }
                
                @Component
                public class Person {
                    private String name;
                
                    @Value("-16777216")
                    private int hairColor;
                
                    @Autowired
                    private Car car;
                    
                    @Value("Arash")
                    public void setName(String name){
                        this.name = name;
                    }
                }
                `}
            </Java>
        </Frame>
    )
}

function getXmlLocalClass() {
    return (
        <Frame title={'Inner & Nested class in xml'}>
            Instantiating nested class is easy as the class is static
            <Java>
                {`
                    public class ParentClass {
                        
                        public static class NestedClass {
                        }
                        
                        public class InnerClass {
                        }
                    }
                    
                    //how to get instance in java
                    ParentClass parentClass = new ParentClass();
                    ParentClass.NestedClass nestedClass = new ParentClass.NestedClass();
                    ParentClass.InnerClass innerClass = pc.new InnerClass();`}
            </Java>
            <Xml>
                {`
                    <!-- parent class: -->
                    <bean id="parentClass" class="ParentClass"/>
                    
                    <!-- creating public nested class is easy. Use '$' instead of '.' -->
                    <bean id="nestedClass" class="ParentClass$NestedClass"/>
                    `}
            </Xml>
            Instantiating inner class is a bit more complicated as it needs its parent class instance.<br/>
            To do that, we should hire a generator<br/><br/>
            <Bullet title={'1.'}><BlueBold>factory-bean:</BlueBold>
                <Java>
                    {`
                        public class ParentClass {
                        
                            public static class NestedClass {
                            }
                            
                            public class InnerClass {
                            }
                        }
                        
                        public class InnerClassFactory implements FactoryBean<ParentClass.InnerClass> {
                
                            @Override
                            public ParentClass.InnerClass getObject() throws Exception {
                                ApplicationContext ctx = ContextProvider.getXmlContext();
                                ParentClass pc = (ParentClass) ctx.getBean("parentClass");
                                return pc.new InnerClass();
                            }
                        
                            @Override
                            public Class<?> getObjectType() {
                                return ParentClass.InnerClass.class;
                            }
                            
                            @Override
                            public boolean isSingleton() {
                                return false;
                            }
                        }
                        `}
                </Java>
                <Xml>
                    {`
                        <bean id="parentClass" class="ParentClass"/>
                                
                        <!-- creating InnerClass by factory bean. Factory class must implement FactoryBean -->
                        <bean id="innerClass" class="com.arash.models.localclass.InnerClassFactory">`}
                </Xml>

            </Bullet>
            <Bullet title={'2.'}><BlueBold>factory-method:</BlueBold>
                <Java>
                    {`
                        public class ParentClass {
                            public static class NestedClass {
                            }
                        
                            public class InnerClass {
                            }
                            
                            public InnerClass getInnerClassInstance() {
                                return new InnerClass();
                            }
                        }`}
                </Java>
                <Xml>
                    {`
                        <bean id="parentClass" class="ParentClass"/>
                        
                        <!-- creating InnerClass by factory method -->
                        <bean id="innerClass" class="com.arash.models.localclass.ParentClass.InnerClass"
                                factory-bean="parentClass" factory-method="getInnerClassInstance"/>`}
                </Xml>
            </Bullet>
        </Frame>
    )
}

function getAnnotationLocalClass() {
    return (
        <Frame title={'Inner & Nested class in annotation'}>
            <Java>
                {`
                @Component
                public class ParentClass {
                    @Component
                    public static class NestedClass {
                    }
                
                    @Component
                    public class InnerClass {
                    }
                }
                
                //usage>>>
                ApplicationContext ctx = ContextProvider.getAnnotaionContext();
                ParentClass pc = ctx.getBean(ParentClass.class);
                ParentClass.NestedClass nc = ctx.getBean(ParentClass.NestedClass.class);
                ParentClass.InnerClass ic=ctx.getBean(ParentClass.InnerClass.class);
                `}
            </Java>
        </Frame>
    )
}

function getAlias() {
    return (
        <Frame title={'Alias'}>
            <Xml title={1}>
                {`
                <bean id="car" name="car" class="com.arash.models.Car"/>
                <alias name="car" alias="automobile"/>
                <alias name="car" alias="vehicle"/>
                `}
            </Xml>
            <Java title={1}>
                {`
                @Bean({"car", "automobile", "vehicle"})
                private Car getCar() {
                    return new Car("ford", -16711936);
                }`}
            </Java>
            <Java description={'usage'}>
                {`
                ApplicationContext ctx = ContextProvider.getXmlContext();
                Car car = (Car) ctx.getBean("car");
                Car car2 = (Car) ctx.getBean("automobile");
                Car car3 = (Car) ctx.getBean("vehicle");`}
            </Java>
        </Frame>
    )
}

function getPrivateConstructor() {
    return (
        <Frame title={'Private constructor'}>
            <Java>
                {`
                public class PrivateConstructor {
                
                    private PrivateConstructor() {
                    }
                    
                    public static PrivateConstructor getInstance(){
                        return new PrivateConstructor();
                    }
                }`}
            </Java>
            <Xml>
                {`
                <!-- 
                    as spring is all about reflection, so program elements scope makes no problem.
                    It works pretty nice in spring 4. Also, some other ways are avaiable
                -->
                <bean id="privateConstructor" class="com.arash.models.privateconstructor.PrivateConstructor"/>
                
                <!-- access through static method -->
                <bean id="privateConstructor2" class="com.arash.models.privateconstructor.PrivateConstructor"
                    factory-method="getInstance"/>
                `}
            </Xml>
        </Frame>
    )
}

function getXmlCircularDependencies() {
    return (
        <Frame title={'Circular dependency in xml configuration'}>
            The problem is a set of commplicated dependencies which can not be resolved so easily.<br/>
            <img src={circularDependency} alt={'circular dependency'}/><br/><br/>
            check the following examples out:
            <FlexRow>
                <Java title={true}>
                    {`
                    public class Student {
                        private Shoes shoes;
        
                        public Student(Shoes shoes) {
                            this.shoes = shoes;
                        }
                    }
                    
                    public class Shoes {
                        private Student student;
                    
                        public Shoes(Student student) {
                            this.student = student;
                        }
                    }`}
                </Java>
                <Xml title={true} description={'this config fails'}>
                    {`
                    <bean id="student" class="com.arash.models.circulardep.Student">
                        <constructor-arg ref="shoes"/>
                    </bean>
                    <bean id="shoes" class="com.arash.models.circulardep.Shoes">
                        <constructor-arg ref="student"/>
                    </bean>
                `}
                </Xml>
            </FlexRow>
            <HorizontalLine/>
            <span className={'purple'}>To overcome this problem there are some suggestions:</span>
            <Bullet title={'1.'}>Changing a constructor to setter<br/>
                <Important>Bean definition follows no order whilst usage order is, so this way is not
                    recommended</Important><br/>
                <Highlight>If you turn constructor of both mentioned classes to setter, there would be no matter with
                    the
                    order</Highlight>
                <FlexRow>
                    <Java title={true} description={'use setter instead of constructor'}>
                        {`
                        public class Student {
                            private Shoes shoes;
                        
                            public void setShoes(Shoes shoes) {
                                this.shoes = shoes;
                            }
                        }
                        
                        public class Shoes {
                            private Student student;
                        
                            public Shoes(Student student) {
                                this.student = student;
                            }
                        }
                        
                        ----------------------------------------------------------
                        
                        //usage
                        ApplicationContext ctx = ContextProvider.getXmlContext();
                        
                        //correct order
                        Student student = (Student) ctx.getBean("student");
                        Shoes shoes= (Shoes) ctx.getBean("shoes");
                        
                        //incorrect order
                        Shoes shoes= (Shoes) ctx.getBean("shoes");
                        Student student = (Student) ctx.getBean("student");
                        `}
                    </Java>
                    <Xml title={true}
                         description={'one property & one constructor'}>
                        {`
                        <bean id="student" class="com.arash.models.circulardep.Student">
                            <property name="shoes" ref="shoes"/>
                        </bean>
                        
                        <bean id="shoes" class="com.arash.models.circulardep.Shoes">
                            <constructor-arg ref="student"/>
                        </bean>`}
                    </Xml>
                </FlexRow>
            </Bullet><br/>
            <Bullet title={'2.'}>Using lazy-init<br/>
                By this way, we can define that which bean must be initialized on demand, therefor order problem
                ignored.
                <FlexRow>
                    <Java title={true} description={'only student drops its constructor'}>
                        {`
                        public class Student {
                            private Shoes shoes;
                        
                            public void setShoes(Shoes shoes) {
                                this.shoes = shoes;
                            }
                        }
                        
                        public class Shoes {
                            private Student student;
                        
                            public Shoes(Student student) {
                                this.student = student;
                            }
                        }
                        `}
                    </Java>
                    <Xml title={true} description={'define who has to laod at first'}>
                        {`
                         <bean id="student" class="com.arash.models.circulardep.Student" lazy-init="false">
                             <property name="student" ref="shoes"/>
                         </bean>
                        
                         <bean id="shoes" class="com.arash.models.circulardep.Shoes" lazy-init="true">
                             <constructor-arg ref="student"/>
                         </bean>`}
                    </Xml>
                </FlexRow>
            </Bullet><br/>
            <Bullet title={'3.'}>Using idref (idref is id of a bean as string, but it checks the existence of the
                bean)
                <FlexRow>
                    <Java title={true} description={'save idref and init before use'}>
                        {`
                        public class Student {
                            private String shoesId;
                            private Shoes shoes;
                        
                            public Student(String shoesId) {
                                this.shoesId = shoesId;
                            }
                        
                            public void init(){
                                ApplicationContext ctx = ContextProvider.getXmlContext();
                                shoes = (Shoes) ctx.getBean(shoesId);
                            }
                        }`}
                    </Java>
                    <Xml title={true} description={'pass idref insted of ref'}>
                        {`
                        <bean id="student" class="com.arash.models.circulardep.Student">
                            <constructor-arg>
                                <idref bean="shoes"/>
                            </constructor-arg>
                        </bean>
                        <bean id="shoes" class="com.arash.models.circulardep.Shoes">
                            <constructor-arg ref="student"/>
                        </bean>`}
                    </Xml>
                </FlexRow>
            </Bullet><br/>
            <Bullet title={'4.'}>Using depends-on
                <FlexRow>
                    <Java title={true}>
                        {`
                        public class Student {
                            private Shoes shoes;
                        
                            public void setShoes(Shoes shoes) {
                                this.shoes = shoes;
                            }
                        }
                        
                        public class Shoes {
                            private Student student;
                        
                            public Shoes(Student student) {
                                this.student = student;
                            }
                        }
                        `}
                    </Java>
                    <Xml title={true} description={'define who depends on who'}>
                        {`
                        <bean id="student" class="com.arash.models.circulardep.Student">
                            <property name="student" ref="shoes"/>
                        </bean>
                    
                        <bean id="shoes" class="com.arash.models.circulardep.Shoes" depends-on="student" >
                            <constructor-arg ref="student"/>
                        </bean>`}
                    </Xml>
                </FlexRow>
            </Bullet>
        </Frame>
    )
}

function getAnnotationCircularDependencies() {
    return (
        <Frame title={'Circular dependency in annotation configuration'}>
            <InfoIcon>
                <Blue>@Lazy</Blue> is available in spring too to load a programming element on demand
                <Java>
                    {`
                    @Target({ElementType.TYPE, ElementType.METHOD, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.FIELD})
                    @Retention(RetentionPolicy.RUNTIME)
                    @Documented
                    public @interface Lazy {
                        boolean value() default true;
                    }`}
                </Java>
            </InfoIcon>
            <Java description={'resolve both via constructor; won\'t work'}>
                {`
                @Component
                public class Student {
                    private Shoes shoes;
                
                    public Student(@Autowired Shoes shoes) {
                        this.shoes = shoes;
                    }
                }
                
                @Component
                public class Shoes {
                    private Student student;
                
                    public Shoes(@Autowired Student student) {
                        this.student = student;
                    }
                }`}
            </Java>
            <HorizontalLine/>
            <Java description={'resolve only one via constructor; works painless'}>
                {`
                @Component
                public class Student {
                    private Shoes shoes;
                    
                     public Student(@Autowired Shoes shoes) {
                        this.shoes = shoes;
                    }
                }
                
                @Component
                public class Shoes {
                    @Autowired
                    private Student student;
                }`}
            </Java>
        </Frame>
    )
}

function getXmlLoadFromFile() {
    return (
        <Frame title={'Load properties from a file in xml'}>
            Let's have a property file containing:
            <GenericCode title={'jdbc.properties'}>
                {`
                    jdbc.driverClassName=com.mysql.jdbc.Driver
                    jdbc.url=jdbc:mysql://localhost:3306/concretepage
                    jdbc.username=root
                    jdbc.password=`}
            </GenericCode>

            Now it's time to load the file
            <Xml description={'using PropertySourcesPlaceholderConfigurer class'}>
                {`
                    <bean class="org.springframework.context.support.PropertySourcesPlaceholderConfigurer">
                        <property name="location" value="jdbc.properties"/>
                    </bean>`}
            </Xml>
            <Xml description={'using spring itself place-holder manager'}>
                {'<context:property-placeholder location="jdbc.properties"/>'}
            </Xml>
            <Xml description={'usage'}>
                {`
                    <bean id="dataSource" class="org.apache.commons.dbcp2.BasicDataSource">
                        <property name="username" value="$\{jdbc.username}"/>
                        <property name="password" value="$\{jdbc.password}"/>
                        <property name="url" value="$\{jdbc.url}"/>
                        <property name="driverClassName" value="$\{jdbc.driverClassName}"/>
                    </bean>`}
            </Xml>
        </Frame>
    )
}

function getJavaLoadFromFile() {
    return (
        <Frame title={'Load properties from a file in annotation'}>
            <Bullet title={'1.'}>
                Via context environment:<br/>
                add <Blue>@PropertySource</Blue> to your configuration class and catch it by context.getEnvironment()
                <Java>
                    {`
                    @Configuration
                    @ComponentScan("com.arash")
                    @PropertySource("classpath:jdbc.properties")
                    public class AppConfig {
                    }
                    
                    //usage>>>
                    ApplicationContext ctx = ContextProvider.getAnnotaionContext();
                    Environment env = ctx.getEnvironment();
                    System.out.println("driver: " + env.getProperty("jdbc.driverClassName"));
                    System.out.println("url: "+env.getProperty("jdbc.url"));
                    System.out.println("username: "+env.getProperty("jdbc.username"));
                    System.out.println("password: "+env.getProperty("jdbc.password"));
                    `}
                </Java>
            </Bullet>
            <Bullet title={'2.'}>
                Via <Blue>@Value</Blue>:<br/>
                use <Blue>@PropertySource</Blue> on configuration file and
                define <Blue>PropertySourcesPlaceholderConfigurer</Blue> bean
                <Java>
                    {`
                    @Configuration
                    @ComponentScan("com.arash")
                    @PropertySources({
                            @PropertySource("configs.properties"),
                            @PropertySource("classpath:jdbc.properties")
                    })
                    public class AppConfig {
                    
                        @Bean
                        public PropertySourcesPlaceholderConfigurer propertyConfigInDev() {
                            return new PropertySourcesPlaceholderConfigurer();
                        }
                    }
                    
                    // Please notice that you must follow format "#{'$\{prop-name}'}" for @Value
                    @Component
                    public class JdbcProp {
                        @Value("#{'$\{jdbc.driverClassName}'}")
                        private String driverClassName;
                    
                        @Value("#{'$\{jdbc.url}'}")
                        private String url;
                    
                        @Value("#{'$\{jdbc.username}'}")
                        private String username;
                    
                        @Value("#{'$\{jdbc.password}'}")
                        private String password;
                    }`}
                </Java>
            </Bullet>
            <HorizontalLine/>
            Loading generic file:
            <Bullet title={'1.'}>
                Through <Blue>@Value</Blue>
                <Java>
                    {`
                    @Component
                    public class TextFile {
                        @Value("classpath:data.bat")
                        private String value;
                    }
                    `}
                </Java>
            </Bullet>
            <Bullet title={'2.'}>
                Through <Blue>Resource</Blue>:<br/>
                Context has a Resource object embedded, So you can use that one too
                <Java>
                    {`
                    @Component
                    public class AnyFile {
                        @Autowired
                        private ResourceLoader resourceLoader;
                    
                        public Resource getBigFile(){
                            return resourceLoader.getResource("classpath:bigData.dat");
                        }
                    }`}
                </Java>
            </Bullet>
        </Frame>
    )
}

function getXmlChangingMethodBody() {
    return (
        <Frame title={'Changing method body'}>
            <Bullet title={'1.'}>
                Lookup method<br/>
                To put it in simple words, lookup method injection is the process to override a Spring bean at the
                runtime.<br/>
                Use "lookup" to inject a method body without implementing an abstract class<br/>
                <Java>
                    {`
                    public class CheeseBurger {
                    }
                    
                    public class MushroomBurger {
                    }
                    
                    public abstract class BurgerShop {
                        public abstract MushroomBurger getMushroomBurger();
                    
                        public abstract CheeseBurger getCheeseBurger();
                    }
                    `}
                </Java>
                <Xml>
                    {`
                    <bean id="cheeseBurger" class="com.arash.models.lookup.CheeseBurger"/>
                    <bean id="mushroomBurger" class="com.arash.models.lookup.MushroomBurger"/>
                    <bean id="burgerShop" class="com.arash.models.lookup.BurgerShop">
                        <lookup-method bean="cheeseBurger" name="getCheeseBurger"/>
                        <lookup-method bean="mushroomBurger" name="getMushroomBurger"/>
                    </bean>
                    `}
                </Xml>
            </Bullet>
            <HorizontalLine/>
            <Bullet title={'2.'}>
                Replacer method<br/>
                Use "method replacer" to replace a method with the desired one by implementing MethodReplacer
                <Java>
                    {`
                    public class MyCar {
                        public String getMyFavoriteCar() {
                            return "Pagani";
                        }
                    }
                    
                    public class MyReplacer implements MethodReplacer {
                        @Override
                        public Object reimplement(Object o, Method method, Object[] objects) throws Throwable {
                            return "Lamborghini";
                        }
                    }
                    `}
                </Java>
                <Xml>
                    {`
                    <bean id="replacer" class="com.arash.models.replacer.MyReplacer"/>
                    <bean id="myCar" class="com.arash.models.replacer.MyCar">
                        <replaced-method name="getMyFavoriteCar" replacer="replacer"/>
                    </bean>
                    `}
                </Xml>
            </Bullet>
        </Frame>
    )
}

function getScopes() {
    return (
        <Frame title={'Scopes'}>
            <Blue>Defined scopes:</Blue>
            <Bullet title={'singleton:'}>only one instance</Bullet>
            <Bullet title={'prototype:'}>new instance on each call</Bullet>
            <Bullet title={'request:'}>one instance per network request. It saves on request object</Bullet>
            <Bullet title={'session:'}>one instance per session (again on the network)</Bullet>
            <Bullet title={'application:'}>one instance per application. It stores in ServletContext</Bullet>
            <Bullet title={'websocket:'}>one instance per websocket.</Bullet>
            <Xml description={'xml configuration'}>
                {`<bean id="bean1" class="Bean1" scope="prototype"/>`}
            </Xml>
            <Java description={'java configuration'}>
                {`
                @Configuration
                public class AppConfig {
                    @Bean()
                    @Scope("prototype")
                    private Bean1 getBean1(){
                        return new Bean1();
                    }
                }`}
            </Java>
            <Java description={'annotation configuration'}>
                {`
                @Component
                @Scope("prototype")
                public class Bean1 {
                }`}

            </Java>
            <p>
                <Red>All web scopes need listener to get worked and listeners must be defined at web layer</Red>
            </p>
        </Frame>
    )
}

function getScopeIssue() {
    return (
        <Frame title={'Different scope wiring issue'}>
            <InfoIcon>
                Some times we involve with Longer Lived objects and Shorter Lived objects. What really happens
                when you have different scopes? Who has to handle this situation.<br/>
                For example, you have a singleton class which contains some prototype classes. Singleton class is
                created only once and never changes but prototype classes must be changed each time.<br/><br/>
                Consider the following example:
                <FlexRow>
                    <Java>
                        {`
                public class PrototypeClass {
                }
                
                public class SingletonClass {
                    private PrototypeClass prototypeClass;
                    
                    public PrototypeClass getPrototypeClass() {
                        return prototypeClass;
                    }
                    
                    public void setPrototypeClass(PrototypeClass prototypeClass) {
                        this.prototypeClass = prototypeClass;
                    }
                }`}
                    </Java>
                    <Xml>
                        {`
                    <bean id="singletonClass" class="com.arash.models.scopes.SingletonClass" scope="singleton">
                        <property name="prototypeClass" ref="prototypeClass"/>
                    </bean>
                    <bean id="prototypeClass" class="com.arash.models.scopes.PrototypeClass" scope="prototype"/>`}
                    </Xml>
                </FlexRow>
                <Java description={'usage:'}>
                    {`
                ApplicationContext ctx = ContextProvider.getXmlContext();
                SingletonClass sc = ctx.getBean("singletonClass", SingletonClass.class);
                Stream
                        .generate(sc::getPrototypeClass)
                        .limit(2)
                        .forEach(System.out::println);
                
                result: >>>
                com.arash.models.scopes.PrototypeClass@76ed1b7c
                com.arash.models.scopes.PrototypeClass@76ed1b7c
                `}
                </Java>
                <Red>You see that created objects are the same:</Red>
            </InfoIcon>
            To solve this issue
            <Bullet title={'1.'}><Purple>lookup-method & replacer-method:</Purple><br/>
                lookup and replacer methods create object under defined circumstances.
            </Bullet>
            <Bullet title={'2.'}><Purple>Scoped proxy:</Purple><br/>
                we can declare a proxy to join a short-life time and long-life time classes.<br/>
                In fact, proxy comes stands in the middle and takes the responsibility of object creation.<br/><br/>
                <Important>Put the proxy on shorter-life time class</Important>
                <Xml title={1}>
                    {`
                    <bean id="singletonClass" class="com.arash.models.scopes.SingletonClass" scope="singleton">
                        <property name="prototypeClass" ref="prototypeClass"/>
                    </bean>
                    <bean id="prototypeClass" class="com.arash.models.scopes.PrototypeClass" scope="prototype">
                        <aop:scoped-proxy/>
                    </bean>`}
                </Xml>
                <Java title={1}>
                    {`
                    @Component
                    @Singleton
                    public class SingletonClass {
                    }
                    
                    @Component
                    @Scope(value = "prototype",proxyMode = ScopedProxyMode.TARGET_CLASS)
                    public class PrototypeClass {
                    }
                    `}
                </Java>
            </Bullet>
            <div style={{maxWidth: '40rem'}}>
                <Highlight>When {'<aop:scoped-proxy/>'} is in root node, all beans will be serialized at first, then
                    on request, the bean will be deserialized, so the instance is a copy of the object.</Highlight>
            </div>
        </Frame>
    )
}

function getCollections() {
    return (
        <Frame title={'Collections'}>
            <Xml>
                {`
                <bean id="propCollection" class="com.arash.models.collections.PropertyCollection">
                    <property name="map">
                        <props>
                            <prop key="key1">value1</prop>
                            <prop key="key2">value2</prop>
                        </props>
                    </property>
                </bean>
                
                <bean id="mapCollection" class="com.arash.models.collections.MapCollection">
                    <property name="map">
                        <map>
                            <entry key="key1" value="value1"/>
                            <entry key="key2" value="value2"/>
                        </map>
                    </property>
                </bean>
                
                <bean id="listCollection" class="com.arash.models.collections.ListCollection">
                    <property name="map">
                        <list>
                            <value>entry1</value>
                            <ref bean="bean1"/>
                        </list>
                    </property>
                </bean>
                
                <bean id="setCollection" class="com.arash.models.collections.SetCollection">
                    <property name="map">
                        <set>
                            <value>entry1</value>
                            <ref bean="bean1"/>
                        </set>
                    </property>
                </bean>`}
            </Xml>
        </Frame>
    )
}

function getBeanAware() {
    return (
        <Frame title={'Aware classes'}>
            <InfoIcon>
                <Purple>Bean lifecycle</Purple><br/>
                <img src={beanLifecycle} alt={'bean lifecycle'} className={'center-horizontally-relative'}
                     style={{width: '500px'}}/>
            </InfoIcon>
            Some times we need that a bean be aware of its context features. To reach this, we can use aware interfaces.<br/>
            <div style={{maxWidth: '40rem'}}>
                To hook our code into bean lifecycle, there are some interfaces available which do the job, also you can
                do that via xml or annotaion in some cases.
            </div>
            <Java>
                {`
                public class MyBean implements Phased, BeanNameAware, BeanFactoryAware, ApplicationContextAware,
                                                BeanPostProcessor, InitializingBean, DisposableBean {
                    /*Phased*/
                    @Override
                    public int getPhase() {return 0;}
                
                    /*BeanNameAware*/
                    @Override
                    public void setBeanName(String s) {}
                
                    /*BeanFactoryAware*/
                    @Override
                    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {}
                
                    /*ApplicationContextAware*/
                    @Override
                    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {}
                
                    /*BeanPostProcessor.preInitialization*/
                    @Override
                    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
                        return null;
                    }
                
                    /*InitializingBean*/
                    @Override
                    public void afterPropertiesSet() throws Exception {}
                
                    /*BeanPostProcessor.postInitialization*/
                    @Override
                    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
                        return null;
                    }
                
                    /*DisposableBean*/
                    @Override
                    public void destroy() throws Exception {}
                }`}
            </Java>
            <Important>To listen to all beans destruction: <Bold>context.registerShutDownHook()</Bold></Important>
            <br/><br/>
            <FlexRow>
                <Xml description={'pom.xml'}>
                    {`
                    <dependency>
                        <groupId>org.apache.james</groupId>
                        <artifactId>james-server-lifecycle-spring</artifactId>
                        <version>3.0-beta4</version>
                    </dependency>
                `}
                </Xml>
                <Java description={'annotation'}>
                    {`
                    public class MyBean2 {
                        
                        @PostConstruct
                        void afterContruct(){}
        
                        @PreDestroy
                        void preDestroy(){}
                    }`}
                </Java>
            </FlexRow>
            <Java title={1}>
                {`
                    @Configuration
                    public class AppConfig {
                        
                        @Bean(initMethod = "")
                        public Bean1 getBean1(){
                            return new Bean1();
                        }
                    }`}
            </Java>
            <Xml description={'Via xml'}>
                {`
                <!-- post-init -->
                <bean init-bean="..."/>
                <bean init-method="..."/>
                
                <!-- to init all bean as the same -->
                <beans default-init-method="unique method"/>

                <!-- pre-destroy -->
                <bean destroy-method="..."/>
                `}
            </Xml>
        </Frame>
    )
}

function getTemplateClass() {
    return (
        <Frame title={'Template class'}>
            Template class come in when we are willing to initialize a set of beans refusing any much bothering.
            <FlexRow>
                <Java>
                    {`
                    public class Student {
                    private String name;
                    private int age;
                    private String hairColor;

                    public void setName(String name) {
                    this.name = name;
                }

                    public void setAge(int age) {
                    this.age = age;
                }

                    public void setHairColor(String hairColor) {
                    this.hairColor = hairColor;
                }
                }`}
                </Java>
                <Xml>
                    {`
                    <!-- declare an abstract class -->
                    <bean id="templatePerson" abstract="true">
                    <property name="name" value="arash"/>
                    <property name="age" value="33"/>
                    </bean>

                    <!-- define the abstract class as parent -->
                    <bean id="student" class="com.arash.models.Student" parent="templatePerson">
                    <property name="hairColor" value="black"/>
                    </bean>`}
                </Xml>
            </FlexRow>

        </Frame>
    )
}

function getMerging() {
    return (
        <Frame title={'Merging configuration files'}>
            <Xml description={'merging other configurations into xml'}>
                {`
                    <beans ...>
                        <context:annotation-config/>
                        
                        <!-- scan a package to figure out its Components -->
                        <context:component-scan base-package="com"/>
                    </beans>
                `}
            </Xml>
            <Java description={'merging other configurations into java class'}>
                {`
                //merge other classes
                @Import(OtherAppConfig.class)
                
                //merge xml files
                @ImportResource(locations = "classpath:containerconfig.xml")
                
                @Configuration
                public class AppConfig {
                }
                `}
            </Java>
        </Frame>
    )
}

function getMultipleCandidate() {
    return (
        <Frame title={'multiple candidate'}>
            There is possibility to have more than 1 candidate when you request a bean. To make spring to return true
            object you can use <Bold>primary</Bold> and <Bold>qualifier</Bold> key words.
            <Bullet title={'1.'}>
                <Bold>Primary:</Bold><br/>
                Set a bean as primary
                <FlexRow>
                    <Xml title={1}>
                        {`
                    <bean id="ferrai" class="com.arash.models.multiplecandidates.Ferrari" primary="true"/>
                    <bean id="lamborghini" class="com.arash.models.multiplecandidates.Lamborghini">`}
                    </Xml>
                    <Java title={1}>
                        {`
                    @Configuration
                    public class AppConfig {
                        @Primary
                        @Bean
                        public Car getLamborghini() {
                            return new Lamborghini();
                        }
    
                        @Bean
                        public Car getFerrari() {
                            return new Ferrari();
                        }
                    }`}
                    </Java>
                </FlexRow>
            </Bullet>
            <Bullet title={'2.'}>
                <Bold>Qualifier:</Bold><br/>
                determine what object should be injected based on the given information
                <Java description={'custom qualifier'}>
                    {`
                    @Target(ElementType.FIELD)
                    @Retention(RetentionPolicy.RUNTIME)
                    @Qualifier
                    public @interface MyQualifier {
                        String value() default "";
                        String color();
                    }`}
                </Java>
                <FlexRow>
                    <Xml title={1}>
                        {`
                    <!--qualifier with a simple string-->
                    <bean id="ferrai" className="com.arash.models.multiplecandidates.Ferrari">
                        <qualifier value="ferrari"/>
                    </bean>

                    <!--qualifier with custom selection property-->
                    <bean id="lamborghini" className="com.arash.models.multiplecandidates.Lamborghini">
                        <qualifier type="com.arash.models.multiplecandidates.MyQualifier">
                            <attribute key="color" value="green"/>
                        </qualifier>
                    </bean>

                    <bean id="pagani" className="com.arash.models.multiplecandidates.Pagani">
                        <qualifier type="com.arash.models.multiplecandidates.MyQualifier">
                            <attribute key="color" value="black"/>
                        </qualifier>
                    </bean>`}
                    </Xml>
                    <Java title={1}>
                        {`
                    @Configuration
                    public class AppConfig {
                        @Qualifier("ferrari")
                        @Bean
                        public Car getFerrari() {
                            return new Ferrari();
                        }
    
                        @MyQualifier(name = "lambo",color = "green")
                        @Bean
                        public Car getLamborghini() {
                            return new Lamborghini();
                        }
    
                        @Bean
                        @MyQualifier(name = "lambo",color = "black")
                        public Car getPagani(){
                            return new Pagani();
                        }
                    }`}
                    </Java>
                </FlexRow>
                <Java description={'usage'}>
                    {`
                    public class Engineer extends Person {
                        @MyQualifier(name = "lambo", color = "black")
                        @Autowired
                        private Car car1;
    
                        @Autowired
                        @MyQualifier(name = "lambo", color = "green")
                        private Car car2;
    
                        @Autowired
                        @Qualifier("ferrari")
                        private Car car3;
                    }`}
                </Java>
            </Bullet>
        </Frame>
    )
}

function getSpel() {
    return (
        <Frame title={'Spring Expression Language (SPEL)'}>
            this expression is useful when we are willing to pass some data via @Value or XML or to execute a tiny piece
            of
            code easily.<br/>
            The general format is <Bold>{'#{SPEL}'}</Bold><br/><br/>
            <Purple>Usage:</Purple>
            <Bullet title={'1.'} level={1}>
                <Bold>java:</Bold>
                <Java>
                    {`
                    ExpressionParser parser = new SpelExpressionParser();
                    Expression exp = parser.parseExpression("'Hello World'");
                    String message = (String) exp.getValue();`}
                </Java>
            </Bullet>
            <Bullet title={'2.'} level={1}>
                <Bold>xml:</Bold>
                <Xml>
                    {`
                    <!--calculate some value by spel-->
                    <bean id="numberGuess" class="com.arash.models.ANumber">
                    <property name="randomNumber" value="#{T(java.lang.Math).random() * 100.0}"/>
                    </bean>

                    <!--using a property of another class-->
                    <bean id="shapeGuess" class="com.arash.models.ANumber">
                    <property name="randomNumber" value="#{someClass.prop}"/>
                    </bean>`}
                </Xml>
            </Bullet>
            <Bullet title={'1.'} level={1}>
                <Bold>annotation:</Bold>
                <Java>
                    {`
                    public class ANumber {
                    @Value("900")
                    private int randomNumber;

                    public void setRandomNumber(int randomNumber) {
                    this.randomNumber = randomNumber;
                    }
                    }`}
                </Java>
            </Bullet>
            <HorizontalLine/>
            <Java>
                {`
                    /*** literal expression ***/
                    “'Hello World'”
                    "6.0221415E+23"
                    "0x7FFFFFFF"
                    "true"
                    "null"

                    /*** properties, arrays, lists, maps, indexers ***/
                    "Birthdate.Year + 1900"
                    "Members[0].Inventions[6]"
                    "Officers['president'].PlaceOfBirth.City"

                    StandardEvaluationContext context = new StandardEvaluationContext();

                    /*** inline lists, Maps ***/
                    List numbers = (List) parser.parseExpression("{1,2,3,4}").getValue(context);
                    List listOfLists = (List) parser.parseExpression("{{'a','b'},{'x','y'}}").getValue(context);
                    Map lst = (Map) parser.parseExpression("{'k1':'v1','k2':'v2'}").getValue(context);

                    /*** array construction ***/
                    int[] numbers1 = (int[]) parser.parseExpression("new int[4]").getValue(context);
                    int[] numbers2 = (int[]) parser.parseExpression("new int[]{1,2,3}").getValue(context);
                    int[][] numbers3 = (int[][]) parser.parseExpression("new int[4][5]").getValue(context);

                    /*** methods ***/
                    String c = parser.parseExpression("'abc'.substring(2, 3)").getValue(String.class);

                    /*** operators ***/
                    boolean a = parser.parseExpression("2 == 2").getValue(Boolean.class); //true
                    boolean b = parser.parseExpression("2 < -5.0").getValue(Boolean.class); //false
                    boolean c = parser.parseExpression("'black' < 'block'").getValue(Boolean.class); //true
                    boolean d = parser.parseExpression("'5.00' matches '^-?\\\\d+(\\\\.\\\\d{2})?$'").getValue(Boolean.class); //true
                    boolean e = parser.parseExpression("true and false").getValue(Boolean.class); //false
                    String expression = "isMember('Nikola Tesla') and isMember('Mihajlo Pupin')";
                    boolean f = parser.parseExpression("!true").getValue(Boolean.class); //false
                    int two = parser.parseExpression("1 + 1").getValue(Integer.class); // 2
                    String g = parser.parseExpression("'test' + ' ' + 'string'").getValue(String.class);  // 'test string'
                    double h = parser.parseExpression("1000.00 - 1e4").getValue(Double.class); // -9000
                    String i = parser.parseExpression("Name = 'Alexandar Seovic'").getValue(context, String.class);

                    /*** types ***/
                    Class dateClass = parser.parseExpression("T(java.util.Date)").getValue(Class.class);
                    Class stringClass = parser.parseExpression("T(String)").getValue(Class.class);
                    boolean j = parser.parseExpression("T(java.math.RoundingMode).CEILING < T(java.math.RoundingMode).FLOOR").getValue(Boolean.class); //true

                    /*** constructors ***/
                    Inventor einstein = parser.parseExpression("new com.arash.Inventor('Albert Einstein', 'German')").getValue(Inventor.class);

                    /*** variables ***/
                    Inventor tesla = new Inventor("Nikola Tesla", "Serbian");
                    StandardEvaluationContext context2 = new StandardEvaluationContext(tesla);
                    context2.setVariable("newName", "Mike Tesla");
                    parser.parseExpression("Name = #newName").getValue(context);
                    System.out.println(tesla.getName()); // "Mike Tesla"

                    /*** another sample ***/
                    List<Integer> primes = new ArrayList<Integer>();
                    primes.addAll(Arrays.asList(2, 3, 5, 7, 11, 13, 17));
                    context2.setVariable("primes", primes);
                    List<Integer> primes2 = (List<Integer>) parser.parseExpression("#primes.?[#this>10]").getValue(context); // select of numbers > 10

                    /*** functions ***/
                    context2.registerFunction("reverseString", StringUtils.class.getDeclaredMethod("reverseString", new Class[]{String.class}));
                    String helloWorldReversed = parser.parseExpression("#reverseString('hello')").getValue(context, String.class);
                    context2.setBeanResolver(new MyBeanResolver());
                    Object bean = parser.parseExpression("@foo").getValue(context);

                    /*** ternary Operator (If - Then - Else) ***/
                    String falseString = parser.parseExpression("false ? 'trueExp' : 'falseExp'").getValue(String.class);

                    /*** collection Selection ***/
                    List<Inventor> list = (List<Inventor>) parser.parseExpression("Members.?[Nationality == 'Serbian']").getValue(context2);
                    Map newMap = (Map) parser.parseExpression("map.?[value<27]").getValue();
                    List placesOfBirth = (List) parser.parseExpression("Members.![placeOfBirth.city]");


                    /*** expression templating ***/
                    String randomPhrase = parser.parseExpression("random number is #{T(java.lang.Math).random()}", new TemplateParserContext()).getValue(String.class);
                `}
            </Java>
        </Frame>
    )
}

function getProfile() {
    return (
        <Frame title={'Profile selection'}>
            <InfoIcon>
                <Java>
                    {`
                    // To check a property existence:
                    context.getEnvironment().containsProperty("who_is_your_daddy");
                    
                    //all environments are not available in spring and some are provide by jvm
                    System.getProperty("propertyName");
                    `}
                </Java>
                <br/>
                To change profile at runtime:
                <Red>!Not tested!</Red>
                <Bash>{'java -Dspring.profiles.active.pro -jar myJar.jar'}</Bash>
            </InfoIcon>
            We can switch to another config via profile.<br/>
            First of, mark all classes belong to a profile
            <Java description={'source code'}>
                {`
                @Profile("develop","!dev")//! => active profile
                public class Bean1 {
                
                    //access your desired environment
                    @Autowired
                    public EnvironmentConfiguration env;
                }`}
            </Java>
            In xml, we have to assign a file for a profile:
            <Xml>
                {`
                <beans
                    ...
                    profile="develop">
                ...
                </beans>`}
            </Xml>
            <HorizontalLine/>
            Now, select a profile:
            <Xml description={'pom.xml'}>
                {`
                <profiles>
                    <profile>
                        <id>develop</id>
                        <activation>
                            <activeByDefault>true</activeByDefault>
                        </activation>
                    </profile>
                </profiles>`}
            </Xml>
            <HorizontalLine/>
            To catch active profile:
            <Java>
                {`
                @Component
                public class Bean1 {
                    @Autowired
                    public Environment env;
                
                    public void loopThroughActiveProfiles() {
                        Arrays.stream(env.getActiveProfiles())
                            .forEach(System.out::println);
                    }
                    
                    @Value("#\{$\{spring.profiles.active}}")
                    String activeProfile;
                
                    @Autowired
                    private ConfigurableEnvironment cfgEnv;
                    
                    public void setActiveProfile(String pName) {
                        //other information is available here
                        cfgEnv.setActiveProfiles("develop");
                    }
                }`}
            </Java>
            <div style={{width: '22rem'}}>
                <Highlight>You have to follow <Bold>profile</Bold> structure in the whole of project when you mention
                    it.</Highlight>
            </div>
        </Frame>
    )
}

function getEvent() {
    return (
        <Frame title={'Events'}>
            <InfoIcon>
                <p>
                    In every event 3 parties are
                    involved: <Bold>Publisher</Bold>, <Bold>Listener</Bold> and <Bold>EvnetObject</Bold>
                </p>
                <p>
                    If event extends <Bold>ApplicationEvent</Bold>, it is called <Blue>standard evnet</Blue> and if it
                    implements <Bold>EvnetListener</Bold>, it is called <Blue>custom</Blue> evnet.<br/>
                </p>
                <p>
                    There are limited standard evnets:<br/>
                    <Bullet title={'ContextStartedEvent'}>When the ApplicationContext is started using the start()
                        method on the ConfigurableApplicationContext interface. You can poll your database or you can
                        restart any stopped application after receiving this event.</Bullet>
                    <Bullet title={'ContextStopedEvnet'}>When the ApplicationContext is stopped using the stop() method
                        on the ConfigurableApplicationContext interface. You can do required housekeep work after
                        receiving this event.</Bullet>
                    <Bullet title={'ContextClosedEvent'}>When the ApplicationContext is closed using the close() method
                        on the ConfigurableApplicationContext interface.</Bullet>
                    <Bullet title={'ContextRefreshedEvnet'}>When the ApplicationContext is either initialized or
                        refreshed. This can also be raised using the refresh() method on the
                        ConfigurableApplicationContext interface.</Bullet>
                    <Bullet title={'RequestHandledEvnet'}>This is a web-specific event telling all beans that an HTTP
                        request has been serviced.</Bullet>
                    <Bullet title={'ServletRequestHandledEvent'}>This one is child of the previous one and refers those
                        requests from servlet</Bullet>
                </p>
            </InfoIcon>
            To raise a standard event:
            <Java>
                {`
                @Component
                public class RegisterPersonEventListener implements ApplicationListener<ContextStartedEvent> {
                
                    @Override
                    public void onApplicationEvent(ContextStartedEvent contextStartedEvent) {
                        System.out.println("context started");
                    }
                }
                
                //usage>>>
                ConfigurableApplicationContext ctx= (ConfigurableApplicationContext) ContextProvider.getAnnotaionContext();
                ctx.start();
                
                //output>>>
                context started
                `}
            </Java>
            To raise custom event:
            <Java>
                {`
                // event object 
                public class RegisterPersonEvent extends ApplicationEvent {
                    public RegisterPersonEvent(Object source) {
                        super(source);
                    }
                }
                
                // publisher object
                @Component
                public class RegisterPersonEventPublisher implements ApplicationEventPublisherAware {
                
                    private ApplicationEventPublisher publisher;
                
                    @Override
                    public void setApplicationEventPublisher(ApplicationEventPublisher applicationEventPublisher) {
                        this.publisher = applicationEventPublisher;
                    }
                
                    public void send() {
                        publisher.publishEvent(new RegisterPersonEvent(this));
                    }
                }
                
                // listener object
                @Component
                public class RegisterPersonEventListener implements ApplicationListener<RegisterPersonEvent> {
                
                    @Override
                    public void onApplicationEvent(RegisterPersonEvent registerPersonEvent) {
                        System.out.println("register person raised");
                    }
                }
                `}
            </Java>
            <Red>This event mechanism is synched and used has to wait till the event process finish.</Red><br/>
            To come over this issue, we should go to asynch event mechanism:<br/>
            <Java>
                {`
                //by annotation
                @EnableAsync
                
                //by java
                public class MyExecutor implements AsyncConfigurer {
                    @Override
                    public Executor getAsyncExecutor() {
                        return new ThreadPoolTaskExecutor();
                    }
                }
                `}
            </Java>
            <Xml>{'<task:annotation-driven executor="anExecutor"/>'}</Xml><br/>
        </Frame>
    )
}

// function get() {
//     return (
//         <Frame title={''}></Frame>
//     )
// }
// function get() {
//     return (
//         <Frame title={''}></Frame>
//     )
// }
// function get() {
//     return (
//         <Frame title={''}></Frame>
//     )
// }
// function get() {
//     return (
//         <Frame title={''}></Frame>
//     )
// }
// function get() {
//     return (
//         <Frame title={''}></Frame>
//     )
// }
// function get() {
//     return (
//         <Frame title={''}></Frame>
//     )
// }
// function get() {
//     return (
//         <Frame title={''}></Frame>
//     )
// }
// function get() {
//     return (
//         <Frame title={''}></Frame>
//     )
// }
// function get() {
//     return (
//         <Frame title={''}></Frame>
//     )
// }
// function get() {
//     return (
//         <Frame title={''}></Frame>
//     )
// }
// function get() {
//     return (
//         <Frame title={''}></Frame>
//     )
// }
// function get() {
//     return (
//         <Frame title={''}></Frame>
//     )
// }
// function get() {
//     return (
//         <Frame title={''}></Frame>
//     )
// }
// function get() {
//     return (
//         <Frame title={''}></Frame>
//     )
// }













