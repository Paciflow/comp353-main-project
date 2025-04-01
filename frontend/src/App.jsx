import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider, Tabs } from '@mantine/core';

function App() {
  // useEffect(() => {
  //   fetch('http://127.0.0.1:8080/')
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  //     .catch(err => console.log(err));
  // }, []);

  const [loggedIn, setLoggedIn] = useState(false);

  return <MantineProvider>{
    <>
      <h1>MYVC Database Management System</h1>
      {loggedIn ? <></> : <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      {loggedIn ? <Main /> : <></>}
    </>
  } </MantineProvider>
}

function Login(props) {
  return (<>
    <div className="card">
      <button onClick={() => {
        // fetch('http://127.0.0.1:8080/connect')
        //   .then(res => {
        //     if (res.ok) props.setLoggedIn(true)
        //     else props.setLoggedIn(false)
        //   })
        //   .catch(err => {
        //     console.log(err)
        //     props.setLoggedIn(false)
        //   });
        fetch("http://127.0.0.1:8080/connect", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            user: "",
            password: ""
          }),
        })
          .then(res => {
            if (res.ok) props.setLoggedIn(true)
            else props.setLoggedIn(false)
          })
          .catch(err => {
            console.log(err)
            props.setLoggedIn(false)
          });
      }}>
        Log In
      </button>
    </div>
  </>);
}

function Main(props) {
  return (
    <Tabs defaultValue="view">
      <Tabs.List>
        <Tabs.Tab value="view">
          View
        </Tabs.Tab>
        <Tabs.Tab value="query">
          Query
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="view">
        view tables
      </Tabs.Panel>

      <Tabs.Panel value="query">
        query
      </Tabs.Panel>
    </Tabs>
  );
}

export default App
