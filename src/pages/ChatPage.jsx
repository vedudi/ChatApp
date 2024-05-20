import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import Message from "../components/Message";

const ChatPage = ({ room, setRoom }) => {
  const [msg, setMsg] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const msgCol = collection(db, "msg");
   

    await addDoc(msgCol, {
      text: e.target[0].value.trim(),
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });
    e.target.reset();
   
  };
  useEffect(() => {
    const msgCol = collection(db, "msg");
    const q = query(
      msgCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const tempMsg = [];
      snapshot.docs.forEach((doc) => tempMsg.push(doc.data()));
      setMsg(tempMsg);
    });

    return () => unsub();
  }, []);

  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}> different room</button>
      </header>
      <main>
        {msg.length > 0 ? (
          msg.map((data, i) => <Message data={data} key={i} />)
        ) : (
          <p className="warn">
            <span>hey you can write firstly...</span>
          </p>
        )}
      </main>
      <form onSubmit={sendMessage}>
        <input placeholder="write message..." type="text" required/>
        <button>send</button>
      </form>
    </div>
  );
};

export default ChatPage;
