import {Frame, Java} from "../../components/blocks";
import React from "react";
import {Blue, Bullet, HorizontalLine, Important} from "../../components/components";
import {InfoIcon} from "../../components/bubble";
import {Float} from "../../components/float";
import channel1 from "../../res/images/channel1.png";
import channel2 from "../../res/images/channel2.png";
import channel3 from "../../res/images/channel3.png";
import channel4 from "../../res/images/channel4.png";
import buffers from "../../res/images/buffers.png";
import channels from "../../res/images/channels.png";

export function JavaCheats() {
    return (
        <>
            {getObject()}
            {getAnnotation()}
            {getFunctionalInterface()}
            {getOptional()}
            {getLambda()}
            {getStream()}
            {getIo()}
            {getNio()}
        </>
    )
}

function getObject() {
    return (
        <Frame title={'Creating object'}>
            <Blue>Ways of creating Object in java:</Blue>
            <Bullet title={'1.'}>new Object();</Bullet>
            <Bullet title={'2.'}>class.forName(“fullNameSpace”).newInstance();</Bullet>
            <Bullet title={'3.'}>class.getClassLoader().loadClass(“fullNameSpace”).newInstance();</Bullet>
            <Bullet title={'4.'}>Object.clone();</Bullet>
            <Bullet title={'5.'}>Object deserialization:</Bullet>
            <Java>
                {`String filePath = "Persist.txt";
                    Input1 s1 = new Input1("JavaInterviewpoint");
                    try {
                        //write serializable class into a file
                        FileOutputStream fileOutputStream = new FileOutputStream(filePath);
                        ObjectOutputStream outputStream = new ObjectOutputStream(fileOutputStream);
                        outputStream.writeObject(s1);
                        outputStream.flush();
                        outputStream.close();
                        
                        //read a serializable class from a file
                        FileInputStream fileInputStream = new FileInputStream(filePath);
                        ObjectInputStream inputStream = new ObjectInputStream(fileInputStream);
                        Input1 s2 = (Input1) inputStream.readObject();
                        inputStream.close();
        
                        //that's it
                        System.out.println(s2.data);
                    } catch (Exception ee) {
                        ee.printStackTrace();
                    }`}
            </Java>
        </Frame>
    )
}

function getAnnotation() {
    return (
        <Frame title={'Annotation'}>
            An interface with @ behind its name
            <Java>
                {`
                            @Retention()
                            @Target()
                            @Documented
                            @ParentAnnotation //any annotation you are willing to inherit
                            public @interface Pride {
                                public String getVoice();
                                
                                @AliasFor("parentMethodName") //to give an alias to parent method
                                String aliasMethod() default "";
                            }
                        `}
            </Java>
            <InfoIcon>
                <p>
                    <span className={'blue bold'}>Retention:</span> The duration of annotated class<br/>
                    <span className={'purple'}>RetentionPolicy.RUNTIME:</span><span> The annotated class will be accessible at compiled .class file and run time</span><br/>
                    <span className={'purple'}>RetentionPolicy.CLASS</span><span> The annotated class will be accessible at compiled .class file, but not run time. It is suitable for some reflection and marking</span><br/>
                    <span
                        className={'purple'}>RetentionPolicy.SOURCE</span><span> The annotated class will be accissble at .java file so you can use it only in development time</span>
                </p>
                <p>
                    <span className={'blue bold'}>Target:</span> To controle what programming structure part it
                    can be accessed</p>
                <p>
                    <span className={'blue bold'}>Documentation:</span> It will be documented on annotated class
                </p>
            </InfoIcon>
        </Frame>
    )
}

function getFunctionalInterface() {
    return (
        <Frame title={'Functional Interface'}>
            functional Interface is a SAM interface (Simple Abstract Method).
            <Bullet title={'1.'} level={1}>Static and default methods (java 8) doesn't break SAM</Bullet>
            <Bullet title={'2.'} level={1}>Methods which come from Object class such as "equal", "toString",…
                doesn’t break SAM</Bullet>

            <Java>
                {`
                        @FunctionalInterface
                        public interface Pride {
                            public String getVoice();
                        }
                        
                        //Anonymous class as it is nameless
                        Pride p = new Pride() {
                        @Override
                            public String getVoice() {
                            return "Gher gher gher gherrrrrrrrr... Rrrrrrrr";
                        }
                        };`}
            </Java>
        </Frame>)
}

function getOptional() {
    return (
        <Frame title={'Optional'}>
            To avoid NullPointerException
            <Java>
                {`
                        //test Optional class
                        public class Main {
                            public static Optional<Double> sum(Double num1, Double num2) {
                                if (num1 == null || num2 == null)
                                    return Optional.empty();
                                return Optional.of(num1 + num2);
                            }
                            public static void main(String[] args) {
                                Optional<Double> result = sum(5d, null);
                                result.ifPresent(System.out::println);
                                result.ifPresentOrElse(d-> System.out.println(d),()-> System.out.println("empty"));
                            }
                        }`}
            </Java>
        </Frame>
    )
}

function getLambda() {
    return (
        <Frame title={'Lambda'}>
            <Java>
                {`
                public interface MySam { //Single Abstract Method
                    String getMessage(String arg);
                }
                
                public class Person {
                    private String name;
                    private int age;
                
                    public Person(String name, int age) {
                        this.name = name;
                        this.age = age;
                    }
                
                    public static int compareAge(Person a, Person b) {
                        return a.age - b.age;
                    }
                
                    public static int compareName(Person a, Person b) {
                        return a.name.compareTo(b.name);
                    }
                
                    public static String compareName(String a) {
                        return a.toString();
                    }
                }
                
                public static void main(String... args){
                    MySam mySam = (MySam) (a) -> a.toString(); //impelmenting MySam by lambda
                    MySam mySam1 = Person::compareName; //you can pass a method of an object via refencing instead of implementing the SAM
                    String s = mySam1.getMessage("hurraraarara");
                }
                `}
            </Java>

            some builtin functional interfaces:
            <Java>
                {`
                Supplier<Input1> s = () -> new Input1("input 1"); //T get()
                Consumer<Input1> c = in -> sout(in); //void accept(T)
                BiConsumer<Input1, Input2> bc = (in1, in2) -> sout(in1.data + in2.data); //void accept(T,U)
                Predicate<Input1> p = in -> in.data != null; // Boolean test(T)
                BiPredicate<Input1, Input2> bp = (in1, in2) -> in1.data.equals(in2.data); //Boolean test(T,U)
                Function<Input1, Output> f = in -> new Output(in.data); //R apply(T)
                BiFunction<Input1, Input2, Output> bf = (in1, in2) -> new Output(in1.data + in2.data); //R apply(T,U)
                UnaryOperator<Input1> o = in -> new In(in.data + "apend"); //T apply(T)
                BinaryOperator<Input1> bo = (in1, in2) -> new Input1(in1.data + in2.data); //T apply(T,T)
                        `}
            </Java>
            <InfoIcon>
                <span className={'bold blue'}>'->'  :</span> method accessor operator<br/>
                <span className={'bold blue'}>'::'  :</span> method reference operator<br/>
                SAM signature and referenced method must be the same
            </InfoIcon>
        </Frame>
    )
}

function getStream() {
    return (
        <Frame title={'Stream'}>
            Stream is a sequence of data. In a Stream two types of operators are available. Intermediate
            Operators and Terminate Operator.<br/>
            All of operators are running by Jit (So they are compiled and are fast enough).

            <Java>{`
                    //Stream test
                    public class Main {
                        public static void main(String[] args) {
                            getList().stream()
                                .filter(o -> o.name.equals("White"))
                                .forEach(o -> System.out.println(o));
                            /*
                            Dena{name='White', model=1390}
                            Dena{name='White', model=1391}
                            Dena{name='White', model=1392}
                            Dena{name='White', model=1385}
                            Dena{name='White', model=1391}
                            */
                            System.out.println("---------------------------------------");
                            getList().stream()
                                .filter(o -> o.name.equals("Black"))
                                .sorted((x, y) -> x.model - y.model)
                                .forEach(x -> System.out.println(x));
                            /*
                            Dena{name='Black', model=1388}
                            Dena{name='Black', model=1391}
                            Dena{name='Black', model=1393}
                            */
                            System.out.println("---------------------------------------");
                            System.out.println(
                            getList().stream()
                                .filter(x -> x.name.equals("Red") && x.model > 1389)
                                .count()
                            );
                            //2
                            System.out.println("---------------------------------------");
                            getList().stream()
                                .filter(x -> x.name.equals("White"))
                                .limit(3)
                                .skip(2)
                                .forEach(System.out::println);
                            //Dena{name='White', model=1392}
        
                            System.out.println("---------------------------------------");
                            Optional<Integer> result = getList().stream()
                                .filter(x -> x.name.equals("White"))
                                .map(x -> x.model)
                                .reduce(Integer::sum);
                                result.ifPresent(System.out::println); //6949
                        }
                        
                        private static List<Dena> getList() {
                            return Arrays.asList(
                                new Dena("White", 1390),
                                new Dena("Red", 1387),
                                new Dena("Blue", 1389),
                                new Dena("Black", 1388),
                                new Dena("White", 1391),
                                new Dena("Blue", 1390),
                                new Dena("White", 1392),
                                new Dena("Red", 1388),
                                new Dena("Black", 1391),
                                new Dena("Red", 1390),
                                new Dena("White", 1385),
                                new Dena("Blue", 1390),
                                new Dena("Red", 1390),
                                new Dena("Blue", 1389),
                                new Dena("Black", 1393),
                                new Dena("White", 1391)
                            );
                        }
                    }`}
            </Java>
            <InfoIcon>
                stream accepts parallel method too, by which the process will be executed in parallel mode.
                Please
                notice that if all cores are busy, parallel enforces extra process on CPU and performance
                becomes
                slower. Also some processes are not parallel by nature.<br/>
                To reach better performance we should use Jni. Therefore we decide that which core handles the
                process but in concurrent mode, OS makes the decision.

                <div>
                    <Frame>
                        <span className={'purple'}>Parallel:</span><br/>
                        core 1 → thread 1<br/>
                        core 2 → thread 2
                    </Frame>
                    <Frame>
                        <span className={'purple'}>Concurrent:</span><br/>
                        core 1 → thread 1<br/>
                        core 1 → thread 2
                    </Frame>
                </div>
                We can also pass the process to the client GPU via Vadin.
            </InfoIcon>
        </Frame>
    )
}

function getIo() {
    return (
        <Frame title={'IO'}>
            <InfoIcon>
                <span className={'purple'}>Low level IO:</span> Reading/Writing to the file itself (needs working
                with disk)<br/>
                <span className={'purple'}>High level IO:</span> Reading/Writing to the file tools<br/><br/>
                <span className={'purple'}>Console:</span> we have 3 types of console. Input, Output and Error and all
                of them are based on byte.<br/><br/>
                Difference between simple classes and those with Reader/Writer word at the end is the lack of String
                facilities
            </InfoIcon>
            Using low level IO means that we should consider data type (Binary/String). Reader and Writers are better
            for string data type. In here we use File as destination:<br/>
            <Java description={'Write to file'}>{`
                public void writeToFileUsingFiles(String path, String data) throws IOException {
                    Files.writeString(Path.of(path), data); //Java 11+ only
                }
            
                public void writeToFileUsingFileWriter(String path, String data) throws IOException {
                    try (FileWriter fileWriter = new FileWriter(path, StandardCharsets.UTF_8);) {
                        fileWriter.write(data);
                        fileWriter.flush();
                    }
                }
            
                public void writeToFileUsingBufferedWriter(String path, String data) throws IOException {
                    try (FileWriter fileWriter = new FileWriter(path, StandardCharsets.UTF_8);
                         BufferedWriter writer = new BufferedWriter(fileWriter)) {
                        writer.write(data);
                        writer.flush();
                    }
                }
            
                public void writeToFileUsingFileOutputStream(String path, String data) throws IOException {
                    try (FileOutputStream outputStream = new FileOutputStream(path);) {
                        byte[] strToBytes = data.getBytes(StandardCharsets.UTF_8);
                        outputStream.write(strToBytes);
                        outputStream.flush();
                    }
                }
            
                public void writeToFileUsingDataOutputStream(String path, String data) throws IOException {
                    try (FileOutputStream outputStream = new FileOutputStream(path);
                         BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(outputStream);
                         DataOutputStream dataOutStream = new DataOutputStream(bufferedOutputStream);) {
                        dataOutStream.writeUTF(data);
                        dataOutStream.flush();
                    }
                }
                
                public void writeToFileUsingOutputStreamWriter(String path, String data) throws IOException {
                    try (FileOutputStream fos = new FileOutputStream(path);
                         OutputStreamWriter outputStreamWriter = new OutputStreamWriter(fos, StandardCharsets.UTF_8);
                         BufferedWriter bufferedWriter = new BufferedWriter(outputStreamWriter);) {
                        bufferedWriter.write(data);
                        bufferedWriter.flush();
                    }
                }
                `}
            </Java>

            <Java description={'Read from file'}>
                {`
                public String readFromFileUsingFiles(String path) throws IOException {
                    return Files.readString(Path.of(path));
                }
            
                public String readFromFileUsingFileReader(String path) throws IOException {
                    try (FileReader fileReader = new FileReader(path, StandardCharsets.UTF_8);) {
                        StringBuilder sb = new StringBuilder(200);
                        char[] b = new char[20];
                        int c;
                        while ((c = fileReader.read(b, 0, b.length)) > 0)
                            sb.append(b, 0, c);
                        return sb.toString();
                    }
                }
            
                public String readFromFileUsingBufferedWriter(String path) throws IOException {
                    try (FileReader fileReader = new FileReader(path, StandardCharsets.UTF_8);
                         BufferedReader reader = new BufferedReader(fileReader);) {
                        StringBuilder sb = new StringBuilder(200);
                        String s;
                        while ((s = reader.readLine()) != null)
                            sb.append(s);
                        return sb.toString();
                    }
                }
            
                public String readFromFileUsingFileInputStream(String path) throws IOException {
                    try (FileInputStream inputStream = new FileInputStream(path);) {
                        StringBuilder sb = new StringBuilder(200);
                        byte[] b = new byte[20];
                        int c;
                        while ((c = inputStream.read(b, 0, b.length)) > 0)
                            sb.append(new String(b, 0, c, StandardCharsets.UTF_8));
                        return sb.toString();
                    }
                }
            
                public String readFromFileUsingDataInputStream(String path) throws IOException {
                    try (FileInputStream inputStream = new FileInputStream(path);) {
                        BufferedInputStream bufferedInputStream = new BufferedInputStream(inputStream);
                        DataInputStream dataInStream = new DataInputStream(bufferedInputStream);
                        return dataInStream.readUTF();
                    }
                }
                
                public String readFromFrilUnicode(String path) throws IOException {
                    StringBuilder sb = new StringBuilder(200);
                    try (FileInputStream fis = new FileInputStream(path);
                         InputStreamReader inputStreamReader = new InputStreamReader(fis, StandardCharsets.UTF_8);
                         BufferedReader bufferedReader = new BufferedReader(inputStreamReader);) {
                        char[] b = new char[20];
                        int c;
                        while ((c = bufferedReader.read(b)) > 0)
                            sb.append(b, 0, c);
                        return sb.toString();
                    }
                }
                `}
            </Java>
        </Frame>
    )
}

function getNio() {
    return (
        <Frame title={'NIO (New IO)'}>
            We do high level io via NIO libraries as we interact with a buffer, then it affects destination device.<br/>
            <span className={'blue bold'}>Why NIO?</span>
            <Bullet title={'1.'}>Better performance than IO, because of data chunk instead of byte, also by using OS
                features, NIO is faster</Bullet>
            <Bullet title={'2.'}>IO is unidirectional while NIO is bidirectional</Bullet>
            <Bullet title={'3.'}>Move forth and back cross the stream. In IO we should cache data</Bullet>
            <Bullet title={'4.'}>Multithreading on read/write while we use a single thread in IO</Bullet>
            <Bullet title={'5.'}>Using multichannle</Bullet>

            <br/>
            First of all, we should discus about buffers:<br/>
            Buffer in NIO package is an abstract class which manages a fixed size array. You can put/get a block of data
            into/from the array. <span className={'bold'}>There are only 2 ways to catch a
            buffer:</span>

            <Java>{`
                    ByteBuffer buf = ByteBuffer.allocate(10);
                    ByteBuffer buf2 = ByteBuffer.wrap(new byte[10],offset,length);`}
            </Java>
            Buffer has 4 attributes:<br/>

            <Bullet title={'1.'}><span className={'bold vlue'}>Capacity: </span>The maximum number of data elements
                the buffer can hold. The capacity is set when the buffer is created and can never be changed.</Bullet>
            <Bullet title={'2.'}><span className={'bold vlue'}>Limit: </span>The first element of the buffer that
                should not be read or written. In other words, the count of live elements in the
                buffer.</Bullet>
            <Bullet title={'3.'}><span className={'bold vlue'}>Position: </span>The index of the next element to be
                read or written. The position is updated automatically by relative get() and put()
                methods.</Bullet>
            <Bullet title={'4.'}><span className={'bold vlue'}>Mark: </span>A remembered position. Calling mark()
                sets mark = position. Calling reset( ) sets position = mark. The mark is undefined until
                set.</Bullet>

            <p>Check out the following example:</p>

            <span>There are 4 flags. marker, position, limit & capacity. </span><Important>Reading
            and Writing happens at position marker</Important>
            <Java>{'ByteBuffer buf = ByteBuffer.allocate(10); //by default limit = capacity and position = 0.'}</Java>
            <img className={'center-horizontally-relative'} src={channel1} alt={'Channel structure: primary stage'}/>

            <Java> buf.put((byte) 'H').put((byte) 'e').put((byte) 'l').put((byte) 'l').put((byte) 'o');</Java>
            <img className={'center-horizontally-relative'} src={channel2}
                 alt={'Channel structure: after putting avalue'}/>

            <Java> buf.put(0, (byte) 'M').put((byte) 'w');</Java>
            <img className={'center-horizontally-relative'} src={channel3} alt={'Channel structure: after altering'}/>

            <Java> {`
                buf.get(); //returns empty string as it reads from position till limit.
                /*By setting position to 0, we can start reading from the start, then we don't know the length to read,
                 so it would be better to set limit = position and then position = 0. This is where flip comes in*/
                
                buf.flip(); // () -> {limit = position; position=0;}`}
            </Java>
            <img className={'center-horizontally-relative'} src={channel4} alt={'Channel structure: after flip'}/>
            <Java>{`
                while (buf.hasRemaining())
                    System.out.println((char) buf.get());

                //other methods:
                buf.rewind(); //()→position=0;
                buf.clear(); //rest buffer`}
            </Java>

            <p>
                There are some implementations of Buffer available for different data types:
                <img className={'center-horizontally-relative'} src={buffers} alt={'some implementation of Buffer'}/>
            </p>

            <Java>
                {`
                /*
                 * Buffer is a high level tool, so we can only operate on buffer and it affects the file.
                 * One of benefits is bulk job instead of single character.
                 */
                public static void writeToFileUsingBuffer(String path, String data) {
                    try (FileWriter writer = new FileWriter(path, StandardCharsets.UTF_8);
                        BufferedWriter bufferedWriter = new BufferedWriter(writer)) {
                        bufferedWriter.write(data);
                        bufferedWriter.flush();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                
                public static void readFromFileUsingBuffer(String path) {
                    StringBuilder sb = new StringBuilder(100);
                    try (FileReader reader = new FileReader(path, StandardCharsets.UTF_8);
                        BufferedReader bufferedReader = new BufferedReader(reader)) {
                        char[] chars = new char[10];
                        int count;
                        while ((count = bufferedReader.read(chars)) != -1) //we also have bufferReader.readLine();
                        sb.append(chars, 0, count);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    System.out.println(sb);
                }`}
            </Java>

            <HorizontalLine/>

            <span className={'blue bold'}>Channel:</span> It is an autoCloseable interface by which you can transfer
            data between entity and buffer easily via a buffer. There is AsynchronousByteChannel available to do async
            job too (NIO2 technology). You may provide CompletionHandler to get notified when operation is completed.
            <div className={'float-holder center-horizontally-relative'}>
                <img src={channels} alt={'some implementation of Channel'}/>
                <Float l={300} t={360} lineTo={[600, 341]}>
                    <div className={'small'} style={{width: '220px'}}>To send & recieve packets over UDP connection
                    </div>
                </Float>
                <Float l={750} t={150} lineTo={[730, 195]}>
                    <div className={'small'} style={{width: '170px'}}>A channel that can be multiplexed via a Selector
                    </div>
                </Float>
            </div>
            <Java>
                {`
                public void writeToFileUsingFileChannel(String path, String data) throws IOException {
                    try (RandomAccessFile stream = new RandomAccessFile(path, "w");
                         FileChannel channel = stream.getChannel();) {
            
                        byte[] strBytes = data.getBytes(StandardCharsets.UTF_8);
                        ByteBuffer buffer = ByteBuffer.allocate(strBytes.length);
            
                        buffer.put(strBytes);
                        buffer.flip();
                        channel.write(buffer);
                    }
                }
            
                public String readFromFileUsingFileChannel(String path) throws IOException {
                    try (RandomAccessFile stream = new RandomAccessFile(path, "r");
                         FileChannel channel = stream.getChannel();) {
                        StringBuilder sb = new StringBuilder(200);
                        Charset charset = Charset.forName("UTF-8");
                        
                        ByteBuffer buffer = ByteBuffer.allocate(20);
                        while (channel.read(buffer) > 0) {
                            buffer.rewind();
                            sb.append(charset.decode(buffer));
                            buffer.flip();
                        }
                        return sb.toString();
                    }
                }`}
            </Java>
        </Frame>
    )
}