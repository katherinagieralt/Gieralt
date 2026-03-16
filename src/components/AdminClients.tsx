import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  UserPlus, 
  Users, 
  Mail, 
  User, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  Search,
  ChevronRight,
  ShieldCheck,
  Send
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { 
  collection, 
  query, 
  getDocs, 
  addDoc, 
  serverTimestamp, 
  where,
  orderBy
} from "firebase/firestore";
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { db, secondaryAuth, auth } from "../firebase";
import toast from "react-hot-toast";

interface ClientProfile {
  id: string;
  name: string;
  email: string;
  createdAt: any;
  status: 'invited' | 'active';
  lastInviteSent?: any;
}

export function AdminClients() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  // Security Check
  useEffect(() => {
    const checkAuth = async () => {
      const user = auth.currentUser;
      const ADMIN_EMAIL = "katherina338@gmail.com";
      if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        toast.error("Brak uprawnień administratora.");
        navigate("/login");
        return;
      }
      setIsAdmin(true);
      fetchClients();
    };
    checkAuth();
  }, [navigate]);

  const fetchClients = async () => {
    try {
      const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const clientsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ClientProfile[];
      setClients(clientsData);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Wypełnij wszystkie pola.");
      return;
    }

    setIsCreating(true);
    try {
      // 1. Check if user already exists in Firestore
      const userCheck = query(collection(db, "users"), where("email", "==", formData.email));
      const checkSnapshot = await getDocs(userCheck);
      
      if (!checkSnapshot.empty) {
        toast.error("Użytkownik z tym emailem już istnieje.");
        setIsCreating(false);
        return;
      }

      // 2. Create user in Secondary Auth (prevents admin logout)
      // We use a temporary random password
      const tempPassword = Math.random().toString(36).slice(-12) + "A1!";
      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, formData.email, tempPassword);
      const uid = userCredential.user.uid;

      // 3. Create document in Firestore
      await addDoc(collection(db, "users"), {
        uid,
        name: formData.name,
        email: formData.email,
        role: "client",
        status: "invited",
        createdAt: serverTimestamp(),
      });

      // 4. Send invitation email (Password Reset)
      await sendPasswordResetEmail(secondaryAuth, formData.email);

      toast.success(`Konto dla ${formData.email} utworzone. Zaproszenie wysłane!`);
      setFormData({ name: "", email: "" });
      fetchClients();
    } catch (error: any) {
      console.error("Error creating client:", error);
      toast.error(`Błąd: ${error.message}`);
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <Link to="/admin" className="inline-flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors mb-2 text-sm">
              <ArrowLeft className="h-4 w-4" />
              Wróć do Dashboardu
            </Link>
            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Users className="h-8 w-8 text-rose-500" />
              Zarządzanie Klientami
            </h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
            <ShieldCheck className="h-4 w-4" />
            Tryb Administratora
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Create Client Form */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 sticky top-8"
            >
              <h2 className="text-xl font-display font-semibold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                <UserPlus className="h-5 w-5 text-rose-500" />
                Dodaj Nowego Klienta
              </h2>
              
              <form onSubmit={handleCreateClient} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">
                    Nazwa / Imię Klienta
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="text"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all text-slate-900 dark:text-white"
                      placeholder="np. Jan Kowalski / Projekt X"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">
                    Adres Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="email"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all text-slate-900 dark:text-white"
                      placeholder="klient@przyklad.pl"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    disabled={isCreating}
                    className="w-full py-4 bg-slate-900 dark:bg-rose-600 hover:bg-slate-800 dark:hover:bg-rose-700 text-white rounded-2xl font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    {isCreating ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Utwórz i Zaproś
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
                
                <p className="text-[10px] text-slate-400 text-center uppercase tracking-tighter mt-4">
                  Klient otrzyma e-mail z linkiem do ustawienia hasła
                </p>
              </form>
            </motion.div>
          </div>

          {/* Clients List */}
          <div className="lg:col-span-8">
            <div className="mb-6 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Szukaj klienta po nazwie lub emailu..."
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all shadow-sm text-slate-900 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredClients.length > 0 ? (
                  filteredClients.map((client, index) => (
                    <motion.div 
                      key={client.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group flex flex-col sm:flex-row items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-5">
                        <div className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-rose-50 dark:group-hover:bg-rose-500/10 group-hover:text-rose-500 transition-colors">
                          <User className="h-7 w-7 transition-transform group-hover:scale-110" />
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-slate-900 dark:text-white text-lg">{client.name}</h3>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {client.email}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-slate-300" />
                            <span>
                              Od: {client.createdAt?.toDate ? client.createdAt.toDate().toLocaleDateString() : 'Kilka sekund temu'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          client.status === 'active' 
                            ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                            : 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                        }`}>
                          {client.status === 'active' ? 'Aktywny' : 'Oczekuje'}
                        </span>
                        <button className="h-11 w-11 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all ml-auto sm:ml-0">
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 dark:bg-slate-800 text-slate-300 mb-6">
                      <Users className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-display font-medium text-slate-900 dark:text-white mb-2">Brak wyników</h3>
                    <p className="text-slate-500 dark:text-slate-400">Nie znaleźliśmy klientów pasujących do frazy "{searchQuery}"</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Wszystkie dane są synchronizowane w czasie rzeczywistym z Firebase
          </p>
        </div>

      </div>
    </div>
  );
}
