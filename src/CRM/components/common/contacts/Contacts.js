import { useState, useEffect } from "react";
import { message } from "antd";
import ContactList from "./components/ContactList";
import ContactDetail from "./components/ContactDetail";
import CreateContactModal from "./components/CreateContactModal";
import contactsAPI from "../../../../services/contactsAPI";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await contactsAPI.getContacts();
      // Handle pagination result { count, results: [] } or array
      const contactList = data.results || data;
      setContacts(contactList);

      // Select first contact if none selected
      if (contactList.length > 0 && !selectedContactId) {
        setSelectedContactId(contactList[0].id);
      }
    } catch (error) {message.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContact = async (data) => {
    try {
      // Backend expects: name, title, email, phone, role, account
      // Modal might provide firstName + lastName, so combine them
      const payload = {
        name: data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim(),
        title: data.title || data.jobTitle || '',
        email: data.email || '',
        phone: data.phone || '',
        role: data.role || '',
        account: data.account || data.company_id || null
      };

      if (isEditing && selectedContactId) {
        const updatedContact = await contactsAPI.updateContact(selectedContactId, payload);
        message.success("Contact updated successfully");
        setContacts(contacts.map(c => c.id === selectedContactId ? updatedContact : c));
      } else {
        const newContact = await contactsAPI.createContact(payload);
        message.success("Contact created successfully");
        setContacts([newContact, ...contacts]);
        setSelectedContactId(newContact.id);
      }
      setIsCreateModalOpen(false);
      setIsEditing(false);
    } catch (error) {message.error(`Failed to ${isEditing ? 'update' : 'create'} contact`);
    }
  };

  const selectedContact = contacts.find(c => c.id === selectedContactId);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-white p-4 gap-4 font-lato">
      {/* Sidebar List */}
      <ContactList
        contacts={contacts}
        selectedId={selectedContactId}
        onSelect={setSelectedContactId}
        onCreate={() => {
          setIsEditing(false);
          setIsCreateModalOpen(true);
        }}
      />

      {/* Main Detail Area */}
      <div className="flex-1 min-w-0">
        <ContactDetail
          contact={selectedContact}
          onEdit={() => {
            setIsEditing(true);
            setIsCreateModalOpen(true);
          }}
        />
      </div>

      <CreateContactModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setIsEditing(false);
        }}
        onSubmit={handleSaveContact}
        contact={isEditing ? selectedContact : null}
      />
    </div>
  );
}
