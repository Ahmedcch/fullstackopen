/* Search on what the diffrent between the define a component in another component and define a normal function */
import { useState, useEffect } from "react";
import noteService from "./services";
import Filter from "./components/filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  // For the search field to find any persons if exists or not
  const [keyWord, findPerson] = useState("");

  // To get (fetch) the data from the the db.json or local server.
  // Getting all the data from the JSON server
  const getPersons = () => {
    noteService
      .getAll()
      .then((response) => {
        // Use the chaining promise
        setPersons(response);
      })
      .catch((error) => {
        console.log("There is an error in the getAll method", error);
      });
  };
  // To Display all the data when it's updated.
  useEffect(getPersons, []);

  // for seach input to display the existing persons names
  function findName(e) {
    const key = e.target.value;
    // To find the matching name with the input keyWord
    const search = persons.filter((person) =>
      person.name.toLowerCase().includes(key.toLowerCase().trim()),
    );
    if (search.length === 0) {
      return findPerson(`We can't found a person with the ${key} name`);
    }
    const findItems = search.map((e) => (
      <li key={e.name}>
        {e.name} {e.number}
      </li>
    ));

    return findPerson(findItems);
  }
  // To check if there is a dublicated name in the persons list and return true if exists
  const isExist = (currentVal, newVal) => {
    const persons = currentVal.map((person) => person.name);
    const isExist = persons.find((per) => per === newVal);
    console.log("persons", persons);
    console.log("isExist", isExist);
    console.log("isExist", newVal);
    if (isExist && newVal) {
      // There is no problem in this functionalty but the best practice to don't mixing the logic with the UI
      // alert(`${newName} is already added to phonebook`);
      // setNewName("");
      return true;
    }
  };
  // To update the number inside the server
  // const updateNumber = () => {
  //   noteService.update().then((response) => {
  //     console.log("updated", response);
  //   });
  // };
  // To handle the form submittion and adding the new input value then display it
  const addPerson = (event) => {
    event.preventDefault();
    // console.log(isExist(persons, newName)); // fire up the alert 2 times becuase you run the function twice the 1st with the console and 2nd with the if statment
    if (isExist(persons, newName) || !newName) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }
    const newObject = {
      name: newName,
      number: newNumber,
    };
    if (isExist(persons, newName) || !newName) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }
    // send or save new note to the server
    noteService.create(newObject).then((response) => {
      const newValue = persons.concat(response);
      setPersons(newValue);
      setNewName("");
      setNewNumber("");
    });
  };
  function deleteAction(id) {
    if (!confirm("You will delete a Person from your data base")) return;
    noteService.remove(id).then((response) => {
      console.log("successfully deleted", response);
      getPersons();
    });
  }
  // To get the input value
  const name = (event) => {
    const inputValue = event.target.value;
    // console.log(event.target.value);
    setNewName(inputValue);
  };
  const number = (event) => {
    const inputValue = event.target.value;
    // console.log(event.target.value);
    setNewNumber(inputValue);
  };
  // To display the list of persons on the page
  const personsList = persons.map((person) => {
    return (
      <li class="test" key={person.name}>
        {person.name} {person.number}{" "}
        <button
          onClick={() => {
            deleteAction(person.id);
          }}
        >
          Delete
        </button>
      </li>
    );
  });
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter findname={findName} keyword={keyWord} />
      <h2>Add New</h2>
      <PersonForm
        addPerson={addPerson}
        name={name}
        number={number}
        newNumber={newNumber}
        newName={newName}
      />
      <h2>Numbers</h2>
      <Persons personsList={personsList} />
    </div>
  );
};

export default App;
