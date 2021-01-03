import React from "react";
import {Bash, Frame, GenericCode, Xml} from "../../components/blocks";
import {InfoIcon} from "../../components/bubble";
import {Blue, Bullet, Highlight, Important} from "../../components/components";
import dependencyProblem from '../../res/images/dependency_problem.png';
import mavenInteraction from '../../res/images/maven_interaction.png';
import mavenLifecycle from '../../res/images/maven_lifecycle.png';
import mavenEmbedded from '../../res/images/maven_embedded.png';
import multiModule from '../../res/images/multi-module.png';

export function MavenCheats() {
    return (
        <>
            {getMavenStructure()}
            {getMavenDuty()}
            {getSettings()}
            {getLifecycle()}
            {getProjectStructure()}
            {getPomStructure()}
            {getMultiModule()}
        </>
    )
}

function getMavenStructure() {
    return (
        <Frame title={'Maven directory structure'}>
            There are two directories available for Maven, the Maven itself directory and m2 directory which holds
            dependencies. In fact ".m2" directory is your local repository<br/>
            In Maven 1, "setting.xml“ is located in Maven home directory at first and after the first execution, another
            "setting.xml" file wil be created in ".m2" directory which contains your specialized configuration. This
            mechanism has changed in Maven 2 newer versi/on and "settings.xml" is located in Maven home directory
            only.<br/>
            <GenericCode>{`
                    MAVEN_HOME
                    ├── bin
                    │   ├── m2.conf
                    │   └── mvn
                    ├── boot
                    │   └── plexus-classworlds-2.6.0.jar
                    ├── conf
                    │   ├── logging
                    │   ├── settings.xml //Proxies, local m2, … are configured here
                    │   └── toolchains.xml
                    ├── lib
                    │   ├── cdi-api-1.0.jar
                    │   ├── ext
                    │   ├── slf4j-api-1.7.29.jar
                    │   └── slf4j-api.license
                    ├── LICENSE
                    ├── NOTICE
                    └── README.txt`}
            </GenericCode>
            <InfoIcon>
                <Important>Maven path must include no space</Important>
                <p>
                    current mave version is 2 but its lib version may be higher.<br/>
                    Maven is going to handle dependency managing, compiling, building, testing, reporting,… .
                </p>
                <p>
                    You must define <span className={'purple'}>M2_HOME → %M2_HOME/bin%</span> in your OS
                    environment. To check that, enter command: <span className={'blue'}>mvn -version</span>
                </p>
            </InfoIcon>
        </Frame>
    )
}

function getMavenDuty() {
    return (
        <Frame title={'Maven duty'}>

            <Blue>Dependency prolem:</Blue><br/>
            Imagine we need lib "a" and "b" and these libs need lib f version 2 and f version 3. Now which lib we
            should keep?<br/>
            Maven fetches dependency tree and keeps the first visited version. So we ourselves must handle
            versioning issue. To check dependency tree enter: <Highlight>mvn dependency:tree</Highlight><br/>
            <img className={'center-horizontally-relative'} src={dependencyProblem}
                 alt={'dependency problem'}/><br/>
            <Bash>
                {`
                    $:~/Applications/projects/java/maventest$ mvn dependency:tree
                    [INFO] Scanning for projects...
                    [INFO]
                    [INFO] -----------------------< org.example:maventest >------------------------
                    [INFO] Building maventest 1.0-SNAPSHOT
                    [INFO] --------------------------------[ jar ]---------------------------------
                    [INFO]
                    [INFO] --- maven-dependency-plugin:2.8:tree (default-cli) @ maventest ---
                    [INFO] org.example:maventest:jar:1.0-SNAPSHOT
                    [INFO] \- mysql:mysql-connector-java:jar:8.0.22:compile
                    [INFO]    \- com.google.protobuf:protobuf-java:jar:3.11.4:compile
                    [INFO] ------------------------------------------------------------------------
                    [INFO] BUILD SUCCESS
                    [INFO] ------------------------------------------------------------------------
                    [INFO] Total time:  1.136 s
                    [INFO] Finished at: 2020-11-04T16:35:30+03:30
                    [INFO] ------------------------------------------------------------------------
                    `}
            </Bash>

            <p>
                <Blue>Maven ecosystem:</Blue><br/>
                When we request a dependency in maven ecosystem, maven firstly, searches the local repository (m2
                directory). Maven itself manipulates m2 directory. If it couldn't find the dependency, then it sends the
                request to a Repository Manager such as Nexus and Nexus downloads it from other public repositories. The
                dependency will be obtained in m2 directory. Next time, there is no need to download that files
                again<br/><br/>
                <img className={'center-horizontally-relative'} src={mavenInteraction} alt={'maven interaction'}/>
            </p>
            <p>
                Full map of embedded Maven:<br/>
                Zabbix monitors git continuously. On alter, builds the project with the help of Puppet on maven. Then
                puppet sends war/jar to Jenkins for test and test will be monitored by Zabbix.<br/>
                <img className={'center-horizontally-relative'} src={mavenEmbedded} alt={'embed maven'}/>
            </p>
        </Frame>
    )
}

function getSettings() {
    return (
        <Frame title={'Settings.xml'}>
            <Xml>
                {`
                <?xml version="1.0" encoding="UTF-8"?>
                <!--
                 | This is the configuration file for Maven. It can be specified at two levels:
                 |
                 |  1. User Level. This settings.xml file provides configuration for a single user,
                 |                 and is normally provided in $\{user.home}/.m2/settings.xml.
                 |
                 |                 NOTE: This location can be overridden with the CLI option:
                 |
                 |                 -s /path/to/user/settings.xml
                 |
                 |  2. Global Level. This settings.xml file provides configuration for all Maven
                 |                 users on a machine (assuming they're all using the same Maven
                 |                 installation). It's normally provided in
                 |                 $\{maven.conf}/settings.xml.
                 |
                 |                 NOTE: This location can be overridden with the CLI option:
                 |
                 |                 -gs /path/to/global/settings.xml
                 |
                 | The sections in this sample file are intended to give you a running start at
                 | getting the most out of your Maven installation. Where appropriate, the default
                 | values (values used when the setting is not specified) are provided.
                 |
                 |-->
                <settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
                          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
                    <!-- localRepository
                     | The path to the local repository maven will use to store artifacts.
                     | you can define more than 1 localRepository and there is no priority among them.
                     |
                     | Default: $\{user.home}/.m2/repository $\{user.home} is taken from OS
                    -->
                    <localRepository>/path/to/local/repo</localRepository>
                    <!-- interactiveMode
                     | Maven asks question when some changes come in. It is better to make it false, so maven will do its job by itself.
                     |
                     | Default: true
                    -->
                    <interactiveMode>true</interactiveMode>
                    <!-- offline
                     | Determines whether maven should attempt to connect to the network when executing a build.
                     | This will have an effect on artifact downloads, artifact deployment, and others.
                     |
                     | Am I allowed to use the Internet. If you want to use online policy, then you should define proxy too.
                     |
                     | Default: false
                    -->
                    <offline>false</offline>
                    <!-- pluginGroups
                     | maven is plugin based, So we have to define plugins for every operation.
                     |-->
                    <pluginGroups>
                        <pluginGroup>com.your.plugins</pluginGroup>
                    </pluginGroups>
                    <!-- proxies
                     | This is a list of proxies which can be used on this machine to connect to the network.
                     | Unless otherwise specified (by system property or command-line switch), the first proxy
                     | specification in this list marked as active will be used.
                     |-->
                    <proxies>
                        <proxy>
                            <id>optional</id> <!--you define this to distinguish multiple proxies-->
                            <active>true</active> <!-- enabled or not -->
                            <protocol>http</protocol>
                            <username>proxyuser</username>
                            <password>proxypass</password>
                            <host>proxy.host.net</host><!--there are often more than 1 host. separate them with '|' character-->
                            <port>80</port>
                            <nonProxyHosts>local.net|some.host.com
                            </nonProxyHosts> <!-- usually, some parts of a proxy is free and doesn't need any username & password. This one is for them -->
                        </proxy>
                    </proxies>
                    <!-- servers
                     | This is a list of authentication profiles, keyed by the server-id used within the system.
                     | Authentication profiles can be used whenever maven must make a connection to a remote server.
                     |-->
                    <servers>
                        <!-- server
                         | Specifies the authentication information to use when connecting to a particular server, identified by
                         | a unique name within the system (referred to by the 'id' attribute below).
                         |
                         | NOTE: You should either specify username/password OR privateKey/passphrase, since these pairings are
                         |       used together.
                         |
                         -->
                        <server>
                            <id>deploymentRepo</id>
                            <!-- use username & password or key & passphrase-->
                            <username>repouser</username>
                            <password>repopwd</password>
                            <!--
                            | If you are not willing to leave the setting file plain, you can hash your username & password and put that into another file
                            | mvn -emp yourPassword -> returns a hash code
                            | you must create a file named settings-security.xml under .m2. Go to next node.
                            -->
                            <privateKey>/path/to/private/key</privateKey> <!-- private/public key which you have for system-->
                            <passphrase>optional; leave empty if not used.</passphrase>
                            <filePermissions></filePermissions> <!-- the permission to create files on server-->
                            <directoryPermissions></directoryPermissions> <!-- like above for directory -->
                        </server>
                    </servers>
                    <!-- this part must be written in setting-security.xml file not here!!!
                     | create <settings> node just like above:
                     -->
                    <settingsSecurity>
                        <master>
                            <!-- hashcode created by npm -emp -->
                        </master>
                    </settingsSecurity>
                    <!-- this part must be written in setting-security.xml file not here!!! -->
                    <mirrors>
                        <mirror>
                            <id>mirrorId</id> <!-- must be unique -->
                            <mirrorOf>repositoryId</mirrorOf> <!-- this is mirror of which server -->
                            <name>Human Readable Name for this Mirror.</name>
                            <url>http://my.repository.com/repo/path</url>
                            <layout>default</layout> <!-- no details yet in maven -->
                            <mirrorOfLayouts>default | legacy</mirrorOfLayouts> <!-- no details yet in maven. Use default -->
                        </mirror>
                    </mirrors>
                    <!-- profiles
                     | We use profile to set environmental for your production. For example develop and test
                     |
                     |-->
                    <profiles>
                        <profile>
                            <id>jdk-1.4</id>
                            <!-- we speak about OS settings... -->
                            <activation>
                                <jdk>1.4</jdk> <!-- which jdk is used -->
                            </activation>
                            <properties/><!-- a property file (key:value) -->
                            <pluginRepositories></pluginRepositories> <!-- plugins which are useful for this profile-->
                            <repositories> <!-- if you want to use Nexus,-→ you must have defined it here-->
                                <repository>
                                    <id>jdk14</id>
                                    <name>Repository for JDK 1.4 builds</name>
                                    <url>http://www.myhost.com/maven/jdk14</url>
                                    <layout>default</layout>
                                    <snapshotPolicy>always</snapshotPolicy>
                                </repository>
                            </repositories>
                        </profile>
                        <!--
                         | Here is another profile, activated by the system property 'target-env' with a value of 'dev',
                         | which provides a specific path to the Tomcat instance. To use this, your plugin configuration
                         | might hypothetically look like:
                         |
                         | ...
                         | <plugin>
                         |   <groupId>org.myco.myplugins</groupId>
                         |   <artifactId>myplugin</artifactId>
                         |
                         |   <configuration>
                         |     <tomcatLocation>$\{tomcatPath}</tomcatLocation>
                         |   </configuration>
                         | </plugin>
                         | ...
                         |
                         | NOTE: If you just wanted to inject this configuration whenever someone set 'target-env' to
                         |       anything, you could just leave off the <value/> inside the activation-property.
                         |
                        <profile>
                          <id>env-dev</id>
                          <activation>
                            <property>
                              <name>target-env</name>
                              <value>dev</value>
                            </property>
                          </activation>
                          <properties>
                            <tomcatPath>/path/to/tomcat/instance</tomcatPath>
                          </properties>
                        </profile>
                        -->
                    </profiles>
                    <!-- activeProfiles
                     | List of profiles that are active for all builds.
                     |
                    <activeProfiles>
                      <activeProfile>alwaysActiveProfile</activeProfile>
                      <activeProfile>anotherAlwaysActiveProfile</activeProfile>
                    </activeProfiles>
                    -->
                </settings>
                `}
            </Xml>
        </Frame>
    )
}

function getProjectStructure() {
    return (
        <Frame title={'Project structure'}>
            <InfoIcon>
                <p>
                    Project assembling: Creating project structure is called assembling.
                </p>
                We should determine the structure of the project first. To do that, there are some predefined arch-types
                (
                <span
                    className={'purple'}>An arch-type is responsible to assemble the project and manipulates pom file</span>).<br/>
                <p>
                    maven uses two major repository: repo.mavne.apache.org and uk.maven.org. If you are willing to
                    upload your project in that repository, its name must be unique. To reach this goal we should follow
                    (GroupName,ProjectName,Version) pattern.
                </p>
            </InfoIcon>
            <div className={'float-holder'} style={{minWidth: '700px'}}>
                <GenericCode title={''}>{`
                .
                ├── pom.xml //1
                └── src
                    ├── LICENSE.txt //2
                    ├── main
                    │   ├── config //3
                    │   ├── db //4
                    │   ├── java //5
                    │   │   └── sourcePackages
                    │   ├── resources
                    │   │   └── META-INF
                    │   ├── scripts //6
                    │   └── webapp
                    │       └── WEB-INF //7
                    │           └── web.xml
                    ├── NOTICE.txt //8
                    ├── README.txt //9
                    ├── site //10
                    └── test
                        ├── java
                        └── resources
                `}
                </GenericCode>
                <Bullet title={'1.'}>This is the heart of maven structure</Bullet>
                <Bullet title={'2.'}>Talk about license here</Bullet>
                <Bullet title={'3.'}>e.x: tomcat context files or mail server configs. This dir must not included in
                    artifact</Bullet>
                <Bullet title={'4.'}>DB info. SQL scripts are important</Bullet>
                <Bullet title={'5.'}>Source code goes here</Bullet>
                <Bullet title={'6.'}>Everything about system administration or things that a developer may need or OS
                    environmental things.</Bullet>
                <Bullet title={'7.'}>Window is able to recognize this dir in small and capital cases, but Linux accepts
                    only capital case. Previously, all configs were going here, but now we almost use @, but never lose
                    this dir. Some times it comes handy. After compile, classes dir will be created under this dir and
                    .class files are located here.</Bullet>
                <Bullet title={'8.'}>Notices goes here</Bullet>
                <Bullet title={'9.'}>Instruction Information</Bullet>
                <Bullet title={'10.'}>Images and any thing necessary for build</Bullet>
            </div>
        </Frame>
    )
}

function getPomStructure() {
    return (
        <Frame title={'Pom.xml structure'}>
            <InfoIcon>
                <Blue>To declare a variable inside pom file:</Blue>
                <Xml>
                    {`
                    <properties>
                        <mysql.version>8.0.22</mysql.version>
                    </properties>
                    
                    <someOtherNode>$\{mysql.version}</someOtherNode>
                    `}
                </Xml>
                <p>
                    <Blue>Scope is declared to determine target place of dependency</Blue><br/>
                    <span className={'purple'}>Compile:</span> build, test, run<br/>
                    <span className={'purple'}>Provided:</span> build, test, run, !artifact<br/>
                    <span className={'purple'}>Runtime:</span> artifact<br/>
                    <span className={'purple'}>System:</span> like provided but is hardcoded in system in another
                    path<br/>
                    <span className={'purple'}>Test:</span> test, !artifact<br/>
                </p>
            </InfoIcon>
            <Important>It is possible to put {`<dependencies/>`} in project node instead of profile. By this way, please
                notice that it may cause some trouble if you address a dependency from your computer, then others will
                fail to load that dependency. So it is recommended to put your desired depenedencies inside your own
                profile node</Important>
            <GenericCode>
                {`
                <?xml version="1.0" encoding="UTF-8"?>
                <project xmlns="http://maven.apache.org/POM/4.0.0"
                         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
                    <modelVersion>4.0.0</modelVersion>
                
                    <!-- this part must be unique →
                    <!-- version: MajorVersion.MinorVersion.IncrementalVersion-qualifier(RC,alpha,beta,SNAPSHOT) →
                    <!-- version.SNAPSHOT: it means that the project is under develop and is not stable, so maven downloads it on each sync cmd. -->
                    <groupId>your company name/domain</groupId>
                    <artifactId>project</artifactId>
                    <version>1.0-SNAPSHOT</version>
                   
                    <packaging>jar</packaging> <!-- output package type-->
                    <name>start with maven</name> <!-- the name of generated document -->
                    <url>http://www.arash.softwares.com</url> <!-- the target URL which we want to send the document →
                
                    <!-- some information about developers -->
                    <developers>
                        <developer>
                            <id>myId</id>
                            <name>Arash Rezaie</name>
                            <email>arash.re.12@gmail.com</email>
                            <properties>
                                <active>true</active>
                            </properties>
                        </developer>
                    </developers>
                
                    <!-- you can define any variable here and it can be a new one or builtin.Ref: $\{propertyName} -->
                    <properties>
                        <mysql.version>8.0.22</mysql.version>
                    </properties>
                
                    <profiles>
                        <profile>
                            <id>develop</id>
                            <activation>
                                <!-- address a file indide project -->
                                <file>
                                    <exists>/src/main/lib.jar</exists>
                                </file>
                            </activation>
                            <dependencies>
                                <dependency>
                                    <groupId>mysql</groupId>
                                    <artifactId>mysql-connector-java</artifactId>
                                    <version>$\{mysql.version}</version>
                                    <scope>compile</scope>
                                    <exclusions>
                                        <!-- We can exclude some lib in a scope to avoid conflict -->
                                        <exclusion>
                                            <groupId></groupId>
                                            <artifactId></artifactId>
                                        </exclusion>
                                    </exclusions>
                                </dependency>
                                <dependency>
                                    <!-- address a file in your system like this -->
                                    <systemPath>local address</systemPath>
                                </dependency>
                            </dependencies>
                        </profile>
                    </profiles>
                </project>
                `}
            </GenericCode>
        </Frame>
    )
}

function getLifecycle() {
    return (
        <Frame title={'Lifecycle'}>
            Every operation in Maven executes by a plugin. One lifecycle includes some stages and each stage has some
            goals to be passed one after the other to conclude the lifecycle.<br/>
            There is an order to pass all phases,It stars from phase1.goal1, then phase1.goal2, ... till the end. So,
            all prerequisite phases must be passed to execute an special stage<br/>
            <img className={'center-horizontally-relative'} src={mavenLifecycle} alt={'maven lifecycle'}/>
            <p>
                Running stages:<br/>
                <span className={'purple'}>mvn plugin</span><br/>
                <span className={'purple'}>mvn plugin:goal</span><br/>
                <span className={'blue'}>mvn compiler:compile</span><br/>
                <br/>
                Show what plugin does:<br/>
                <span className={'blue'}>mvn help:describe -Dplugin=compiler</span><br/>
            </p>
        </Frame>
    )
}

function getMultiModule() {
    return (
        <Frame title={'Multi-Module'}>
            We have to separate a project into multiple subprojects, so a team will be able to develop the project at
            the same time without breaking the code of others.<br/>
            A multi-module project consists of multiple maven project, then we link them together and compile the root
            project.<br/>
            <img src={multiModule} alt={'multi-module project structure'}
                 className={'center-horizontally-relative'}/><br/>
            <GenericCode title={'project assembly'}>
                {`
                .
                ├── config
                ├── db
                ├── LICENSE.txt
                ├── maventest.iml
                ├── NOTICE.txt
                ├── persistence //module persistence
                │   ├── main
                │   │   ├── java
                │   │   │   ├── com
                │   │   │   │   └── arash
                │   │   │   │       ├── Main.java
                │   │   │   │       └── model
                │   │   │   └── META-INF
                │   │   └── resources
                │   │       └── META-INF
                │   ├── pom.xml //module pom file
                │   ├── target
                │   │   ├── maven-archiver
                │   │   │   └── pom.properties
                │   │   └── persistence.jar
                │   └── test
                │       ├── java
                │       └── resources
                ├── pom.xml  //main pom file
                ├── README.txt
                ├── scripts
                ├── services //module services
                │   ├── main
                │   │   ├── java
                │   │   │   ├── com
                │   │   │   │   └── arash
                │   │   │   │       └── Main.java
                │   │   │   └── META-INF
                │   │   └── resources
                │   │       └── META-INF
                │   ├── pom.xml //module pom file
                │   ├── target
                │   │   ├── maven-archiver
                │   │   │   └── pom.properties
                │   │   └── services.jar
                │   └── test
                │       ├── java
                │       └── resources
                ├── site
                └── webapp
                    └── WEB-INF
                        └── web.xml
                `}
            </GenericCode>

            <div className={'flex-row'}>
                <Xml description={'Parent pom file'}>
                    {`
                <groupId>com.arash</groupId>
                <artifactId>web</artifactId>
                <version>1.0-SNAPSHOT</version>
                <name>parent multi module</name>
                
                <!-- packaging must be pom -->
                <packaging>pom</packaging>
                
                <!-- children must be defined in modules node, so main project becomes aware of them -->
                <modules>
                    <module>services</module>
                    <module>persistence</module>
                </modules>
                
                <properties>
                    <mysql.version>8.0.22</mysql.version>
                </properties>
                <profiles>
                    <profile>
                        <id>develop</id>
                        <build>
                            <plugins>
                                <plugin>
                                    <groupId>org.apache.maven.plugins</groupId>
                                    <artifactId>maven-compiler-plugin</artifactId>
                                    <version>3.8.1</version>
                                    <configuration>
                                        <source>1.8</source>
                                        <target>1.8</target>
                                    </configuration>
                                </plugin>
                            </plugins>
                        </build>
                    </profile>
                </profiles>
                `}
                </Xml>
                <Xml description={'Child pom file'}>
                    {`
                <artifactId>services</artifactId>
                <version>1.0-SNAPSHOT</version>
                <name>child module service</name>
                <packaging>jar</packaging>
                
                <!-- introduce main parent -->
                <parent>
                    <groupId>com.arash</groupId>
                    <artifactId>web</artifactId>
                    <version>1.0-SNAPSHOT</version>
                </parent>
                
                <dependencies>
                    <dependency>
                        <groupId>com.arash</groupId>
                        <artifactId>persistence</artifactId>
                        <version>1.0-SNAPSHOT</version>
                    </dependency>
                </dependencies>
                <build>
                    <!-- parent name will be replaced if you drop this one -->
                    <finalName>services</finalName>
                </build>
                `}
                </Xml>
            </div>
        </Frame>
    )
}