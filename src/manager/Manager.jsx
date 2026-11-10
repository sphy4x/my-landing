import React from 'react';
import {
  Bell, Check, CheckCircle2, Clock3, Filter, House, LogOut, MessageCircle,
  Phone, RefreshCw, ShieldCheck, Smartphone, UserRound, Wrench
} from 'lucide-react';
import { clientPhone, enableManagerPush, humanService, isConfigured, managerDb, vapidPublicKey } from './client.js';

const STATUS = {
  new: { label: 'Νέα', icon: Bell },
  contacted: { label: 'Σε εξέλιξη', icon: Clock3 },
  done: { label: 'Ολοκληρωμένα', icon: CheckCircle2 }
};
const FILTERS = [{ value: 'all', label: 'Όλα' }, ...Object.entries(STATUS).map(([value, state]) => ({ value, label: state.label }))];

function dateLabel(value) {
  try {
    return new Date(value).toLocaleString('el-GR', { dateStyle: 'medium', timeStyle: 'short' });
  } catch { return ''; }
}

function LeadCard({ lead, onStatus, saving }) {
  const number = clientPhone(lead.phone);
  const rawPhone = String(lead.phone || '').replace(/[^\d+]/g, '');
  const whatsapp = 'https://wa.me/' + number;
  const viber = 'viber://chat?number=' + encodeURIComponent(rawPhone.startsWith('+') ? rawPhone : '+' + number);
  const status = STATUS[lead.status] || STATUS.new;

  return (
    <article className="th-lead" aria-label={'Αίτημα από ' + lead.name}>
      <div className="th-lead-top">
        <span className={'th-status th-status-' + lead.status}>
          <status.icon size={14} /> {status.label}
        </span>
        <time dateTime={lead.created_at}>{dateLabel(lead.created_at)}</time>
      </div>
      <div className="th-lead-person"><span className="th-avatar"><UserRound size={20} /></span><div>
        <h3>{lead.name}</h3><p>{humanService(lead.service)}</p>
      </div></div>
      {lead.area && <p className="th-region">📍 {lead.area}</p>}
      {lead.details && <p className="th-details">{lead.details}</p>}
      <div className="th-actions">
        <a className="th-action th-primary" href={'tel:' + rawPhone}><Phone size={16}/> Κλήση</a>
        <a className="th-action" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp</a>
        <a className="th-action" href={viber}><MessageCircle size={16}/> Viber</a>
      </div>
      <div className="th-status-controls">
        <label htmlFor={'status-' + lead.id}>Κατάσταση</label>
        <select id={'status-' + lead.id} value={lead.status} disabled={saving} onChange={(event) => onStatus(lead.id, event.target.value)}>
          {Object.entries(STATUS).map(([value, item]) => <option key={value} value={value}>{item.label}</option>)}
        </select>
      </div>
    </article>
  );
}

export default function Manager() {
  const [session, setSession] = React.useState(null);
  const [loadingAuth, setLoadingAuth] = React.useState(Boolean(isConfigured));
  const [allowed, setAllowed] = React.useState(false);
  const [checkingAccess, setCheckingAccess] = React.useState(false);
  const [email, setEmail] = React.useState('technohome.gr@gmail.com');
  const [magicBusy, setMagicBusy] = React.useState(false);
  const [magicSent, setMagicSent] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [authBusy, setAuthBusy] = React.useState(false);
  const [authError, setAuthError] = React.useState('');
  const [leads, setLeads] = React.useState([]);
  const [filter, setFilter] = React.useState('all');
  const [fetching, setFetching] = React.useState(false);
  const [feedback, setFeedback] = React.useState('');
  const [savingId, setSavingId] = React.useState(null);
  const [pushBusy, setPushBusy] = React.useState(false);
  const [pushEnabled, setPushEnabled] = React.useState(false);

  React.useEffect(() => {
    if (!managerDb) return;
    let active = true;
    managerDb.auth.getSession().then(({ data }) => {
      if (active) { setSession(data.session); setLoadingAuth(false); }
    }).catch(() => { if (active) setLoadingAuth(false); });
    const { data: { subscription } } = managerDb.auth.onAuthStateChange((_event, nextSession) => {
      if (active) setSession(nextSession);
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);

  React.useEffect(() => {
    if (!managerDb || !session?.user?.id) {
      setAllowed(false);
      setLeads([]);
      return;
    }
    let active = true;
    setCheckingAccess(true);
    managerDb.from('technohome_managers').select('user_id').eq('user_id', session.user.id).maybeSingle()
      .then(({ data, error }) => {
        if (!active) return;
        setAllowed(!error && Boolean(data?.user_id));
        if (error) setFeedback('Δεν ήταν δυνατός ο έλεγχος πρόσβασης.');
        setCheckingAccess(false);
      });
    return () => { active = false; };
  }, [session?.user?.id]);

  const fetchLeads = React.useCallback(async () => {
    if (!managerDb || !allowed) return;
    setFetching(true);
    const { data, error } = await managerDb.from('technohome_inquiries')
      .select('id,name,phone,service,area,details,status,created_at')
      .order('created_at', { ascending: false }).limit(200);
    if (error) setFeedback('Αποτυχία φόρτωσης αιτημάτων. Δοκιμάστε ξανά.');
    else { setLeads(data || []); setFeedback(''); }
    setFetching(false);
  }, [allowed]);

  React.useEffect(() => {
    if (!allowed) return;
    fetchLeads();
    const handleVisibility = () => { if (!document.hidden) fetchLeads(); };
    document.addEventListener('visibilitychange', handleVisibility);
    const refresh = window.setInterval(() => { if (!document.hidden) fetchLeads(); }, 60000);
    return () => { window.clearInterval(refresh); document.removeEventListener('visibilitychange', handleVisibility); };
  }, [allowed, fetchLeads]);

  async function sendLoginLink() {
    if (!managerDb || magicBusy) return;
    setMagicBusy(true);
    setAuthError('');
    setMagicSent(false);
    try {
      const { error } = await managerDb.auth.signInWithOtp({
        email: 'technohome.gr@gmail.com',
        options: {
          shouldCreateUser: false,
          emailRedirectTo: window.location.origin + '/manager/'
        }
      });
      if (error) throw error;
      setMagicSent(true);
    } catch {
      setAuthError('Δεν στάλθηκε το email. Ελέγξτε τη σύνδεσή σας ή δοκιμάστε αργότερα.');
    } finally {
      setMagicBusy(false);
    }
  }

  async function signIn(event) {
    event.preventDefault();
    setAuthBusy(true); setAuthError('');
    // Ask Android Chrome to preserve the installed app's origin storage when possible.
    // Session tokens themselves are stored and refreshed by Supabase Auth.
    if (navigator.storage && typeof navigator.storage.persist === 'function') {
      navigator.storage.persist().catch(() => {});
    }
    try {
      const { error } = await managerDb.auth.signInWithPassword({ email: email.trim(), password });
      if (error) setAuthError('Λανθασμένα στοιχεία ή μη διαθέσιμη σύνδεση.');
      else setPassword('');
    } catch {
      setAuthError('Προσωρινή δυσκολία σύνδεσης. Δοκιμάστε ξανά.');
    } finally {
      setAuthBusy(false);
    }
  }

  async function signOut() {
    // Prevent accidental logout: normally the technician never needs to sign in again.
    if (!window.confirm('Θέλετε σίγουρα να αποσυνδεθείτε; Θα χρειαστείτε τον κωδικό για να μπείτε ξανά.')) return;
    await managerDb.auth.signOut();
    setLeads([]); setAllowed(false); setPushEnabled(false);
  }

  async function updateStatus(id, status) {
    setSavingId(id); setFeedback('');
    const { data, error } = await managerDb.from('technohome_inquiries')
      .update({ status }).eq('id', id).select('id,status').single();
    if (error || !data) setFeedback('Η ενημέρωση δεν ολοκληρώθηκε.');
    else setLeads((items) => items.map((item) => item.id === id ? { ...item, status: data.status } : item));
    setSavingId(null);
  }

  async function activatePush() {
    setPushBusy(true); setFeedback('');
    try {
      await enableManagerPush(session.user.id);
      setPushEnabled(true);
    } catch (error) {
      setFeedback(error?.message || 'Δεν ήταν δυνατή η ενεργοποίηση ειδοποιήσεων.');
    } finally { setPushBusy(false); }
  }

  const shown = filter === 'all' ? leads : leads.filter((item) => item.status === filter);
  const counts = Object.fromEntries(Object.keys(STATUS).map((key) => [key, leads.filter((lead) => lead.status === key).length]));

  return <div className="th-app">
    <header className="th-header">
      <div className="th-brand"><span className="th-brand-icon"><House size={23}/></span><div><strong>Techno<span>Home</span></strong><small>MANAGER</small></div></div>
      {session && <button className="th-icon-button" aria-label="Αποσύνδεση" onClick={signOut}><LogOut size={21}/></button>}
    </header>
    <main className="th-main">
      {!isConfigured ? <div className="th-center th-panel">
        <ShieldCheck size={38} className="th-big-icon"/>
        <h1>Techno Home Manager</h1>
        <p>Η εφαρμογή έχει προετοιμαστεί. Για να ενεργοποιηθεί με ασφάλεια, χρειάζεται η ιδιωτική βάση δεδομένων και η σύνδεση του διαχειριστή.</p>
        <span className="th-setup">Η πρόσβαση στα αιτήματα δεν είναι ακόμα ενεργή.</span>
      </div> : loadingAuth ? <div className="th-center"><div className="th-spinner"/> Έλεγχος σύνδεσης...</div> : !session ? <section className="th-login th-panel">
        <div className="th-greeting"><ShieldCheck size={36}/><h1>Σύνδεση διαχειριστή</h1><p>Ιδιωτική πρόσβαση στα αιτήματα πελατών της Techno Home.</p></div>
        <div className="th-login-by-email">
          <p className="th-session-note">Μία μόνο σύνδεση από το email <strong>technohome.gr@gmail.com</strong>. Η εφαρμογή θα θυμάται τη συσκευή σας.</p>
          <button className="th-submit" type="button" onClick={sendLoginLink} disabled={magicBusy}>
            {magicBusy ? 'Αποστολή...' : 'Στείλτε μου σύνδεσμο εισόδου'}
          </button>
          {magicSent && <p className="th-success" role="status">Ανοίξτε το email σας και πατήστε τον σύνδεσμο εισόδου. Το Android θα διατηρεί τη σύνδεσή σας.</p>}
          {authError && <p className="th-error" role="alert">{authError}</p>}
        </div>
        <details className="th-password-login">
          <summary>Σύνδεση με κωδικό (εναλλακτικά)</summary>
          <form onSubmit={signIn}>
            <label>Email<input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" required/></label>
            <label>Κωδικός<input type="password" minLength={8} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required/></label>
            <button className="th-submit" disabled={authBusy} type="submit">{authBusy ? 'Σύνδεση...' : 'Σύνδεση'}</button>
          </form>
        </details>
      </section> : checkingAccess ? <div className="th-center">Έλεγχος δικαιωμάτων...</div> : !allowed ? <div className="th-center th-panel">
        <ShieldCheck size={34}/><h1>Δεν υπάρχει πρόσβαση</h1>
        <p>Ο λογαριασμός δεν είναι καταχωρισμένος ως διαχειριστής Techno Home.</p>
        <button className="th-submit" onClick={signOut}>Αποσύνδεση</button>
      </div> : <>
        <section className="th-dashboard-head">
          <div className="th-heading"><small>ΚΕΝΤΡΟ ΑΙΤΗΜΑΤΩΝ</small><h1>Καλώς ήρθες, Κώστα <span>👋</span></h1><p>Όλες οι επικοινωνίες, σε ένα σημείο.</p></div>
          <button className="th-refresh" onClick={fetchLeads} disabled={fetching}><RefreshCw size={18} className={fetching ? 'th-spinning' : ''}/> Ανανέωση</button>
        </section>
        <div className="th-stats">
          {Object.entries(STATUS).map(([key, item]) => <div className="th-stat" key={key}>
            <span>{item.label}</span><strong>{counts[key]}</strong><item.icon size={21}/>
          </div>)}
        </div>
        <div className="th-push-banner">
          <div><Smartphone size={22}/><div><strong>Ειδοποιήσεις στο Android</strong><p>Ενημέρωση για κάθε νέο αίτημα, ακόμη κι αν δεν είναι ανοιχτή η εφαρμογή.</p></div></div>
          <button onClick={activatePush} disabled={!vapidPublicKey || pushBusy || pushEnabled}>{!vapidPublicKey ? 'Σύντομα' : pushEnabled ? <><Check size={15}/> Ενεργές</> : pushBusy ? 'Ρύθμιση...' : 'Ενεργοποίηση'}</button>
        </div>
        {feedback && <p className="th-error" role="alert">{feedback}</p>}
        <section aria-label="Αιτήματα" className="th-inquiries">
          <div className="th-section-head"><h2>Αιτήματα <span>{leads.length}</span></h2><Filter size={18}/></div>
          <div className="th-filters" role="group" aria-label="Φιλτράρισμα κατάστασης">{FILTERS.map((item) =>
            <button key={item.value} className={filter === item.value ? 'active' : ''} onClick={() => setFilter(item.value)}>{item.label}</button>
          )}</div>
          <div className="th-leads">
            {shown.length ? shown.map((lead) => <LeadCard key={lead.id} lead={lead} onStatus={updateStatus} saving={savingId === lead.id}/>) :
              <div className="th-empty"><Wrench size={25}/><strong>Δεν υπάρχουν αιτήματα</strong><p>Τα αιτήματα που θα σταλούν από τον ιστότοπο θα εμφανίζονται εδώ.</p></div>}
          </div>
        </section>
      </>}
    </main>
    <footer className="th-footer">TechnoHome.gr · Ιδιωτική εφαρμογή διαχείρισης</footer>
  </div>;
}
