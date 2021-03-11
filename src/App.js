import { useEffect, useState } from 'react';
import firebase from 'firebase'

import './App.css';

import { FormControl, Input } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

import FlipMove from 'react-flip-move'

import Message from './components/Message';
import { DB } from './firebase';

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    DB.collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id : doc.id , message : doc.data()})))
    })
  },[])

  useEffect(() => {
    setUsername(prompt('Please Enter Your Name'))
  },[])

  const sendMessage = (e) => {
    e.preventDefault();
    DB.collection('messages').add({
      message : input,
      username : username,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
  }

  return (
    <div className="App">
      <img alt={'logo'} src={'https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100'}/>
      <h1>Messanger Clone</h1>
      <h2>Welcome {username}</h2>
      <form className={'app__form'}>
        <FormControl className={'app__formControl'}>
          <Input
            className={'app__input'}
            placeholder={'Enter Message...'}
            value={input}
            onChange={ e => setInput(e.target.value)}
          />
          <IconButton
            className={'app__iconButton'}
            variant='contained'
            color='primary'
            type='submit'
            onClick={sendMessage}
            disabled={!input}
          >
            <SendIcon/>
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {
          messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />
          ))
        }
      </FlipMove>
    </div>
  );
}

export default App;
