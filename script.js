/* وجبة - الواجهة + Firebase (Firestore + Authentication) */
/*FB-IMPORTS*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where, onSnapshot, writeBatch } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
/*FB-IMPORTS-END*/

const firebaseConfig = {
  apiKey: "AIzaSyADJFmYWBVFhjGGfIhDLqdHZyz4IepR9qA",
  authDomain: "wajba-3416e.firebaseapp.com",
  projectId: "wajba-3416e",
  storageBucket: "wajba-3416e.firebasestorage.app",
  messagingSenderId: "811665038499",
  appId: "1:811665038499:web:bd1500bac24eadcd913316"
};

/*FB-DB*/
const app = initializeApp(firebaseConfig);
const fs = getFirestore(app);
const auth = getAuth(app);
const chunks = (a, n) => { const r = []; for (let i = 0; i < a.length; i += n) r.push(a.slice(i, i + n)); return r; };
const DB = {
  user() { return auth.currentUser; },
  async login(e, p) { await signInWithEmailAndPassword(auth, e, p); },
  async logout() { await signOut(auth); },
  async resetEmail(e) { await sendPasswordResetEmail(auth, e); },
  async changePassword(oldp, newp) {
    const u = auth.currentUser;
    await reauthenticateWithCredential(u, EmailAuthProvider.credential(u.email, oldp));
    await updatePassword(u, newp);
  },
  async getStudent(id) { const s = await getDoc(doc(fs, "students", id)); return s.exists() ? Object.assign({ id: s.id }, s.data()) : null; },
  async listStudents() { const q = await getDocs(collection(fs, "students")); return q.docs.map(d => Object.assign({ id: d.id }, d.data())); },
  async addStudents(list) {
    for (const c of chunks(list, 400)) {
      const b = writeBatch(fs);
      c.forEach(s => b.set(doc(fs, "students", s.id), { name: s.name, spec: s.spec || "", mode: s.mode || "", batch: s.batch || "" }));
      await b.commit();
    }
  },
  async removeStudents(ids, day) {
    for (const c of chunks(ids, 200)) {
      const b = writeBatch(fs);
      c.forEach(id => { b.delete(doc(fs, "students", id)); b.delete(doc(fs, "meals", day + "_" + id)); });
      await b.commit();
    }
  },
  async getSettings() {
    const r = await Promise.all([getDoc(doc(fs, "settings", "menu")), getDoc(doc(fs, "settings", "window"))]);
    return { menu: r[0].exists() ? r[0].data() : null, win: r[1].exists() ? r[1].data() : null };
  },
  async saveMenu(m) { await setDoc(doc(fs, "settings", "menu"), m); },
  async saveWin(w) { await setDoc(doc(fs, "settings", "window"), w); },
  async hasMeal(day, id) { return (await getDoc(doc(fs, "meals", day + "_" + id))).exists(); },
  async confirmMeal(day, st) {
    await setDoc(doc(fs, "meals", day + "_" + st.id), { id: st.id, date: day, name: st.name, spec: st.spec || "", mode: st.mode || "", batch: st.batch || "", received: false, ts: Date.now() });
  },
  watchMeals(day, cb, onErr) { return onSnapshot(query(collection(fs, "meals"), where("date", "==", day)), s => cb(s.docs.map(d => d.data())), onErr); },
  async setReceived(day, id, v) { await updateDoc(doc(fs, "meals", day + "_" + id), { received: v }); },
  async listPast(day) { const q = await getDocs(query(collection(fs, "meals"), where("date", "<", day))); return q.docs.map(d => d.data()); }
};
/*FB-DB-END*/

(function(){
var mem={};
function load(k,d){try{var v=localStorage.getItem(k);if(v)return JSON.parse(v)}catch(e){}return mem[k]!==undefined?mem[k]:d}
function save(k,v){mem[k]=v;try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var T={
ar:{inst1:"المعهد الوطني المتخصص هاشمي مباركي",inst2:"مطعم المعهد الداخلي",sub:"سجّل غداءك لهذا اليوم",menuTitle:"وجبة اليوم",menuEmpty:"لم تُنشر وجبة اليوم بعد.",idLabel:"رقمك التعريفي",enter:"دخول",notFound:"هذا الرقم غير مسجّل. تواصل مع المشرفة.",hello:"مرحبًا",hint:"اضغط الزر إذا كنت ستتناول الغداء في المعهد اليوم.",confirm:"أؤكد وجبتي لهذا اليوم",done:"تم تأكيد وجبتك ✓",out:"خروج",adminLink:"دخول المشرفة",pwLabel:"كلمة سر المشرفة",back:"رجوع",pwWrong:"كلمة السر غير صحيحة.",todayTitle:"المسجّلون اليوم",meals:"وجبة لهذا اليوم",none:"لا أحد سجّل بعد.",got:"تم الاستلام",recv:"تأكيد الاستلام",menuEdit:"وجبة اليوم",menuHelp:"اكتب كل عنصر في سطر، أو افصل بينها بفاصلة.",menuSave:"نشر الوجبة",menuSaved:"تم نشر وجبة اليوم.",addTitle:"إضافة طالب",addId:"الرقم التعريفي",addName:"الاسم",add:"إضافة",needBoth:"أدخل الرقم والاسم معًا.",exists:"هذا الرقم موجود من قبل.",added:"تمت إضافة",total:"عدد الطلبة المسجّلين في النظام:",histTitle:"الأيام السابقة",noHist:"لا توجد أيام سابقة بعد.",unit:"وجبة",other:"FR",emailLabel:"البريد الإلكتروني",forgot:"نسيت كلمة السر؟",resetSent:"أُرسل رابط إعادة تعيين كلمة السر إلى بريدك. افتح بريدك واتبع الرابط.",needEmail:"أدخل بريدك الإلكتروني أولًا.",needEmailPw:"أدخل البريد وكلمة السر.",loginBad:"البريد أو كلمة السر غير صحيحة.",netErr:"تعذّر الاتصال بالخادم. تحقق من الإنترنت وحاول مجددًا.",permErr:"ليست لديك صلاحية لهذه العملية.",tooMany:"محاولات كثيرة. حاول لاحقًا.",loading:"جارٍ التحميل…",badId:"الرقم التعريفي: أرقام وحروف لاتينية فقط، بدون مسافات.",bulkTitle:"إضافة قائمة طلبة",bulkHelp:"كل طالب في سطر: الرقم، الاسم، التخصص، نمط التكوين، الدفعة (الأخيرة ثلاثة اختيارية).",bulkBtn:"إضافة القائمة",bulkDone:"تمت إضافة {n} طالب.",bulkBad:"لا توجد أسطر صالحة.",bulkPh:"1001، أمل بن علي، مطور ويب، تمهين، 2026",settingsTitle:"الإعدادات",archBtn:"الأرشيف",archTitle:"الأرشيف",archNone:"لا توجد أيام سابقة بعد.",theme:"تبديل الوضع (فاتح / داكن)",stuTitle:"قائمة الطلبة",del:"حذف",delConfirm:"تأكيد الحذف",addBatch:"الدفعة",batchTitle:"حذف دفعة",batchBtn:"حذف الدفعة",batchNone:"لا توجد دفعات مسجّلة بعد.",batchAsk:"سيُحذف {n} طالب من الدفعة {b}. اضغط الزر مرة أخرى للتأكيد.",batchDone:"تم حذف {n} طالب من الدفعة {b}.",delDone:"تم حذف الطالب.",emptyStu:"لا يوجد طلبة.",listCard:"القائمة النهائية",listPrint:"طباعة القائمة",printHint:"تظهر القائمة بعد الضغط على الزر، وهي للمشرفة فقط. إن لم تظهر نافذة الطباعة، افتح الرابط في Chrome مباشرة وأعد المحاولة.",addSpec:"التخصص",addMode:"نمط التكوين",finalTitle:"القائمة النهائية",sheetInst:"المعهد الوطني المتخصص هاشمي مباركي -بوڨطب-",sheetTitle:"قائمة الطلبة المعنيين بوجبة الغداء",sheetDay:"ليوم:",colName:"الاسم",colId:"الرقم",pubBtn:"نشر القائمة",prtBtn:"طباعة القائمة",pubDone:"تم نشر القائمة للطلبة.",prtFail:"تعذّرت الطباعة من هنا. افتح الرابط في المتصفح ثم أعد المحاولة.",pubTitle:"القائمة النهائية لهذا اليوم",settings:"⚙︎ الإعدادات",pwChange:"تغيير كلمة السر",pwOld:"كلمة السر الحالية",pwNew:"كلمة السر الجديدة",pwNew2:"تأكيد كلمة السر الجديدة",pwSave:"حفظ كلمة السر",pwOldBad:"كلمة السر الحالية غير صحيحة.",pwShort:"كلمة السر الجديدة قصيرة (6 أحرف على الأقل).",pwMismatch:"كلمتا السر الجديدتان غير متطابقتين.",pwDone:"تم تغيير كلمة السر.",early:"عذرًا، الموقع يفتح عند الساعة {o}",note:"فترة التسجيل من الساعة {o} إلى {c}",notYet:"التسجيل لم يفتح بعد. يفتح عند الساعة {o}.",closed:"انتهى وقت التسجيل لهذا اليوم ({c}).",winEdit:"وقت التسجيل",winOpen:"يفتح عند",winClose:"يغلق عند",winSave:"حفظ الوقت",winSaved:"تم حفظ الوقت.",winBad:"وقت الإغلاق يجب أن يكون بعد وقت الفتح.",menuPh:"أرز\nدجاج\nسلطة\nعصير\nياغورت"},
fr:{inst1:"Institut National Spécialisé Hachemi Mebarki",inst2:"Restaurant interne de l’institut",sub:"Inscrivez votre repas du jour",menuTitle:"Repas du jour",menuEmpty:"Le repas du jour n’est pas encore publié.",idLabel:"Votre numéro d’identification",enter:"Entrer",notFound:"Ce numéro n’est pas enregistré. Voyez la surveillante.",hello:"Bonjour",hint:"Appuyez sur le bouton si vous mangez à l’institut aujourd’hui.",confirm:"Je confirme mon repas d’aujourd’hui",done:"Votre repas est confirmé ✓",out:"Quitter",adminLink:"Espace surveillante",pwLabel:"Mot de passe de la surveillante",back:"Retour",pwWrong:"Mot de passe incorrect.",todayTitle:"Inscrits aujourd’hui",meals:"repas aujourd’hui",none:"Personne ne s’est encore inscrit.",got:"Remis",recv:"Confirmer la remise",menuEdit:"Repas du jour",menuHelp:"Un élément par ligne, ou séparés par une virgule.",menuSave:"Publier le repas",menuSaved:"Le repas du jour est publié.",addTitle:"Ajouter un étudiant",addId:"Numéro d’identification",addName:"Nom",add:"Ajouter",needBoth:"Saisissez le numéro et le nom.",exists:"Ce numéro existe déjà.",added:"Ajouté :",total:"Étudiants enregistrés dans le système :",histTitle:"Jours précédents",noHist:"Aucun jour précédent pour l’instant.",unit:"repas",other:"عربي",emailLabel:"E-mail",forgot:"Mot de passe oublié ?",resetSent:"Un lien de réinitialisation a été envoyé à votre e-mail. Ouvrez-le et suivez le lien.",needEmail:"Saisissez d’abord votre e-mail.",needEmailPw:"Saisissez l’e-mail et le mot de passe.",loginBad:"E-mail ou mot de passe incorrect.",netErr:"Connexion impossible. Vérifiez votre réseau et réessayez.",permErr:"Opération non autorisée.",tooMany:"Trop de tentatives. Réessayez plus tard.",loading:"Chargement…",badId:"Numéro : chiffres et lettres latines uniquement, sans espaces.",bulkTitle:"Ajouter une liste",bulkHelp:"Un étudiant par ligne : numéro, nom, spécialité, mode, promotion (les trois derniers sont facultatifs).",bulkBtn:"Ajouter la liste",bulkDone:"{n} étudiant(s) ajouté(s).",bulkBad:"Aucune ligne valide.",bulkPh:"1001, Amel Ben Ali, Dév. web, Apprentissage, 2026",settingsTitle:"Paramètres",archBtn:"Archives",archTitle:"Archives",archNone:"Aucun jour précédent pour l’instant.",theme:"Changer de thème (clair / sombre)",stuTitle:"Liste des étudiants",del:"Supprimer",delConfirm:"Confirmer",addBatch:"Promotion",batchTitle:"Supprimer une promotion",batchBtn:"Supprimer la promotion",batchNone:"Aucune promotion enregistrée.",batchAsk:"{n} étudiant(s) de la promotion {b} seront supprimés. Appuyez à nouveau pour confirmer.",batchDone:"{n} étudiant(s) supprimés de la promotion {b}.",delDone:"Étudiant supprimé.",emptyStu:"Aucun étudiant.",listCard:"Liste finale",listPrint:"Imprimer la liste",printHint:"La liste apparaît après avoir appuyé sur le bouton ; elle est réservée à la surveillante. Si la fenêtre d’impression ne s’ouvre pas, ouvrez le lien directement dans Chrome puis réessayez.",addSpec:"Spécialité",addMode:"Mode de formation",finalTitle:"Liste finale",sheetInst:"Institut National Spécialisé Hachemi Mebarki – Bougtoub –",sheetTitle:"Liste des étudiants concernés par le repas du déjeuner",sheetDay:"Pour le :",colName:"Nom",colId:"Numéro",pubBtn:"Publier la liste",prtBtn:"Imprimer la liste",pubDone:"Liste publiée pour les étudiants.",prtFail:"Impression impossible ici. Ouvrez le lien dans le navigateur puis réessayez.",pubTitle:"Liste finale du jour",settings:"⚙︎ Paramètres",pwChange:"Changer le mot de passe",pwOld:"Mot de passe actuel",pwNew:"Nouveau mot de passe",pwNew2:"Confirmer le nouveau mot de passe",pwSave:"Enregistrer",pwOldBad:"Le mot de passe actuel est incorrect.",pwShort:"Mot de passe trop court (6 caractères minimum).",pwMismatch:"Les deux mots de passe ne correspondent pas.",pwDone:"Mot de passe modifié.",early:"Désolé, le site ouvre à {o}.",note:"Période d’inscription : de {o} à {c}",notYet:"Les inscriptions ne sont pas encore ouvertes. Ouverture à {o}.",closed:"Les inscriptions sont closes pour aujourd’hui ({c}).",winEdit:"Horaires d’inscription",winOpen:"Ouverture",winClose:"Fermeture",winSave:"Enregistrer",winSaved:"Horaires enregistrés.",winBad:"L’heure de fermeture doit suivre l’heure d’ouverture.",menuPh:"Riz\nPoulet\nSalade\nJus\nYaourt"}};
var theme=load("wajba_theme","dark");if(theme!=="light")theme="dark";
var lang=load("wajba_lang","ar");if(!T[lang])lang="ar";
function t(k){return T[lang][k]}
var students=[],todayMeals=[],menu={date:"",items:[]},win={open:"08:00",close:"10:00"},unsubMeals=null;
var view="login",current=null,confirmed=false;
function $(i){return document.getElementById(i)}
function fmt(s){var p=s.split(":"),h=+p[0],hh=lang==="ar"?(h%12||12):h;return String(hh).padStart(2,"0")+":"+p[1]+(lang==="ar"?(h<12?" ص":" م"):"")}
function toMin(s){var p=s.split(":");return +p[0]*60+ +p[1]}
function winState(){var d=new Date(),m=d.getHours()*60+d.getMinutes();return m<toMin(win.open)?"before":(m>=toMin(win.close)?"after":"open")}
function winText(s){return t(s==="before"?"notYet":s==="after"?"closed":"note").replace("{o}",fmt(win.open)).replace("{c}",fmt(win.close))}
function pd(n){return String(n).padStart(2,"0")}
function today(){var d=new Date();return d.getFullYear()+"-"+pd(d.getMonth()+1)+"-"+pd(d.getDate())}
function dmy(x){var p=x.split("-");return p[2]+"/"+p[1]+"/"+p[0]}
function normId(s){return String(s||"").replace(/[\u0660-\u0669]/g,function(d){return d.charCodeAt(0)-1632}).replace(/[\u06F0-\u06F9]/g,function(d){return d.charCodeAt(0)-1776}).trim()}
function validId(s){return /^[A-Za-z0-9_-]{1,40}$/.test(s)}
function errText(e){var c=(e&&e.code)||"";
if(c==="permission-denied"||c==="auth/requires-recent-login")return t("permErr");
if(c==="auth/too-many-requests")return t("tooMany");
return t("netErr")}
function loginErr(e){var c=(e&&e.code)||"";
if(c==="auth/network-request-failed"||c==="auth/too-many-requests")return errText(e);
return c.indexOf("auth/")===0?t("loginBad"):errText(e)}
function find(id){for(var i=0;i<students.length;i++)if(students[i].id===id)return students[i];return null}
function byId(a,b){return a.id<b.id?-1:a.id>b.id?1:0}

function show(id){if(id==="login"&&winState()==="before")id="early";view=id;
["early","login","student","admin","alogin"].forEach(function(s){$(s).hidden=s!==id});
$("tadmin").hidden=!(id==="login"||id==="early");$("archbtn").hidden=$("gear").hidden=id!=="admin";
if(id!=="admin")closeDrawer();
$("menucard").hidden=$("wincard").hidden=!(id==="login"||id==="student")}

function todayItems(){return menu.date===today()?menu.items:[]}
function renderMenu(){var it=todayItems(),box=$("menushow");box.textContent="";
it.forEach(function(x){var s=document.createElement("span");s.className="chip";s.textContent=x;box.appendChild(s)});
$("menuempty").hidden=it.length>0;renderNote()}
function renderNote(){$("winnote").textContent=winText("open");$("earlytxt").textContent=t("early").replace("{o}",fmt(win.open))}
async function loadSettings(){try{var s=await DB.getSettings();if(s.menu&&Array.isArray(s.menu.items))menu={date:s.menu.date||"",items:s.menu.items};if(s.win&&s.win.open&&s.win.close)win={open:s.win.open,close:s.win.close}}catch(e){}}

function applyTheme(){document.documentElement.setAttribute("data-theme",theme);document.documentElement.style.colorScheme=theme;$("themebtn").textContent=theme==="dark"?"\u2600\ufe0e":"\u263e\ufe0e";$("themebtn").setAttribute("aria-label",t("theme"))}
function applyLang(){
document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";
[].forEach.call(document.querySelectorAll("[data-i]"),function(e){e.textContent=t(e.getAttribute("data-i"))});
$("langbtn").textContent=t("other");$("menuin").placeholder=t("menuPh");$("bulkin").placeholder=t("bulkPh");
["lmsg","pmsg","amsg","mmsg","bulkmsg"].forEach(function(i){$(i).textContent=""});
applyTheme();renderMenu();
if(view==="student")renderStudent();
if(view==="admin"){renderToday();renderStuList()}}
$("themebtn").onclick=function(){theme=theme==="dark"?"light":"dark";save("wajba_theme",theme);applyTheme()};
$("langbtn").onclick=function(){lang=lang==="ar"?"fr":"ar";save("wajba_lang",lang);applyLang()};

/* ---------- الطالب ---------- */
function renderStudent(){
$("sname").textContent=t("hello")+" "+current.name;
var s=winState();$("confirm").hidden=confirmed||s!=="open";$("sdone").hidden=!confirmed;
$("sstate").textContent=confirmed?"":(s==="open"?t("hint"):winText(s))}
$("enter").onclick=async function(){
var id=normId($("sid").value),m=$("lmsg");if(!id)return;
m.textContent=t("loading");
try{
var st=await DB.getStudent(id);
if(!st){m.textContent=t("notFound");return}
confirmed=await DB.hasMeal(today(),id);
await loadSettings();renderMenu();
current=st;m.textContent="";renderStudent();show("student");
}catch(e){m.textContent=errText(e)}};
$("sid").onkeydown=function(e){if(e.key==="Enter")$("enter").onclick()};
$("confirm").onclick=async function(){
if(winState()!=="open"){renderStudent();return}
var b=$("confirm");b.disabled=true;
try{await DB.confirmMeal(today(),current);confirmed=true}
catch(e){$("sstate").textContent=errText(e);b.disabled=false;return}
b.disabled=false;renderStudent()};
$("sout").onclick=function(){current=null;confirmed=false;$("sid").value="";show("login")};

/* ---------- المشرفة: الدخول ---------- */
async function enterAdmin(){
try{students=(await DB.listStudents()).sort(byId)}catch(e){$("pmsg").className="msg err";$("pmsg").textContent=errText(e);show("alogin");return}
$("menuin").value=todayItems().join("\n");$("mmsg").textContent="";
$("topen").value=win.open;$("tclose").value=win.close;$("tmsg").textContent="";
clearPend();$("bmsg").textContent="";$("archcard").hidden=true;closeDrawer();$("sheet").hidden=true;
if(unsubMeals)unsubMeals();
unsubMeals=DB.watchMeals(today(),function(arr){todayMeals=arr.slice().sort(function(a,b){return (a.ts||0)-(b.ts||0)});if(view==="admin")renderToday()},function(){});
show("admin");renderStuList();renderToday()}
$("tadmin").onclick=function(){$("pw").value="";$("pmsg").textContent="";
if(DB.user()){enterAdmin()}else show("alogin")};
$("aback").onclick=function(){show("login")};
$("aenter").onclick=async function(){
var em=$("aemail").value.trim(),pw=$("pw").value,m=$("pmsg");
if(!em||!pw){m.className="msg err";m.textContent=t("needEmailPw");return}
m.className="msg";m.textContent=t("loading");
try{await DB.login(em,pw);m.textContent="";$("pw").value="";await enterAdmin()}
catch(e){m.className="msg err";m.textContent=loginErr(e)}};
$("pw").onkeydown=function(e){if(e.key==="Enter")$("aenter").onclick()};
$("forgot").onclick=async function(){
var em=$("aemail").value.trim(),m=$("pmsg");
if(!em){m.className="msg err";m.textContent=t("needEmail");return}
try{await DB.resetEmail(em);m.className="msg";m.textContent=t("resetSent")}
catch(e){m.className="msg err";m.textContent=errText(e)}};
$("aout").onclick=async function(){
if(unsubMeals){unsubMeals();unsubMeals=null}
try{await DB.logout()}catch(e){}
show("login");renderMenu()};

/* ---------- المشرفة: قائمة اليوم ---------- */
function renderToday(){
var d=todayMeals;
$("cnt").textContent=d.length;$("cntlbl").textContent=d.length?t("meals"):t("none");
var ul=$("list");ul.textContent="";
d.forEach(function(r){var li=document.createElement("li");if(r.received)li.className="got";
var n=document.createElement("span");n.textContent=(r.name||"؟")+" ";
var num=document.createElement("span");num.className="num";num.textContent=r.id;n.appendChild(num);
var b=document.createElement("button");b.className="small ghost";b.textContent=r.received?t("got"):t("recv");
b.onclick=async function(){try{await DB.setReceived(today(),r.id,!r.received)}catch(e){}};
li.appendChild(n);li.appendChild(b);ul.appendChild(li)})}

/* ---------- الإعدادات ---------- */
function openDrawer(){$("drawer").hidden=false;$("drawerbg").hidden=false}
function closeDrawer(){$("drawer").hidden=true;$("drawerbg").hidden=true}
$("gear").onclick=function(){if($("drawer").hidden)openDrawer();else closeDrawer();$("psmsg").textContent=""};
[].forEach.call(document.querySelectorAll("details.acc"),function(d){d.addEventListener("toggle",function(){if(d.open)[].forEach.call(document.querySelectorAll("details.acc"),function(o){if(o!==d)o.open=false})})});
$("dclose").onclick=closeDrawer;$("drawerbg").onclick=closeDrawer;

$("menusave").onclick=async function(){
var items=$("menuin").value.split(/[\n,،]+/).map(function(s){return s.trim()}).filter(Boolean),m=$("mmsg");
var nm={date:today(),items:items};
try{await DB.saveMenu(nm);menu=nm;renderMenu();m.className="msg";m.textContent=t("menuSaved")}
catch(e){m.className="msg err";m.textContent=errText(e)}};
$("tsave").onclick=async function(){var o=$("topen").value,c=$("tclose").value,m=$("tmsg");
if(!o||!c||toMin(o)>=toMin(c)){m.className="msg err";m.textContent=t("winBad");return}
try{await DB.saveWin({open:o,close:c});win={open:o,close:c};m.className="msg";m.textContent=t("winSaved");renderNote()}
catch(e){m.className="msg err";m.textContent=errText(e)}};
$("psave").onclick=async function(){var o=$("pold").value,n=$("pnew").value,n2=$("pnew2").value,m=$("psmsg");m.className="msg err";
if(n.length<6){m.textContent=t("pwShort");return}
if(n!==n2){m.textContent=t("pwMismatch");return}
try{await DB.changePassword(o,n);$("pold").value="";$("pnew").value="";$("pnew2").value="";m.className="msg";m.textContent=t("pwDone")}
catch(e){var c=(e&&e.code)||"";m.textContent=(c==="auth/invalid-credential"||c==="auth/wrong-password")?t("pwOldBad"):errText(e)}};

/* ---------- الطلبة ---------- */
var pendDel=null,pendBatch=null,pendT=null;
function clearPend(){pendDel=null;pendBatch=null}
function armClear(){clearTimeout(pendT);pendT=setTimeout(function(){clearPend();$("bmsg").textContent="";if(view==="admin")renderStuList()},5000)}
async function removeStudents(ids){await DB.removeStudents(ids,today());students=students.filter(function(x){return ids.indexOf(x.id)<0})}
function renderStuList(){
var ul=$("slist");ul.textContent="";
if(!students.length){var e=document.createElement("li");e.textContent=t("emptyStu");ul.appendChild(e)}
students.forEach(function(st){var li=document.createElement("li");
var n=document.createElement("span");n.textContent=st.name+" ";var num=document.createElement("span");num.className="num";num.textContent=st.id+(st.batch?" \u00b7 "+st.batch:"");n.appendChild(num);
var b=document.createElement("button");b.className="small ghost";b.textContent=pendDel===st.id?t("delConfirm"):t("del");
b.onclick=async function(){
if(pendDel===st.id){
try{await removeStudents([st.id]);clearPend();renderStuList();$("bmsg").textContent=t("delDone")}catch(e){$("bmsg").textContent=errText(e)}
}else{pendBatch=null;pendDel=st.id;$("bmsg").textContent="";armClear();renderStuList()}};
li.appendChild(n);li.appendChild(b);ul.appendChild(li)});
var sel=$("batchsel"),cur=sel.value;sel.textContent="";
var bs=[];students.forEach(function(x){if(x.batch&&bs.indexOf(x.batch)<0)bs.push(x.batch)});
bs.sort();bs.forEach(function(v){var o=document.createElement("option");o.value=v;o.textContent=v;sel.appendChild(o)});
if(bs.indexOf(cur)>=0)sel.value=cur;
$("bdel").hidden=!bs.length;sel.hidden=!bs.length;$("bnone").hidden=bs.length>0;
$("total").textContent=t("total")+" "+students.length}
$("bdel").onclick=async function(){var v=$("batchsel").value;if(!v)return;
var ids=students.filter(function(x){return x.batch===v}).map(function(x){return x.id}),m=$("bmsg");
if(pendBatch===v){
try{await removeStudents(ids);clearPend();renderStuList();m.textContent=t("batchDone").replace("{n}",ids.length).replace("{b}",v)}catch(e){m.textContent=errText(e)}
}else{pendDel=null;pendBatch=v;armClear();m.textContent=t("batchAsk").replace("{n}",ids.length).replace("{b}",v);renderStuList()}};
$("batchsel").onchange=function(){clearPend();$("bmsg").textContent="";renderStuList()};

$("add").onclick=async function(){
var id=normId($("nid").value),nm=$("nname").value.trim(),m=$("amsg");m.className="msg err";
if(!id||!nm){m.textContent=t("needBoth");return}
if(!validId(id)){m.textContent=t("badId");return}
if(find(id)){m.textContent=t("exists");return}
var st={id:id,name:nm,spec:$("nspec").value.trim(),mode:$("nmode").value.trim(),batch:$("nbatch").value.trim()};
try{await DB.addStudents([st]);students.push(st);students.sort(byId);
["nid","nname","nspec","nmode","nbatch"].forEach(function(i){$(i).value=""});
m.className="msg";m.textContent=t("added")+" "+nm;renderStuList()}
catch(e){m.textContent=errText(e)}};
$("bulkbtn").onclick=async function(){
var m=$("bulkmsg");m.className="msg err";var seen={},list=[];
$("bulkin").value.split(/\r?\n/).forEach(function(line){
var p=line.split(/[,\u060c;\t]/).map(function(x){return x.trim()});var id=normId(p[0]);
if(!id||!p[1]||!validId(id)||find(id)||seen[id])return;seen[id]=1;
list.push({id:id,name:p[1],spec:p[2]||"",mode:p[3]||"",batch:p[4]||""})});
if(!list.length){m.textContent=t("bulkBad");return}
try{await DB.addStudents(list);list.forEach(function(s){students.push(s)});students.sort(byId);
$("bulkin").value="";m.className="msg";m.textContent=t("bulkDone").replace("{n}",list.length);renderStuList()}
catch(e){m.textContent=errText(e)}};

/* ---------- الطباعة والأرشيف ---------- */
function renderSheet(){
var dt=new Date();$("sdate").textContent="ليوم: "+pd(dt.getDate())+"/"+pd(dt.getMonth()+1)+"/"+dt.getFullYear();
var b=$("stbody");b.textContent="";
todayMeals.forEach(function(r){var tr=document.createElement("tr");
[r.name||"؟",r.id,r.spec||"—",r.mode||"—"].forEach(function(v){var td=document.createElement("td");td.textContent=v;tr.appendChild(td)});b.appendChild(tr)});
if(!todayMeals.length){var tr=document.createElement("tr"),td=document.createElement("td");td.colSpan=4;td.textContent="لا يوجد طلبة مسجّلون.";tr.appendChild(td);b.appendChild(tr)}}
$("printbtn").onclick=function(){renderSheet();$("sheet").hidden=false;setTimeout(function(){try{window.print()}catch(e){}},150)};
function renderArchive(rows){
var by={};rows.forEach(function(r){(by[r.date]=by[r.date]||[]).push(r)});
var days=Object.keys(by).sort().reverse(),ul=$("archlist");ul.textContent="";$("archnone").hidden=days.length>0;
days.forEach(function(x){var li=document.createElement("li");
var a=document.createElement("span");a.className="num";a.textContent=dmy(x);
var c=document.createElement("span");c.textContent=by[x].length+" "+t("unit");
var nm=document.createElement("div");nm.className="arch-names";nm.hidden=true;
nm.textContent=by[x].map(function(r){return r.name||r.id}).join(" \u00b7 ");
li.onclick=function(){nm.hidden=!nm.hidden};
li.appendChild(a);li.appendChild(c);li.appendChild(nm);ul.appendChild(li)})}
$("archbtn").onclick=async function(){var c=$("archcard");c.hidden=!c.hidden;
if(!c.hidden){try{renderArchive(await DB.listPast(today()))}catch(e){$("archlist").textContent="";$("archnone").hidden=false;$("archnone").textContent=errText(e)}}};

/* ---------- البدء ---------- */
show("login");applyLang();
loadSettings().then(function(){renderMenu();if(view==="login"||view==="early")show("login")});
setInterval(function(){renderNote();if(view==="student")renderStudent();if(view==="early"&&winState()!=="before")show("login")},30000);
if(document.addEventListener)document.addEventListener("visibilitychange",function(){if(document.visibilityState==="visible"&&(view==="login"||view==="early"))loadSettings().then(function(){renderMenu();show("login")})});
})();

