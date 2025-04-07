import { useState } from 'react'
import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider, Tabs, PasswordInput, TextInput, Textarea } from '@mantine/core';
import { Button, Group, Text, Collapse, Box, Divider, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function App() {
  // useEffect(() => {
  //   fetch('http://127.0.0.1:3000/')
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
  const [errorText, setErrorText] = useState('');

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
            fetch("http://127.0.0.1:3000/connect", {
              method: "POST",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                user: user,
                password: password
              }),
            })
              .then(res => {
                if (res.ok) { props.setLoggedIn(true); setErrorText("") }
                else { props.setLoggedIn(false); setErrorText("Something went wrong. Try again.") }
              })
              .catch(err => {
                console.log(err)
                props.setLoggedIn(false)
              });
          }}>
            Log In
          </button>
        </Center>
        {errorText == "" ? <></> : <p>{errorText}</p>}
      </div>
    </div>
  </>);
}

function Main() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(0);
  const tablenames = ["ClubMember", "EmailLog", "FamilyMember", "FamilyMemberLocation", "Location", "LocationPhone",
    "Payments", "Personnel", "PersonnelAssignment", "PlayerAssignment", "SecondaryFamilyMember", "TeamFormation"];
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
              fetch("http://127.0.0.1:3000/query", {
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
          {result == 0 ? <p>Nothing to show.</p> : <> <DataTable data={result} /> </>}
        </Center>
      </Tabs.Panel>
    </Tabs>
  );
}

function Table(props) {
  const name = props.name;
  const [opened, { toggle }] = useDisclosure(false);
  const [result, setResult] = useState("");

  return (
    <Box maw={400} mx="auto" className='tables'>
      <Divider my="sm" size="md" label={
        <button onClick={() => {
          toggle();
          if (!opened) {
            fetch("http://127.0.0.1:3000/query", {
              method: "POST",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                query: `SELECT * FROM ${name};`
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
          };
        }}>
          {name}
        </button>
      } labelPosition="center" className='tableDivider' />
      <Collapse in={opened}>
        <Center>
          <DataTable data={result} />
        </Center>
      </Collapse>
    </Box>
  );
}

const DataTable = ({ data }) => {
  console.log(data)
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  } else if ('errno' in data) {
    return <p>There was an error.</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="table-header">
                {header.replace(/_/g, " ").toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="table-row">
              {headers.map((header) => (
                <td key={header} className="table-cell">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App
