import { useEffect, useState } from 'react'
import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider, Tabs, PasswordInput, TextInput, Textarea } from '@mantine/core';
import { Button, Group, Text, Collapse, Box, Divider, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

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
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (<>
    <div className="card">
      <div className='inputs'>
        <TextInput
          label="User"
          withAsterisk
          placeholder="vqc353_4"
          value={user}
          onChange={(event) => setUser(event.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          withAsterisk
          placeholder="********"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Center>
          <button className='login' onClick={() => {
            fetch("http://127.0.0.1:8080/connect", {
              method: "POST",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                user: user,
                password: password
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
        </Center>
      </div>
    </div>
  </>);
}

function Main() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(0);
  const tablenames = ['Location', 'FamilyMember', 'SecondaryFamilyMember', 'FamilyMemberLocation', 'ClubMember',
    'ClubMemberSecondaryLink', 'Payments', 'TeamFormation', 'PlayerAssignment', 'EmailLog', 'PersonnelAssignment'];
  let tables = [];
  tablenames.forEach(t => {
    tables.push(<Table name={t} />);
  });

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
        {tables}
      </Tabs.Panel>

      <Tabs.Panel value="query">
        <div className='query'>
          <Textarea
            label="Write a query"
            withAsterisk
            placeholder="SELECT * FROM Location;"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            resize="vertical"
          />
          <Center>
            <button className='login' onClick={() => {
              fetch("http://127.0.0.1:8080/query", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  query: query
                }),
              })
                .then(res => {
                  if (res.ok) return res.json();
                  else { setResult(''); return; }
                })
                .then(data => setResult(data))
                .catch(err => {
                  console.log(err)
                  setResult('')
                });
            }}>
              Query
            </button>
          </Center>
          <Divider my="md" size="md" label={"Result:"} labelPosition="center" />
        </div>
        <Center>
          {result == 0 ? <p>Nothing to show.</p> : <> {result != "" ? <p>{result}</p> : <p>ERROR</p>} </>}
        </Center>
      </Tabs.Panel>
    </Tabs>
  );
}

function Table(props) {
  const name = props.name;
  const [opened, { toggle }] = useDisclosure(false);
  const [content, setContent] = useState("");

  return (
    <Box maw={400} mx="auto" className='tables'>
      <Divider my="sm" size="md" label={
        <button onClick={() => {
          toggle();
          if (!opened) {
            let temp = fetch("http://127.0.0.1:8080/query", {
              method: "POST",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                query: `SELECT * FROM ${name};`
              }),
            })
              .then(res => {
                if (res.ok) return res.json();
                else { return "An error occured."; }
              })
              .then(data => { console.log(typeof data); return data })
              .catch(err => {
                console.log(err);
                setContent("An error occured.");
              });
            setContent(temp);
          };
        }}>
          {name}
        </button>
      } labelPosition="center" className='tableDivider' />
      <Collapse in={opened}>
        <Center>
          {/* <Text>{typeof content == "string" ? { content } : (toTable(content))}</Text>  */}
        </Center>
      </Collapse>
    </Box>
  );
}

function toTable(data) {
  return
  <table>
    <tr>
      <th></th>
    </tr>
  </table>
}

export default App
