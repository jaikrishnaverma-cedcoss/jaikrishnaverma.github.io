import React, { useEffect, useRef, useState } from 'react'
import { ChatElement } from './ChatElement'
import { ref, push, getDatabase, onValue } from "firebase/database";
import app from '../firebaseConfig';
import { emoji } from './emoji';


interface Message {
    id?: string
    createdAt: string
    txt: string
    uid: string
    userPic: string
}

const Home = ({ authUser }: any) => {
    const chatBox = useRef<any>(null)
    const input=useRef<any>(null)
    const db = getDatabase(app);
    const [conversation, setConversation] = useState<Message[]>([])
    const [loading, setLoading] = useState<boolean>(true)
 
    // get data from firebase
    useEffect(() => {
        const todoRef = ref(db, "/messages");
        onValue(todoRef, (snapshot) => {
            const todos = snapshot.val();
            let newChats: Message[] = [];
            for (let id in todos) {
                newChats.push({ id, ...todos[id] });
            };
            setTimeout(() => {
                console.log(newChats)
                setConversation(newChats)
                setLoading(false)
            }, 5)

        })
    }, [db]);

    // auto top
    useEffect(() => {
        if (!loading)
            chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }, [conversation, loading]);

    // Add Data to firebase
    const Sender = (e: any) => {
        e.preventDefault()
        if (!e.target.message.value)
            return console.log('empty Input')
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let input: Message = {
            createdAt: `${new Date().getDate()} ${months[new Date().getMonth()]} ${new Date().getHours()}:${new Date().getMinutes()}`,
            txt: e.target.message.value,
            uid: authUser.uid,
            userPic: authUser.photoURL
        }
        push(ref(db, `/messages`), input);
        e.target.reset();
    }

    console.log("emoji👌")

    if (loading)
        return <div className="d-flex col-12 align-items-center justify-content-center vh-100 ">
            <img src="Triangles-1s-200px (1).gif" style={{ width: '50px' }} alt="" />
        </div>

    return (
        <>
            <div className="col-12 d-flex flex-column justify-content-between ">
                <div ref={chatBox} className="container col-12 border my-2 p-2 chatBox">
                    {
                        conversation.map(msgs => {
                            return <ChatElement msg={msgs} name={authUser.displayName} align={(authUser.uid === msgs.uid) ? 'msg-right' : 'msg-left'} />
                        })
                    }
                </div>
                <div className="container bg-secondary p-1 px-4 mt-3 rounded emoji">
                    {
                        emoji.map((x,i)=>{
                            return <span className='m-1' onClick={()=>input.current.value+=x.emoji}>{x.emoji}</span>
                        })
                    }
                </div>
                <form className="input-group mb-3 pt-0" onSubmit={Sender} style={{ height: '8vh' }}>
                    <input ref={input} type="text" className="form-control" name="message" placeholder="messaging..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                 
                    <button className="btn btn-primary" type="submit" id="button-addon2">Send</button>
                  
                </form>
            </div>
        </>
    )
}

export default Home