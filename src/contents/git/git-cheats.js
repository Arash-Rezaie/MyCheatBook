import {Frame} from "../../components/blocks";
import React from "react";
import workFlow from "../../res/images/git-work-flow.png";
import {InfoIcon} from "../../components/bubble";
import {Blue, Bold, Bullet, Title2, HorizontalLine, Purple, Title1} from "../../components/components";
import {DrawBoxHandler} from "./draw-box-handler";
import {DrawBoxComponent} from "./git-components";
import {Float} from "../../components/float";

export function GitCheats() {
    return (
        <>
            {getGitWorkFlow()}
            {getVisualizeBasicCommands()}
            {getConnectingToRemoteRepo()}
            {getCommands()}
            {/*{get()}*/}
        </>
    )
}

function getCommands() {
    return (
        <Frame title={'Commands cheat'}>
            <div className={'grid-git-sheet hidden-scroll-all'}>
                <table>
                    <thead>
                    <tr>
                        <td colSpan={2}>GIT BASICS</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>git init <blue>{'<directory>'}</blue></td>
                        <td>
                            Create empty Git repo in specified directory. Run with no arguments to initialize the
                            current directory as a git repository.
                        </td>
                    </tr>
                    <tr>
                        <td>git clone {'<repo>'}</td>
                        <td>
                            Clone repo located at {'<repo>'} onto local machine. Original repo can be located on the
                            local filesystem or on a remote machine via HTTP or SSH .
                        </td>
                    </tr>
                    <tr>
                        <td>git config<br/>user.name {'<name>'}</td>
                        <td>
                            Define author name to be used for all commits in current repo. Devs commonly use --global
                            flag to set config options for current user.
                        </td>
                    </tr>
                    <tr>
                        <td>git add {'<directory>'}</td>
                        <td>
                            Stage all changes in {'<directory>'} for the next commit. Replace {'<directory>'} with
                            a {'<file>'} to change a specific file.
                        </td>
                    </tr>
                    <tr>
                        <td>git commit -m "{'message'}"</td>
                        <td>
                            Commit the staged snapshot, but instead of launching a text editor, use {'<message>'} as the
                            commit message.
                        </td>
                    </tr>
                    <tr>
                        <td>git status</td>
                        <td>
                            List which files are staged, unstaged, and untracked.
                        </td>
                    </tr>
                    <tr>
                        <td>git log</td>
                        <td>
                            Display the entire commit history using the default format. For customization see additional
                            options.
                        </td>
                    </tr>
                    <tr>
                        <td>git diff</td>
                        <td>
                            Show unstaged changes between your index and working directory.
                        </td>
                    </tr>
                    </tbody>
                </table>
                {/*--------------------------------------------------*/}
                <div>
                    <table>
                        <thead>
                        <tr>
                            <td colSpan={2}>GIT BRANCHES</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>git branch</td>
                            <td>
                                List all of the branches in your repo. Add a {'<branch>'} argument to create a new
                                branch
                                with the name {'<branch>'}.
                            </td>
                        </tr>
                        <tr>
                            <td>git checkout -b {'<branch>'}</td>
                            <td>
                                Create and check out a new branch named {'<branch>'}. Drop the -b flag to checkout an
                                existing branch.
                            </td>
                        </tr>
                        <tr>
                            <td>git merge {'<branch>'}</td>
                            <td>
                                Merge {'<branch>'} into the current branch.
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table>
                        <thead>
                        <tr>
                            <td colSpan={2}>REWRITING GIT HISTORY</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>git commit --amend</td>
                            <td>
                                Replace the last commit with the staged changes and last commit combined. Use with
                                nothing
                                staged to edit the last commit’s message.
                            </td>
                        </tr>
                        <tr>
                            <td>git rebase {'<base>'}</td>
                            <td>
                                Rebase the current branch onto {'<base>'}. {'<base>'} can be a commit ID, branch name, a
                                tag, or a relative reference to HEAD .
                            </td>
                        </tr>
                        <tr>
                            <td>git reflog</td>
                            <td>
                                Show a log of changes to the local repository’s HEAD. Add --relative-date flag to show
                                date
                                info or --all to show all refs.
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                {/*--------------------------------------------------*/}
                <table>
                    <thead>
                    <tr>
                        <td colSpan={2}>UNDOING CHANGES</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>git revert {'<commit>'}</td>
                        <td>
                            Create new commit that undoes all of the changes made in {'<commit>'} , then apply it to
                            the
                            current branch.
                        </td>
                    </tr>
                    <tr>
                        <td>git reset {'<file>'}</td>
                        <td>
                            Remove {'<file>'} from the staging area, but leave the working directory unchanged. This
                            unstages a file without overwriting any changes.
                        </td>
                    </tr>
                    <tr>
                        <td>git clean -n</td>
                        <td>
                            Shows which files would be removed from working directory. Use the -f flag in place of
                            the
                            -n flag to execute the clean.
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                    <tr>
                        <td colSpan={2}>REMOTE REPOSITORIES</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>git remote add {'<name>'} {'<url>'}</td>
                        <td>
                            Create a new connection to a remote repo. After adding a remote, you can use {'<name>'} as a
                            shortcut for {'<url>'} in other commands.
                        </td>
                    </tr>
                    <tr>
                        <td>git fetch {'<remote>'} {'<branch>'}</td>
                        <td>
                            Fetches a specific {'<branch>'} , from the repo. Leave off {'<branch>'} to fetch all remote
                            refs. It does not change any workspace file.
                        </td>
                    </tr>
                    <tr>
                        <td>git pull {'<remote>'}</td>
                        <td>
                            Fetch the specified remote’s copy of current branch and immediately merge it into the local
                            copy.
                        </td>
                    </tr>
                    <tr>
                        <td>git push {'<remote>'} {'<branch>'}</td>
                        <td>
                            Push the branch to {'<remote>'} , along with necessary commits and objects. Creates named
                            branch in the remote repo if it doesn’t exist.
                        </td>
                    </tr>
                    </tbody>
                </table>
                {/*--------------------------------------------------*/}
                <table>
                    <thead>
                    <tr>
                        <td colSpan={2}>GIT CONFIG</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>git config --global user.name {'<name>'}</td>
                        <td>
                            Define the author name to be used for all commits by the current user.
                        </td>
                    </tr>
                    <tr>
                        <td>git config --global user.email {'<email>'}</td>
                        <td>
                            Define the author email to be used for all commits by the current user.
                        </td>
                    </tr>
                    <tr>
                        <td>git config --global alias. {'<alias-name>'} {'<git-command>'}</td>
                        <td>
                            Create shortcut for a Git command. E.g. alias.glog “log --graph --oneline” will set ”git
                            glog” equivalent to ”git log --graph --oneline.
                        </td>
                    </tr>
                    <tr>
                        <td>git config --system core.editor {'<editor>'}</td>
                        <td>
                            Set text editor used by commands for all users on the machine. {'<editor>'} arg should be
                            the command that launches the desired editor (e.g., vi).
                        </td>
                    </tr>
                    <tr>
                        <td>git config --global --edit</td>
                        <td>
                            Open the global configuration file in a text editor for manual editing.
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <td colSpan={2}>GIT DIFF</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>git diff HEAD</td>
                            <td>
                                Show difference between working directory and last commit.
                            </td>
                        </tr>
                        <tr>
                            <td>git diff --cached</td>
                            <td>
                                Show difference between staged changes and last commit
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table>
                        <thead>
                        <tr>
                            <td colSpan={2}>GIT RESET</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>git reset</td>
                            <td>
                                Reset staging area to match most recent commit, but leave the working directory
                                unchanged.
                            </td>
                        </tr>
                        <tr>
                            <td>git reset --hard</td>
                            <td>
                                Reset staging area and working directory to match most recent commit and overwrites all
                                changes in the working directory.
                            </td>
                        </tr>
                        <tr>
                            <td>git reset {'<commit>'}</td>
                            <td>
                                Move the current branch tip backward to {'<commit>'} , reset the staging area to match,
                                but
                                leave the working directory alone.
                            </td>
                        </tr>
                        <tr>
                            <td>git reset --hard {'<commit>'}</td>
                            <td>
                                Same as previous, but resets both the staging area & working directory to match. Deletes
                                uncommitted changes, and all commits after {'<commit>'}.
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                {/*--------------------------------------------------*/}
                <table>
                    <thead>
                    <tr>
                        <td colSpan={2}>GIT LOG</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>git log {'<-limit>'}</td>
                        <td>
                            Limit number of commits by {'<limit>'}. E.g. ”git log -5” will limit to 5 commits.
                        </td>
                    </tr>
                    <tr>
                        <td>git log --online</td>
                        <td>
                            Condense each commit to a single line.
                        </td>
                    </tr>
                    <tr>
                        <td>git log p</td>
                        <td>
                            Display the full diff of each commit.
                        </td>
                    </tr>
                    <tr>
                        <td>git log --stat</td>
                        <td>
                            Include which files were altered and the relative number of lines that were added or deleted
                            from each of them.
                        </td>
                    </tr>
                    <tr>
                        <td>git log --author="{'<pattern>'}"</td>
                        <td>
                            Search for commits by a particular author.
                        </td>
                    </tr>
                    <tr>
                        <td>git log --grep="{'<pattern>'}"</td>
                        <td>
                            Search for commits with a commit message that matches {'<pattern>'}.
                        </td>
                    </tr>
                    <tr>
                        <td>git log<br/> {'<since>..<untli>'}</td>
                        <td>
                            Show commits that occur between {'<since>'} and {'<until>'}. Args can be a commit ID, branch
                            name, HEAD , or any other kind of revision reference.
                        </td>
                    </tr>
                    <tr>
                        <td>git log -- {'<file>'}</td>
                        <td>
                            Only display commits that have the specified file.
                        </td>
                    </tr>
                    <tr>
                        <td>git log --graph --decorate</td>
                        <td>
                            --graph flag draws a text based graph of commits on left side of commit msgs. --decorate
                            adds names of branches or tags of commits shown.
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <td colSpan={2}>GIT REBASE</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>git -i {'<base>'}</td>
                            <td>
                                Interactively rebase current branch onto {'<base>'}. Launches editor to enter commands
                                for
                                how each commit will be transferred to the new base.
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table>
                        <thead>
                        <tr>
                            <td colSpan={2}>GIT PULL</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>git pull --rebase {'<remote>'}</td>
                            <td>
                                Fetch the remote’s copy of current branch and rebases it into the local copy. Uses git
                                rebase instead of merge to integrate the branches.
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table>
                        <thead>
                        <tr>
                            <td colSpan={2}>GIT PUSH</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>git push {'<remote>'} --force</td>
                            <td>
                                Forces the git push even if it results in a non-fast-forward merge. Do not use the
                                --force
                                flag unless you’re absolutely sure you know what you’re doing.
                            </td>
                        </tr>
                        <tr>
                            <td>git push {'<remote>'} --all</td>
                            <td>
                                Push all of your local branches to the specified remote.
                            </td>
                        </tr>
                        <tr>
                            <td>git push {'<remote>'} --tags</td>
                            <td>
                                Tags aren’t automatically pushed when you push a branch or use the --all flag. The
                                --tags
                                flag sends all of your local tags to the remote repo.
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Frame>
    )
}

function getGitWorkFlow() {
    return (
        <Frame title={'Work flow'}>
            <InfoIcon>
                <Bullet title={'Stash:'}>It is a temporary memory. For example, you are in the middle of something, then
                    something else comes up and you have to jump over it. This is where stash comes in and you can store
                    your changes there temporarily</Bullet>
                <Bullet title={'Workspace:'}>The working directory</Bullet>
                <Bullet title={'Indexed:'}>The state of being watched by git</Bullet>
                <Bullet title={'Local Repository:'}>The place in which git stores snapshots</Bullet>
                <Bullet title={'Remote Repository:'}>This repository is on a server</Bullet>
            </InfoIcon>
            Git is a Version Control System (VCS) <Purple>"some call it Revision Control System"</Purple>. In fact, it
            is
            a container for files with the ability of tracking file history, so whenever you are willing to catch a
            specific version of a file, git is able to provide that file.
            <p>
                Git does tracking by making hash-code out of any file. When file changes, the generated hash-code
                changes too, then git stores it and ignores unchanged files.
            </p>
            <p>
                You have to command git to do what you desire, via some provided facilities such as:<br/>
                <Bullet title={'⚫'}>to make git aware of changes use <Bold>add</Bold> and <Bold>commit</Bold></Bullet>
                <Bullet title={'⚫'}>to access a file from git use <Bold>checkout</Bold></Bullet>
                <Bullet title={'⚫'}>to combine files use <Bold>merge</Bold></Bullet>
                <Bullet title={'⚫'}>to send files to the remote repo use <Bold>push</Bold></Bullet>
                <Bullet title={'⚫'}>to retrieve files from the remote repo use <Bold>pull</Bold></Bullet>
                <Bullet title={'⚫'}>to sync local repo and the remote repo use <Bold>fetch</Bold></Bullet>
            </p>
            <br/><br/>
            <img src={workFlow} alt={'git workflow'}/>
        </Frame>
    )
}

function getVisualizeBasicCommands() {
    return (
        <Frame title={'Visualization of some commands'}>
            Git manages snapshots via a tree data structure. This part gives you a visualization of some events in
            it.<br/><br/>
            You can also use a visualization tool to come over git scenarios such as
            <a href={'https://learngitbranching.js.org/'}
               style={{marginLeft: '3px'}}><Blue>https://learngitbranching.js.org</Blue></a> or
            <a href={'https://git-school.github.io/visualizing-git/'}
               style={{marginLeft: '3px'}}><Blue>https://git-school.github.io/visualizing-git</Blue></a>
            <Title1>Basic commands:</Title1>
            <div className={'flex-row'}>
                <DrawBoxComponent wh={[340, 250]} shapeFactory=
                    {
                        new DrawBoxHandler()
                            .addShape({shape: 'node', id: 'c0', label: 'c0', pos: [30, 30]})
                            .addShape({
                                shape: 'node', id: 'c1', label: 'c1', align: 'c0', offset: [0, 90], conn: 'c0',
                                captions: [{t: 'main', w: 40, c: 'orange'}, {t: 'HEAD', w: 40, c: 'green'}]
                            })
                            .addShape({
                                shape: 'hvect', id: 'l0', align: 'c0', offset: [80, 90], len: 100,
                                label: 'git commit'
                            })
                            .addShape({shape: 'node', id: 'c2', label: 'c0', align: 'l0', offset: [90, -90]})
                            .addShape({
                                shape: 'node', id: 'c3', label: 'c1', align: 'c2', offset: [0, 90], conn: 'c2',
                            })
                            .addShape({
                                shape: 'node', id: 'c4', label: 'c2', align: 'c3', offset: [0, 90], conn: 'c3',
                                captions: [{t: 'main', w: 40, c: 'orange'}, {t: 'HEAD', w: 40, c: 'green'}]
                            })
                    }>
                    <Title2>commit:</Title2> Each commit creates a node pointing to its previous one.<br/>
                </DrawBoxComponent>
                <DrawBoxComponent wh={[740, 170]} shapeFactory=
                    {
                        new DrawBoxHandler()
                            .addShape({shape: 'node', id: 'c0', label: 'c0', pos: [30, 30]})
                            .addShape({
                                shape: 'node', id: 'c1', label: 'c1', align: 'c0', offset: [0, 90], conn: 'c0',
                                captions: [{t: 'main*', w: 40, c: 'orange'}, {t: 'HEAD', w: 40, c: 'green'}]
                            })
                            .addShape({
                                shape: 'hvect', id: 'l0', align: 'c0', offset: [80, 90], len: 160,
                                label: 'git branch newBranch'
                            })
                            .addShape({shape: 'node', id: 'c2', label: 'c0', align: 'l0', offset: [110, -90]})
                            .addShape({
                                shape: 'node', id: 'c3', label: 'c1', align: 'c2', offset: [0, 90], conn: 'c2',
                                captions: [{t: 'main*', w: 40, c: 'orange'}, {t: 'newBranch', w: 80, c: 'purple'},
                                    {t: 'HEAD', w: 40, c: 'green'},]
                            })
                            .addShape({
                                shape: 'hvect', id: 'l1', align: 'c2', offset: [120, 90], len: 160,
                                label: 'git checkout newBranch'
                            })
                            .addShape({shape: 'node', id: 'c4', label: 'c0', align: 'l1', offset: [110, -90]})
                            .addShape({
                                shape: 'node', id: 'c5', label: 'c1', align: 'c4', offset: [0, 90], conn: 'c4',
                                captions: [{t: 'main', w: 40, c: 'orange'}, {t: 'newBranch*', w: 80, c: 'purple'},
                                    {t: 'HEAD', w: 40, c: 'green'},]
                            })
                    }>
                    <Title2>branch:</Title2> A branch is simply a pointer to a specific commit. <Blue>'HEAD' always
                    points to the current commit</Blue><br/>
                    <Title2>checkout:</Title2> switch to a specific branch with its <Bold>name</Bold> or
                    its <Bold>hashcode</Bold> (see '*' after branch name).<br/>
                </DrawBoxComponent>
                <DrawBoxComponent wh={[640, 340]} shapeFactory=
                    {
                        new DrawBoxHandler()
                            .addShape({shape: 'node', id: 'c0', label: 'c0', pos: [100, 30]})
                            .addShape({shape: 'node', id: 'c1', label: 'c1', align: 'c0', offset: [0, 90], conn: 'c0'})
                            .addShape({
                                shape: 'node', id: 'c2', label: 'c2', align: 'c1', offset: [-70, 90], conn: 'c1',
                                captions: {t: 'myBranch', w: 60, c: 'pink'}
                            })
                            .addShape({
                                shape: 'node', id: 'c3', label: 'c3', align: 'c1', offset: [70, 90], conn: 'c1',
                                captions: [{t: 'main', w: 40, c: 'orange'}, {t: 'HEAD', w: 40, c: 'green'}]
                            })
                            .addShape({
                                shape: 'hvect', id: 'l0', align: 'c3', offset: [80, 0], len: 130,
                                label: 'git merge myBranch'
                            })
                            .addShape({shape: 'node', id: 'c4', label: 'c0', align: 'l0', offset: [170, -180]})
                            .addShape({shape: 'node', id: 'c5', label: 'c1', align: 'c4', offset: [0, 90], conn: 'c4'})
                            .addShape({
                                shape: 'node', id: 'c6', label: 'c2', align: 'c5', offset: [-70, 90], conn: 'c5',
                                captions: {t: 'myBranch', w: 60, c: 'pink'}
                            })
                            .addShape({shape: 'node', id: 'c7', label: 'c3', align: 'c5', offset: [70, 90], conn: 'c5'})
                            .addShape({
                                shape: 'node', id: 'c8', label: 'c4', align: 'c7', offset: [0, 90], conn: 'c7',
                                captions: [{t: 'main', w: 40, c: 'orange'}, {t: 'HEAD', w: 40, c: 'green'}]
                            })
                            .addShape({shape: 'vect', between: ['c8', 'c6', 5], strokeStyle: [20, 10]})
                    }>
                    <Title2>merge:</Title2> mix two different branches. The target branch will me mixed up with the
                    current one.<br/>
                </DrawBoxComponent>
                <DrawBoxComponent wh={[650, 430]} shapeFactory=
                    {
                        new DrawBoxHandler()
                            .addShape({shape: 'node', id: 'c0', label: 'c0', pos: [100, 30]})
                            .addShape({shape: 'node', id: 'c1', label: 'c1', align: 'c0', offset: [0, 90], conn: 'c0'})
                            .addShape({
                                shape: 'node', id: 'c2', label: 'c2', align: 'c1', offset: [-70, 90], conn: 'c1',
                            })
                            .addShape({
                                shape: 'node', id: 'c3', label: 'c3', align: 'c2', offset: [0, 90], conn: 'c2',
                                captions: [{t: 'myBranch', w: 70, c: 'pink'}, {t: 'HEAD', w: 40, c: 'green'}]
                            })
                            .addShape({
                                shape: 'node', id: 'c4', label: 'c4', align: 'c1', offset: [70, 90], conn: 'c1',
                                captions: [{t: 'main', w: 40, c: 'orange'}]
                            })
                            .addShape({
                                shape: 'hvect', id: 'l0', align: 'c4', offset: [80, 0], len: 110,
                                label: 'git rebase main'
                            })
                            .addShape({shape: 'node', id: 'c5', label: 'c0', align: 'l0', offset: [160, -180]})
                            .addShape({shape: 'node', id: 'c6', label: 'c1', align: 'c5', offset: [0, 90], conn: 'c5'})
                            .addShape({
                                shape: 'node', id: 'c7', label: 'c2', align: 'c6', offset: [-70, 90], conn: 'c6',
                                strokeStyle: [5, 3]
                            })
                            .addShape({
                                shape: 'node', id: 'c8', label: 'c3', align: 'c7', offset: [0, 90], conn: 'c7',
                                strokeStyle: [5, 3]
                            })
                            .addShape({
                                shape: 'node', id: 'c9', label: 'c4', align: 'c6', offset: [70, 90], conn: 'c6',
                                captions: [{t: 'main', w: 40, c: 'orange'}]
                            })
                            .addShape({
                                shape: 'node', id: 'c10', label: 'c2՛', align: 'c9', offset: [0, 90], conn: 'c9',
                            })
                            .addShape({
                                shape: 'node', id: 'c11', label: 'c3՛', align: 'c10', offset: [0, 90], conn: 'c10',
                                captions: [{t: 'myBranch', w: 70, c: 'pink'}, {t: 'HEAD', w: 40, c: 'green'}]
                            })
                            .addShape({
                                shape: 'vect', between: ['c7', 'c10', 5],
                                label: {shape: 'text', label: 'copy', offset: [5, -5]}, color: 'red', arrow: [1, 1]
                            })
                            .addShape({
                                shape: 'vect', between: ['c8', 'c11', 5],
                                label: {shape: 'text', label: 'copy', offset: [5, -5]}, color: 'red', arrow: [1, 1]
                            })
                            .addShape({
                                shape: 'cap', id: 't0', align: 'c7', offset: [-100, 30], width: 50, height: 20,
                                label: {shape: 'text', label: 'still exist', color: 'red'}
                            })
                            .addShape({shape: 'line', between: ['t0', 'c7'], color: 'red'})
                            .addShape({shape: 'line', between: ['t0', 'c8'], color: 'red'})
                    }>
                    <Title2>rebase:</Title2> alter current history line. It copies commits till a common history<br/>
                </DrawBoxComponent>
            </div>
            <Title1>Moving around:</Title1>
            <div className={'flex-row'}>
                <DrawBoxComponent wh={[860, 340]} shapeFactory=
                    {
                        new DrawBoxHandler()
                            .addShape({shape: 'node', id: 'c0', label: 'c0', pos: [30, 30]})
                            .addShape({shape: 'node', id: 'c1', label: 'c1', align: 'c0', offset: [0, 90], conn: 'c0'})
                            .addShape({shape: 'node', id: 'c2', label: 'c2', align: 'c1', offset: [0, 90], conn: 'c1'})
                            .addShape({
                                shape: 'node', id: 'c3', label: 'c3', align: 'c2', offset: [0, 90], conn: 'c2',
                                captions: [{t: 'main', w: 40, c: 'orange'}, {t: 'HEAD', w: 40, c: 'green'}]
                            })
                            .addShape({
                                shape: 'hvect', id: 'l0', align: 'c1', offset: [80, 50], len: 130,
                                label: 'git checkout main^'
                            })
                            .addShape({shape: 'node', id: 'c4', label: 'c0', align: 'l0', offset: [100, -140]})
                            .addShape({shape: 'node', id: 'c5', label: 'c1', align: 'c4', offset: [0, 90], conn: 'c4'})
                            .addShape({
                                shape: 'node', id: 'c6', label: 'c2', align: 'c5', offset: [0, 90], conn: 'c5',
                                captions: {t: 'HEAD', w: 40, c: 'green'}
                            })
                            .addShape({
                                shape: 'node', id: 'c7', label: 'c3', align: 'c6', offset: [0, 90], conn: 'c6',
                                captions: {t: 'main', w: 40, c: 'orange'}
                            })
                            .addShape({
                                shape: 'hvect', id: 'l1', align: 'c5', offset: [80, 50], len: 130,
                                label: 'git checkout HEAD^'
                            })
                            .addShape({shape: 'node', id: 'c8', label: 'c0', align: 'l1', offset: [110, -140]})
                            .addShape({
                                shape: 'node', id: 'c9', label: 'c1', align: 'c8', offset: [0, 90], conn: 'c8',
                                captions: {t: 'HEAD', w: 40, c: 'green'}
                            })
                            .addShape({shape: 'node', id: 'c10', label: 'c2', align: 'c9', offset: [0, 90], conn: 'c9'})
                            .addShape({
                                shape: 'node', id: 'c11', label: 'c3', align: 'c10', offset: [0, 90], conn: 'c10',
                                captions: {t: 'main', w: 40, c: 'orange'}
                            })
                            .addShape({
                                shape: 'hvect', id: 'l2', align: 'c9', offset: [80, 50], len: 130,
                                label: 'git checkout main~3'
                            })
                            .addShape({
                                shape: 'node', id: 'c12', label: 'c0', align: 'l2', offset: [100, -140],
                                captions: {t: 'HEAD', w: 40, c: 'green'}
                            })
                            .addShape({
                                shape: 'node', id: 'c13', label: 'c1', align: 'c12', offset: [0, 90], conn: 'c12'
                            })
                            .addShape({
                                shape: 'node', id: 'c14', label: 'c2', align: 'c13', offset: [0, 90], conn: 'c13'
                            })
                            .addShape({
                                shape: 'node', id: 'c15', label: 'c3', align: 'c14', offset: [0, 90], conn: 'c14',
                                captions: {t: 'main', w: 40, c: 'orange'}
                            })
                    }>
                    <Title2>relative movement:</Title2>
                    Relative commits are powerful, but we will introduce two simple ones here:<br/><br/>
                    <Bullet title={'1.'}>Moving upwards one commit at a time with {'^'}</Bullet>
                    <Bullet title={'2.'}>Moving upwards a number of times with {'~<num>'}</Bullet>
                </DrawBoxComponent>
                <DrawBoxComponent wh={[400, 250]} shapeFactory=
                    {
                        new DrawBoxHandler()
                            .addShape({shape: 'node', id: 'c0', label: 'c0', pos: [30, 30]})
                            .addShape({shape: 'node', id: 'c1', label: 'c1', align: 'c0', offset: [0, 90], conn: 'c0'})
                            .addShape({
                                shape: 'node', id: 'c2', label: 'c2', align: 'c1', offset: [0, 90], conn: 'c1',
                                captions: [{t: 'main', w: 40, c: 'orange'}, {t: 'HEAD', w: 40, c: 'green'}]
                            })
                            .addShape({
                                shape: 'hvect', id: 'l0', align: 'c1', offset: [80, 0], len: 160,
                                label: 'git branch -f main HEAD~2'
                            })
                            .addShape({
                                shape: 'node', id: 'c3', label: 'c0', align: 'l0', offset: [120, -90],
                                captions: {t: 'main', w: 40, c: 'orange'}
                            })
                            .addShape({shape: 'node', id: 'c4', label: 'c1', align: 'c3', offset: [0, 90], conn: 'c3'})
                            .addShape({
                                shape: 'node', id: 'c5', label: 'c2', align: 'c4', offset: [0, 90], conn: 'c4',
                                captions: {t: 'HEAD', w: 40, c: 'green'}
                            })
                    }>
                    <Title2>reassign a branch to a commit:</Title2><br/> git branch -f main HEAD~2<br/>
                </DrawBoxComponent>
                <DrawBoxComponent wh={[880, 430]} shapeFactory=
                    {
                        new DrawBoxHandler()
                            .addShape({shape: 'node', id: 'c0', label: 'c0', pos: [30, 30]})
                            .addShape({shape: 'node', id: 'c1', label: 'c1', align: 'c0', offset: [0, 90], conn: 'c0'})
                            .addShape({
                                shape: 'node', id: 'c2', label: 'c2', align: 'c1', offset: [0, 90], conn: 'c1',
                                captions: {t: 'bug', w: 30, c: 'blue'}
                            })
                            .addShape({
                                shape: 'node', id: 'c3', label: 'c3', align: 'c2', offset: [0, 90], conn: 'c2',
                                captions: [{t: 'main', w: 40, c: 'orange'}, {t: 'HEAD', w: 40, c: 'green'}]
                            })
                            .addShape({
                                shape: 'hvect', id: 'l0', align: 'c1', offset: [80, 50], len: 160,
                                label: 'git reset bug^'
                            })
                            .addShape({shape: 'node', id: 'c4', label: 'c0', align: 'l0', offset: [120, -140]})
                            .addShape({
                                shape: 'node', id: 'c5', label: 'c1', align: 'c4', offset: [0, 90], conn: 'c4',
                                captions: [{t: 'main', w: 40, c: 'orange'}, {t: 'HEAD', w: 40, c: 'green'}]
                            })
                            .addShape({
                                shape: 'node', id: 'c6', label: 'c2', align: 'c5', offset: [0, 90], conn: 'c5',
                                captions: {t: 'bug', w: 30, c: 'blue'}
                            })
                            .addShape({
                                shape: 'node', id: 'c7', label: 'c3', align: 'c6', offset: [0, 90], conn: 'c6',
                                strokeStyle: [5, 9],
                            })
                            .addShape({shape: 'node', id: 'c8', label: 'c0', align: 'c4', offset: [200, 0]})
                            .addShape({shape: 'node', id: 'c9', label: 'c1', align: 'c8', offset: [0, 90], conn: 'c8'})
                            .addShape({
                                shape: 'node', id: 'c10', label: 'c2', align: 'c9', offset: [0, 90], conn: 'c9',
                                captions: {t: 'bug', w: 30, c: 'blue'}
                            })
                            .addShape({
                                shape: 'node', id: 'c11', label: 'c3', align: 'c10', offset: [0, 90], conn: 'c10',
                                captions: [{t: 'main', w: 40, c: 'orange'}, {t: 'HEAD', w: 40, c: 'green'}]
                            })
                            .addShape({
                                shape: 'hvect', id: 'l1', align: 'c9', offset: [80, 50], len: 160,
                                label: 'git revert bug^'
                            })
                            .addShape({shape: 'node', id: 'c12', label: 'c0', align: 'l1', offset: [120, -140]})
                            .addShape({
                                shape: 'node', id: 'c13', label: 'c1', align: 'c12', offset: [0, 90], conn: 'c12'
                            })
                            .addShape({
                                shape: 'node', id: 'c14', label: 'c2', align: 'c13', offset: [0, 90], conn: 'c13',
                                captions: {t: 'bug', w: 30, c: 'blue'}
                            })
                            .addShape({
                                shape: 'node', id: 'c15', label: 'c3', align: 'c14', offset: [0, 90], conn: 'c14'
                            })
                            .addShape({
                                shape: 'node', id: 'c16', label: 'c1՛', align: 'c15', offset: [0, 90], conn: 'c15',
                                captions: [{t: 'main', w: 40, c: 'orange'}, {t: 'HEAD', w: 40, c: 'green'}]
                            })
                            .addShape({shape: 'vline', align: 'c4', offset: [140, -20], len: 400, strokeColor: 'red'})
                    }>
                    <Title2>reverse a branch:</Title2> go back in history is done
                    by <Bold>reset</Bold> and <Bold>revert</Bold>, reset alters current branch to a one in history while
                    revert copies the history in front. On remote repository, reset may break others plan.
                    <Float l={130} t={320} lineTo={[287, 335]}>
                        <div style={{width: '120px'}}>just like if C7 had never happened</div>
                    </Float>
                    <Float l={230} t={380} lineTo={[325, 349]}>
                        <div style={{width: '200px'}}>What if others are using commit?<br/>That's why 'reset' doesn't
                            work on remote repository.
                        </div>
                    </Float>
                    <Float l={650} t={380} lineTo={[775, 405]}>
                        <div style={{width: '80px'}}>copy of c1</div>
                    </Float>
                </DrawBoxComponent>
            </div>
            <Title1>Next level:</Title1>
            <div className={'flex-row'}>
                <DrawBoxComponent wh={[650, 430]} shapeFactory=
                    {
                        new DrawBoxHandler()
                            .addShape({shape: 'node', id: 'c0', label: 'c0', pos: [100, 30]})
                            .addShape({
                                shape: 'node', id: 'c1', label: 'c1', align: 'c0', offset: [0, 90], conn: 'c0'
                            })
                            .addShape({
                                shape: 'node', id: 'c2', label: 'c2', align: 'c1', offset: [-70, 90], conn: 'c1'
                            })
                            .addShape({
                                shape: 'node', id: 'c3', label: 'c3', align: 'c2', offset: [0, 90], conn: 'c2'
                            })
                            .addShape({
                                shape: 'node', id: 'c4', label: 'c4', align: 'c3', offset: [0, 90], conn: 'c3',
                                captions: {t: 'bug', w: 40, c: 'pink'}
                            })
                            .addShape({
                                shape: 'node', id: 'c5', label: 'c5', align: 'c1', offset: [70, 90], conn: 'c1',
                                captions: [{t: 'main', w: 40, c: 'orange'}, {t: 'HEAD', w: 40, c: 'green'}]
                            })
                            .addShape({
                                shape: 'hvect', id: 'l0', align: 'c5', offset: [80, 0], len: 140,
                                label: 'git cherry-pick c2 c4'
                            })
                            .addShape({shape: 'node', id: 'c6', label: 'c0', align: 'l0', offset: [170, -180]})
                            .addShape({
                                shape: 'node', id: 'c7', label: 'c1', align: 'c6', offset: [0, 90], conn: 'c6'
                            })
                            .addShape({
                                shape: 'node', id: 'c8', label: 'c2', align: 'c7', offset: [-70, 90], conn: 'c7'
                            })
                            .addShape({
                                shape: 'node', id: 'c9', label: 'c3', align: 'c8', offset: [0, 90], conn: 'c8'
                            })
                            .addShape({
                                shape: 'node', id: 'c10', label: 'c4', align: 'c9', offset: [0, 90], conn: 'c9',
                                captions: {t: 'bug', w: 40, c: 'pink', offset: [-70, -10]}
                            })
                            .addShape({
                                shape: 'node', id: 'c11', label: 'c5', align: 'c7', offset: [70, 90], conn: 'c7'
                            })
                            .addShape({
                                shape: 'node', id: 'c12', label: 'c2՛', align: 'c11', offset: [0, 90], conn: 'c11'
                            })
                            .addShape({
                                shape: 'node', id: 'c13', label: 'c4՛', align: 'c12', offset: [0, 90], conn: 'c12',
                                captions: [{t: 'main', w: 40, c: 'orange'}, {t: 'HEAD', w: 40, c: 'green'}]
                            })
                            .addShape({
                                shape: 'vect', between: ['c8', 'c12', 5], arrow: [1, 1], color: 'red'
                            })
                            .addShape({
                                shape: 'vect', between: ['c10', 'c13', 5], arrow: [1, 1], color: 'red',
                                label: {shape: 'text', offset: [0, -5], label: 'copy'}
                            })
                    }>
                    <Title2>cherry-pick: </Title2>use {'cherry-pick <commit1> <commit2> <...>'} to copy a bunch of
                    commits under HEAD without their history.
                </DrawBoxComponent>
                <div style={{width: '50em'}}>
                    <Title2>interactive rebase (reordering, emitting, ... commits): </Title2><br/>
                    this is done by '-i'. for example: git <Blue>rebase -i HEAD~4</Blue><br/>
                    this command shows all information about 4 commit before HEAD in a file and you can edit this file
                    by the help of prompted guid as you wish, then, boooooom, all of changes will be applied at once.
                </div>
            </div>
        </Frame>
    )
}

function getConnectingToRemoteRepo() {
    return (
        <Frame title={'Connecting to remote repository'}>
            After adding a remote repository by git remote add {'<url>'}, you have to provide a username and password.
            Some ways are available:
            <Bullet title={'1.'}>Just let git asks you. If username and password are required git will ask you.</Bullet>
            <Bullet title={'2.'}>Mention username & password inline:
                <Bold> git clone https://username:password@github.com/username/repository.git</Bold>
            </Bullet>
            <Bullet title={'3.'}>Use global configurations, so they will be available in all git transactions (
                <Purple>global key work make configuration globally. You can emmit it.</Purple>):<br/>
                <Bullet title={'⚫'} level={1}>
                    <Bold>
                        git config --global user.name "Your Name"<br/>
                        git config --global user.email "youremail@yourdomain.com"
                    </Bold>
                </Bullet>
                <Bullet title={'⚫'} level={1}>to test it: <Bold>git config --list</Bold></Bullet>
            </Bullet>
            <Bullet title={'4.'}>Connect through ssh session. This way involve a pair of private & public key:<br/>
                <Bullet title={'Ⅰ. check key existence:'} level={1}><Bold>ls -al ~/.ssh"</Bold>. If you want to use the
                    generated file, ignore generating new one</Bullet>
                <Bullet title={'Ⅱ. generate new key:'} level={1}>the following commands create a ssh-key file. By default
                    it will be stored in home directory. ex. "~/.ssh/id_ed25519.pub"<br/>
                    <Bold>ssh-keygen -t ed25519 -C "your_email@example.com"</Bold> or<br/>
                    <Bold>ssh-keygen -t rsa -b 4096 -C "your_email@example.com"</Bold>
                </Bullet>
                <Bullet title={'⚫ ssh key file location:'} level={2}>you can choose a location for ssh key
                    file </Bullet>
                <Bullet title={'⚫ passphrase:'} level={2}>if someone reaches your computer, then the connection is
                    no more secure, so you can define a password for accessing the connection at this level. </Bullet>
                <Bullet title={'Ⅲ. add ssh-key to the ssh-agent:'} level={1}><br/></Bullet>
                <Bullet title={'⚫ start ssh-agent: '} level={2}><Bold>eval "$(ssh-agent -s)"</Bold></Bullet>
                <Bullet title={'⚫ add ssh-key to ssh-agent: '} level={2}><Bold>ssh-add
                    ~/.ssh/generated-ssh-key-file-name</Bold>
                </Bullet>
                <Bullet title={'Ⅳ. identify the ssh-key to your server repo: '} level={1}>in Github, copy your ssh-key
                    into "your profile > settings > SSH and GPG keys"
                </Bullet>
                <Bullet title={'Ⅴ. test the ssh conn: '} level={1}><Bold>ssh -T git@github.com</Bold></Bullet>
            </Bullet>
        </Frame>
    )
}

// function get() {
//     return (
//         <Frame title={''}></Frame>
//     )
// }