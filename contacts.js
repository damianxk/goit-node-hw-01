const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (error, data) => {
    if (error) {
      console.error("Error reading contacts file:", error);
      return;
    }
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (error, data) => {
    if (error) {
      console.error("Error reading contacts file:", error);
      return;
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) {
      console.table([contact]);
    } else {
      console.log("Contact not found.");
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (error, data) => {
    if (error) {
      console.error("Error reading contacts file:", error);
      return;
    }
    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter((c) => c.id !== contactId);
    if (contacts.length === updatedContacts.length) {
      console.log("Contact not found.");
      return;
    }
    fs.writeFile(contactsPath, JSON.stringify(updatedContacts), (error) => {
      if (error) {
        console.error("Error writing contacts file:", error);
        return;
      }
      console.log("Contact removed successfully.");
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (error, data) => {
    if (error) {
      console.error("Error reading contacts file:", error);
      return;
    }
    const contacts = JSON.parse(data);
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    const updatedContacts = [...contacts, newContact];
    fs.writeFile(contactsPath, JSON.stringify(updatedContacts), (error) => {
      if (error) {
        console.error("Error writing contacts file:", error);
        return;
      }
      console.log("Contact added successfully.");
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
