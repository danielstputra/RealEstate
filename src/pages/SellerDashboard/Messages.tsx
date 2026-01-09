import { useState } from 'react';
import { Search, Send, MoreVertical, Phone, Video } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { cn } from '../../utils/cn';

const CONTACTS = [
    {
        id: '1',
        name: 'Budi Santoso',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
        lastMessage: 'Halo, apakah properti di BSD masih tersedia?',
        time: '09:00',
        unread: 2,
        online: true,
    },
    {
        id: '2',
        name: 'Sarah Wijaya',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        lastMessage: 'Baik, saya akan kabari besok ya pak.',
        time: 'Kemarin',
        unread: 0,
        online: false,
    },
    {
        id: '3',
        name: 'Rian Hidayat',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rian',
        lastMessage: 'Bisa minta foto bagian dapur lebih jelas?',
        time: 'Kemarin',
        unread: 0,
        online: true,
    },
];

const MESSAGES = [
    { id: 1, text: 'Halo selamat pagi, saya tertarik dengan rumah di BSD', sender: 'other', time: '08:58' },
    { id: 2, text: 'Apakah masih tersedia pak?', sender: 'other', time: '08:59' },
    { id: 3, text: 'Halo, masih tersedia bu. Silahkan jika ingin survey.', sender: 'me', time: '09:00' },
    { id: 4, text: 'Baik pak, terima kasih infonya.', sender: 'other', time: '09:05' },
];

export default function Messages() {
    const [selectedContact, setSelectedContact] = useState(CONTACTS[0]);
    const [messageInput, setMessageInput] = useState('');

    return (
        <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* Contacts Sidebar */}
            <div className="w-80 border-r border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input placeholder="Cari pesan..." className="pl-9 h-9" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {CONTACTS.map((contact) => (
                        <button
                            key={contact.id}
                            onClick={() => setSelectedContact(contact)}
                            className={cn(
                                "w-full flex items-center gap-3 p-4 transition-colors hover:bg-slate-50",
                                selectedContact.id === contact.id ? "bg-teal-50" : ""
                            )}
                        >
                            <div className="relative">
                                <img src={contact.avatar} alt={contact.name} className="h-10 w-10 rounded-full bg-slate-200" />
                                {contact.online && (
                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
                                )}
                            </div>
                            <div className="flex-1 text-left overflow-hidden">
                                <div className="flex items-center justify-between mb-0.5">
                                    <span className="font-medium text-slate-900 truncate">{contact.name}</span>
                                    <span className="text-xs text-slate-500">{contact.time}</span>
                                </div>
                                <p className="text-sm text-slate-500 truncate">{contact.lastMessage}</p>
                            </div>
                            {contact.unread > 0 && (
                                <div className="h-5 w-5 flex items-center justify-center rounded-full bg-teal-600 text-xs text-white">
                                    {contact.unread}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Headers */}
                <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <img src={selectedContact.avatar} alt={selectedContact.name} className="h-9 w-9 rounded-full bg-slate-200" />
                        <div>
                            <h3 className="font-bold text-slate-900">{selectedContact.name}</h3>
                            <p className="text-xs text-green-600 font-medium">Online</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm"><Phone className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm"><Video className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm"><MoreVertical className="h-4 w-4" /></Button>
                    </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
                    {MESSAGES.map((msg) => (
                        <div key={msg.id} className={cn("flex", msg.sender === 'me' ? "justify-end" : "justify-start")}>
                            <div className={cn(
                                "max-w-[70%] rounded-2xl px-4 py-3 text-sm",
                                msg.sender === 'me'
                                    ? "bg-teal-600 text-white rounded-br-none"
                                    : "bg-white text-slate-900 border border-slate-200 rounded-bl-none"
                            )}>
                                <p>{msg.text}</p>
                                <p className={cn(
                                    "text-[10px] mt-1 text-right opacity-70",
                                    msg.sender === 'me' ? "text-teal-100" : "text-slate-400"
                                )}>{msg.time}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-slate-200">
                    <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); setMessageInput(''); }}>
                        <Input
                            placeholder="Tulis pesan..."
                            className="flex-1"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                        />
                        <Button type="submit">
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
