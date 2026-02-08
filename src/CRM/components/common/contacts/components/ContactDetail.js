import { useState, useEffect } from "react";
import {
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  CheckCircleOutlined,
  MessageOutlined,
  FileTextOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Tabs, message } from "antd";
import ContactHeader from "./ContactHeader";
import contactsAPI from "../../../../../services/contactsAPI";
import tasksAPI from "../../../../../services/tasksAPI";
import ActivityTimeline from "./ActivityTimeline";
import NotesSection from "./NotesSection";
import EmailComposer from "./EmailComposer";
import MoMSection from "./MoMSection";

/**
 * Clean Light Premium Contact Detail Component - Final Interaction Focus
 */
export default function ContactDetail({ contact, onEdit }) {
  const [activities, setActivities] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loadingTimeline, setLoadingTimeline] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [momTitle, setMomTitle] = useState('');
  const [momContent, setMomContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);

  useEffect(() => {
    if (contact?.id) {
      fetchTimeline();
      fetchNotes();
    }
  }, [contact?.id]);

  const fetchTimeline = async () => {
    setLoadingTimeline(true);
    try {
      const data = await contactsAPI.getTimeline(contact.id);
      setActivities(data);
    } catch (error) {
      console.error('Error fetching timeline:', error);
    } finally {
      setLoadingTimeline(false);
    }
  };

  const fetchNotes = async () => {
    try {
      const data = await contactsAPI.getNotes(contact.id);
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleAddNote = async (type = 'note') => {
    let content = '';
    if (type === 'note') content = newNote;
    else if (type === 'email') content = `Subject: ${emailSubject}\n\n${emailBody}`;
    else if (type === 'mom') content = momContent;

    if (!content.trim()) return;
    try {
      await contactsAPI.createNote({
        contact: contact.id,
        content: content,
        type: type,
        title: type === 'mom' ? momTitle : null
      });
      if (type === 'note') setNewNote('');
      else if (type === 'email') {
        setEmailSubject('');
        setEmailBody('');
      } else if (type === 'mom') {
        setMomContent('');
        setMomTitle('');
        setAiSuggestions(null);
      }

      fetchNotes();
      fetchTimeline();
      message.success(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully`);
    } catch (error) {
      console.error(`Error adding ${type}:`, error);
      message.error(`Failed to add ${type}`);
    }
  };

  const handleAIAnalyze = async () => {
    if (!momContent.trim()) return;
    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAiSuggestions({
        summary: "Meeting focused on digital infrastructure expansion and budget alignment for Q3.",
        tasks: [
          "Follow up on architectural review meeting",
          "Send updated proposal with cloud-native options",
          "Schedule technical deep-dive with the architecture team"
        ]
      });
    } catch (error) {
      console.error('Error analyzing with AI:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCreateTask = async (taskTitle) => {
    try {
      await tasksAPI.createTask({
        title: taskTitle,
        description: `Auto-generated from MoM: ${momTitle || 'Untitled Session'}`,
        account: contact.account,
        status: 'To Do',
        priority: 'Medium'
      });
      message.success(`Task created: ${taskTitle}`);
      setAiSuggestions(prev => ({
        ...prev,
        tasks: prev.tasks.filter(t => t !== taskTitle)
      }));
    } catch (error) {
      console.error('Error creating task:', error);
      message.error('Failed to create task');
    }
  };

  if (!contact) {
    return <div className="flex items-center justify-center h-full text-neutral-400 font-lato">Select a identity node to begin analysis.</div>;
  }

  return (
    <div className="flex flex-col h-full bg-white relative font-lato">
      <ContactHeader contact={contact} onEdit={onEdit} />

      <div className="flex-1 overflow-y-auto p-12 custom-scrollbar relative z-10 bg-neutral-50/30">
        <div className="max-w-7xl mx-auto">
          {/* Interaction Complex - Primary Focus */}
          <div className="border border-neutral-100 rounded-[40px] shadow-2xl shadow-neutral-200/50 bg-white overflow-hidden transition-all">
            <Tabs
              defaultActiveKey="1"
              className="premium-tabs-colorful light-tabs"
              items={[
                {
                  key: '1',
                  label: <span className="flex items-center gap-2 px-12 py-6 text-[13px] font-bold uppercase tracking-[0.1em] text-neutral-500 hover:text-indigo-600 transition-colors"><CalendarOutlined /> Activity</span>,
                  children: <ActivityTimeline activities={activities} loading={loadingTimeline} isLightMode={true} />
                },
                {
                  key: '2',
                  label: <span className="flex items-center gap-2 px-12 py-6 text-[13px] font-bold uppercase tracking-[0.1em] text-neutral-500 hover:text-indigo-600 transition-colors"><MessageOutlined /> Remarks</span>,
                  children: <NotesSection notes={notes} newNote={newNote} setNewNote={setNewNote} onAddNote={handleAddNote} isLightMode={true} />
                },
                {
                  key: '3',
                  label: <span className="flex items-center gap-2 px-12 py-6 text-[13px] font-bold uppercase tracking-[0.1em] text-neutral-500 hover:text-indigo-600 transition-colors"><MailOutlined /> Email</span>,
                  children: <EmailComposer notes={notes} subject={emailSubject} setSubject={setEmailSubject} body={emailBody} setBody={setEmailBody} onSend={handleAddNote} isLightMode={true} />
                },
                {
                  key: '4',
                  label: <span className="flex items-center gap-2 px-12 py-6 text-[13px] font-bold uppercase tracking-[0.1em] text-neutral-500 hover:text-indigo-600 transition-colors"><FileTextOutlined /> MoM</span>,
                  children: <MoMSection notes={notes} title={momTitle} setTitle={setMomTitle} content={momContent} setContent={setMomContent} aiSuggestions={aiSuggestions} isAnalyzing={isAnalyzing} onAnalyze={handleAIAnalyze} onSave={handleAddNote} onCreateTask={handleCreateTask} isLightMode={true} onReset={() => { setMomTitle(''); setMomContent(''); setAiSuggestions(null); }} />
                }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
