import React from "react";
import {Frame} from "../../components/blocks";
import {Bold, Bullet} from "../../components/components";

export function RegexCheats() {
    return (
        <>
            {getBasics()}
            {getQualifiers()}
            {getJavaMethods()}

        </>
    )
}

function getBasics() {
    return (
        <Frame>
            <span style={{
                color: '#fcc520',
                fontWeight: 'bold',
                fontSize: '20px',
                margingBottom: '10px'
            }}>Character classes</span><br/>
            <Bullet title={'[abc]'}>matches <Bold>a</Bold> or <Bold>b</Bold> or <Bold>c</Bold>.</Bullet>
            <Bullet title={'[^abc]'}>negation, matches every thing
                except <Bold>a</Bold>, <Bold>b</Bold> or <Bold>c</Bold>.</Bullet>
            <Bullet title={'[a-c]'}>range, matches <Bold>a</Bold> or <Bold>b</Bold>, or <Bold>c</Bold>.</Bullet>
            <Bullet title={'[a-c[f-h]]'}>union,
                matches <Bold>a</Bold>, <Bold>b</Bold>, <Bold>c</Bold>, <Bold>f</Bold>, <Bold>g</Bold>, <Bold>h</Bold>.</Bullet>
            <Bullet title={'[a-c&&[b-c]]'}>intersection, matches <Bold>b</Bold> or <Bold>c</Bold>.</Bullet>
            <Bullet title={'[a-c&&[^b-c]]'}>subtraction, matches <Bold>a</Bold>.</Bullet>
            <br/><br/>
            <span style={{
                color: '#dea726',
                fontWeight: 'bold',
                fontSize: '20px',
                margingBottom: '10px'
            }}>Predefined character classes</span><br/>
            <Bullet title={'.'}>Any character.</Bullet>
            <Bullet title={'\\d'}>A digit: <Bold>[0-9]</Bold></Bullet>
            <Bullet title={'\\D'}>A non-digit: <Bold>[^0-9]</Bold></Bullet>
            <Bullet title={'\\s'}>A whitespace character: <Bold>[ \t\n\x0B\f\r]</Bold></Bullet>
            <Bullet title={'\\S'}>A non-whitespace character: <Bold>[^\s]</Bold></Bullet>
            <Bullet title={'\\w'}>A word character: <Bold>[a-zA-Z_0-9]</Bold></Bullet>
            <Bullet title={'\\W'}>A non-word character: <Bold>[^\w]</Bold></Bullet>
            <br/><br/>
            <span style={{
                color: '#a76e1e',
                fontWeight: 'bold',
                fontSize: '20px',
                margingBottom: '10px'
            }}>Boundary matches</span><br/>
            <Bullet title={'^'}>The beginning of a line.</Bullet>
            <Bullet title={'$'}>The end of a line.</Bullet>
            <Bullet title={'\\b'}>A word boundary.</Bullet>
            <Bullet title={'\\B'}>A non-word boundary.</Bullet>
            <Bullet title={'\\A'}>The beginning of the input.</Bullet>
            <Bullet title={'\\G'}>The end of the previous match.</Bullet>
            <Bullet title={'\\Z'}>The end of the input but for the final terminator, if any.</Bullet>
            <Bullet title={'\\z'}>The end of the input.</Bullet>
            <br/><br/>
            <span style={{
                color: '#e14c20',
                fontWeight: 'bold',
                fontSize: '20px',
                margingBottom: '10px'
            }}>Look around</span><br/>
            <Bullet
                title={'(?=x)'}> Lookahead - Asserts that what immediately follows the current position in the string
                is <Bold>x</Bold></Bullet>
            <Bullet title={'(?<=x)'}> Lookbehind - Asserts that what immediately precedes the current position in the
                string is <Bold>x</Bold></Bullet>
            <Bullet title={'(?!x)'}> Negative Lookahead - Asserts that what immediately follows the current position
                in the string is not <Bold>x</Bold></Bullet>
            <Bullet title={'(?<!x)'}> Negative Lookbehind - Asserts that what immediately precedes the current
                position in the string is not <Bold>x</Bold></Bullet>
            <br/><br/>
            <span style={{
                color: '#f16738',
                fontWeight: 'bold',
                fontSize: '20px',
                margingBottom: '10px'
            }}>Pattern flags</span><br/>
            <Bold>Pattern.CASE_INSENSITIVE</Bold> - enables case-insensitive matching.<br/>
            <Bold>Pattern.COMMENTS</Bold> - whitespace and comments starting with <Bold>#</Bold> are ignored until the
            end of a line.<br/>
            <Bold>Pattern.MULTILINE</Bold> - one expression can match multiple lines.<br/>
            <Bold>Pattern.UNIX_LINES</Bold> - only the '<Bold>\n</Bold>' line terminator is recognized in the behavior
            of <Bold>.</Bold>, <Bold>^</Bold> and <Bold>$</Bold>
        </Frame>
    )
}

function getJavaMethods() {
    return (
        <Frame>
                                <span style={{
                                    color: '#8fc647',
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    margingBottom: '10px'
                                }}>Useful java classes & methods</span>
            <br/><br/>
            <span style={{
                color: '#79a546',
                // fontWeight: 'bold',
                fontSize: '20px',
                margingBottom: '10px'
            }}>Pattern</span>
            <br/>
            A pattern is a compiler representation of a regular expression.
            <br/><br/>
            <Bold>Pattern compile (String regex)</Bold><br/>
            Compiles the given regular expression into a pattern.
            <br/><br/>
            <Bold>Pattern compile (String regex, int flags)</Bold><br/>
            Compiles the given regular expression into a pattern with the given flags.
            <br/><br/>
            <Bold>boolean matches(String regex)</Bold><br/>
            Tell whether or not this string matches the given regular expression.
            <br/><br/>
            <Bold>String[] split(CharacterSequence input)</Bold><br/>
            Splits the given input sequence aroung matches of this pattern.
            <br/><br/>
            <Bold>String quote(String s)</Bold><br/>
            Returns a literal pattern String of the specified String.
            <br/><br/>
            <Bold>Predicate{'<String>'} asPredicate()</Bold><br/>
            Creates a predicate which can used to match a string.
            <br/><br/>
            <span style={{
                color: '#44751c',
                // fontWeight: 'bold',
                fontSize: '20px',
                margingBottom: '10px'
            }}>Matcher</span>
            <br/>
            An engine that performs match operations on a character sequence by interpreting a Pattern.
            <br/><br/>
            <Bold>boolean matches()</Bold><br/>
            Attempts to match the entire region against the pattern.
            <br/><br/>
            <Bold>boolean find()</Bold><br/>
            Attempts to find the next subsequence of the input sequence that matches the pattern.
            <br/><br/>
            <Bold>int start()</Bold><br/>
            Returns the start index of the previous match.
            <br/><br/>
            <Bold>int end()</Bold><br/>
            Returns the offset after the last character matched.
        </Frame>
    )
}

function getQualifiers() {
    return (
        <Frame>
                                <span style={{
                                    color: '#71b1cc',
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                }}>Qualifiers</span>
            <br/>
            <table className={'customTbl1'}>
                <thead>
                <tr>
                    <th>Greedy</th>
                    <th>Reluctant</th>
                    <th>Possessive</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>X?</td>
                    <td>X??</td>
                    <td>X?+</td>
                    <td>X, once or not at all</td>
                </tr>
                <tr>
                    <td>X*</td>
                    <td>X*?</td>
                    <td>X*+</td>
                    <td>X, zero or more times.</td>
                </tr>
                <tr>
                    <td>X+</td>
                    <td>X+?</td>
                    <td>X++</td>
                    <td>X, one or more times</td>
                </tr>
                <tr>
                    <td>X{'{n}'}</td>
                    <td>X{'{n}'}?</td>
                    <td>X{'{n}'}+</td>
                    <td>X, exactly n times.</td>
                </tr>
                <tr>
                    <td>X{'{n,}'}</td>
                    <td>X{'{n,}'}?</td>
                    <td>X{'{n,}'}+</td>
                    <td>X, at least n times.</td>
                </tr>
                <tr>
                    <td>X{'{n,m}'}</td>
                    <td>X{'{n,m}'}?</td>
                    <td>X{'{n,m}'}+</td>
                    <td>X, at least n but not more than m times.</td>
                </tr>
                </tbody>
            </table>
            <br/>
            <Bold>Greedy - </Bold>matches the longest matching group.<br/>
            <Bold>Reluctant - </Bold>matches the shortest group.<br/>
            <Bold>Possessive - </Bold>longest match or bust (no backoff).
            <br/><br/><br/>
            <span style={{
                color: '#5f99af',
                fontWeight: 'bold',
                fontSize: '20px',
            }}>Groups & backreference</span>
            <br/>
            A group is a captured subsequence of characters which may be used later in the expression with a
            backreference.
            <br/><br/>
            <Bullet title={'(...)'}>defines a group.</Bullet>
            <Bullet title={'\\N'}>refers to a matched group.</Bullet>
            <br/>
            <Bullet title={'(\\d\\d)'}>a group of two digits.</Bullet>
            <Bullet title={'(\\d\\d)/\\1'}>two digits repeated twice.</Bullet>
            <Bullet title={'\\1'}>refers to the matched group.</Bullet>
            <br/><br/>
            <span style={{
                color: '#4b7792',
                fontWeight: 'bold',
                fontSize: '20px',
            }}>Logical operations</span>
            <br/>
            <Bullet title={'XY'}><Bold>X</Bold> then <Bold>Y</Bold></Bullet>
            <Bullet title={'X|Y'}><Bold>X</Bold> or <Bold>Y</Bold></Bullet>
        </Frame>
    )
}