
(function(){
var pass="1234"; // كلمة سر تجريبية، تُستبدل لاحقًا بنظام دخول حقيقي
var mem={};
function load(k,d){try{var v=localStorage.getItem(k);if(v)return JSON.parse(v)}catch(e){}return mem[k]!==undefined?mem[k]:d}
function save(k,v){mem[k]=v;try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
pass=load("wajba_pass","1234");
var T={
ar:{inst1:"المعهد الوطني المتخصص هاشمي مباركي",inst2:"مطعم المعهد الداخلي",sub:"سجّل غداءك لهذا اليوم",menuTitle:"وجبة اليوم",menuEmpty:"لم تُنشر وجبة اليوم بعد.",idLabel:"رقمك التعريفي",enter:"دخول",notFound:"هذا الرقم غير مسجّل. تواصل مع المشرفة.",hello:"مرحبًا",hint:"اضغط الزر إذا كنت ستتناول الغداء في المعهد اليوم.",confirm:"أؤكد وجبتي لهذا اليوم",done:"تم تأكيد وجبتك ✓",out:"خروج",adminLink:"دخول المشرفة",pwLabel:"كلمة سر المشرفة",back:"رجوع",pwWrong:"كلمة السر غير صحيحة.",todayTitle:"المسجّلون اليوم",meals:"وجبة لهذا اليوم",none:"لا أحد سجّل بعد.",got:"تم الاستلام",recv:"تأكيد الاستلام",menuEdit:"وجبة اليوم",menuHelp:"اكتب كل عنصر في سطر، أو افصل بينها بفاصلة.",menuSave:"نشر الوجبة",menuSaved:"تم نشر وجبة اليوم.",addTitle:"إضافة طالب",addId:"الرقم التعريفي",addName:"الاسم",add:"إضافة",needBoth:"أدخل الرقم والاسم معًا.",exists:"هذا الرقم موجود من قبل.",added:"تمت إضافة",total:"عدد الطلبة المسجّلين في النظام:",histTitle:"الأيام السابقة",noHist:"لا توجد أيام سابقة بعد.",unit:"وجبة",other:"FR",settingsTitle:"الإعدادات",archBtn:"الأرشيف",archTitle:"الأرشيف",archNone:"لا توجد أيام سابقة بعد.",theme:"تبديل الوضع (فاتح / داكن)",stuTitle:"قائمة الطلبة",del:"حذف",delConfirm:"تأكيد الحذف",addBatch:"الدفعة",batchTitle:"حذف دفعة",batchBtn:"حذف الدفعة",batchNone:"لا توجد دفعات مسجّلة بعد.",batchAsk:"سيُحذف {n} طالب من الدفعة {b}. اضغط الزر مرة أخرى للتأكيد.",batchDone:"تم حذف {n} طالب من الدفعة {b}.",delDone:"تم حذف الطالب.",emptyStu:"لا يوجد طلبة.",listCard:"القائمة النهائية",listPrint:"طباعة القائمة",printHint:"تظهر القائمة بعد الضغط على الزر، وهي للمشرفة فقط. إن لم تظهر نافذة الطباعة، افتح الرابط في Chrome مباشرة وأعد المحاولة.",addSpec:"التخصص",addMode:"نمط التكوين",finalTitle:"القائمة النهائية",sheetInst:"المعهد الوطني المتخصص هاشمي مباركي -بوڨطب-",sheetTitle:"قائمة الطلبة المعنيين بوجبة الغداء",sheetDay:"ليوم:",colName:"الاسم",colId:"الرقم",pubBtn:"نشر القائمة",prtBtn:"طباعة القائمة",pubDone:"تم نشر القائمة للطلبة.",prtFail:"تعذّرت الطباعة من هنا. افتح الرابط في المتصفح ثم أعد المحاولة.",pubTitle:"القائمة النهائية لهذا اليوم",settings:"⚙︎ الإعدادات",pwChange:"تغيير كلمة السر",pwOld:"كلمة السر الحالية",pwNew:"كلمة السر الجديدة",pwNew2:"تأكيد كلمة السر الجديدة",pwSave:"حفظ كلمة السر",pwOldBad:"كلمة السر الحالية غير صحيحة.",pwShort:"كلمة السر الجديدة قصيرة (4 أحرف على الأقل).",pwMismatch:"كلمتا السر الجديدتان غير متطابقتين.",pwDone:"تم تغيير كلمة السر.",early:"عذرًا، الموقع يفتح عند الساعة {o}",note:"فترة التسجيل من الساعة {o} إلى {c}",notYet:"التسجيل لم يفتح بعد. يفتح عند الساعة {o}.",closed:"انتهى وقت التسجيل لهذا اليوم ({c}).",winEdit:"وقت التسجيل",winOpen:"يفتح عند",winClose:"يغلق عند",winSave:"حفظ الوقت",winSaved:"تم حفظ الوقت.",winBad:"وقت الإغلاق يجب أن يكون بعد وقت الفتح.",menuPh:"أرز\nدجاج\nسلطة\nعصير\nياغورت"},
fr:{inst1:"Institut National Spécialisé Hachemi Mebarki",inst2:"Restaurant interne de l’institut",sub:"Inscrivez votre repas du jour",menuTitle:"Repas du jour",menuEmpty:"Le repas du jour n’est pas encore publié.",idLabel:"Votre numéro d’identification",enter:"Entrer",notFound:"Ce numéro n’est pas enregistré. Voyez la surveillante.",hello:"Bonjour",hint:"Appuyez sur le bouton si vous mangez à l’institut aujourd’hui.",confirm:"Je confirme mon repas d’aujourd’hui",done:"Votre repas est confirmé ✓",out:"Quitter",adminLink:"Espace surveillante",pwLabel:"Mot de passe de la surveillante",back:"Retour",pwWrong:"Mot de passe incorrect.",todayTitle:"Inscrits aujourd’hui",meals:"repas aujourd’hui",none:"Personne ne s’est encore inscrit.",got:"Remis",recv:"Confirmer la remise",menuEdit:"Repas du jour",menuHelp:"Un élément par ligne, ou séparés par une virgule.",menuSave:"Publier le repas",menuSaved:"Le repas du jour est publié.",addTitle:"Ajouter un étudiant",addId:"Numéro d’identification",addName:"Nom",add:"Ajouter",needBoth:"Saisissez le numéro et le nom.",exists:"Ce numéro existe déjà.",added:"Ajouté :",total:"Étudiants enregistrés dans le système :",histTitle:"Jours précédents",noHist:"Aucun jour précédent pour l’instant.",unit:"repas",other:"عربي",settingsTitle:"Paramètres",archBtn:"Archives",archTitle:"Archives",archNone:"Aucun jour précédent pour l’instant.",theme:"Changer de thème (clair / sombre)",stuTitle:"Liste des étudiants",del:"Supprimer",delConfirm:"Confirmer",addBatch:"Promotion",batchTitle:"Supprimer une promotion",batchBtn:"Supprimer la promotion",batchNone:"Aucune promotion enregistrée.",batchAsk:"{n} étudiant(s) de la promotion {b} seront supprimés. Appuyez à nouveau pour confirmer.",batchDone:"{n} étudiant(s) supprimés de la promotion {b}.",delDone:"Étudiant supprimé.",emptyStu:"Aucun étudiant.",listCard:"Liste finale",listPrint:"Imprimer la liste",printHint:"La liste apparaît après avoir appuyé sur le bouton ; elle est réservée à la surveillante. Si la fenêtre d’impression ne s’ouvre pas, ouvrez le lien directement dans Chrome puis réessayez.",addSpec:"Spécialité",addMode:"Mode de formation",finalTitle:"Liste finale",sheetInst:"Institut National Spécialisé Hachemi Mebarki – Bougtoub –",sheetTitle:"Liste des étudiants concernés par le repas du déjeuner",sheetDay:"Pour le :",colName:"Nom",colId:"Numéro",pubBtn:"Publier la liste",prtBtn:"Imprimer la liste",pubDone:"Liste publiée pour les étudiants.",prtFail:"Impression impossible ici. Ouvrez le lien dans le navigateur puis réessayez.",pubTitle:"Liste finale du jour",settings:"⚙︎ Paramètres",pwChange:"Changer le mot de passe",pwOld:"Mot de passe actuel",pwNew:"Nouveau mot de passe",pwNew2:"Confirmer le nouveau mot de passe",pwSave:"Enregistrer",pwOldBad:"Le mot de passe actuel est incorrect.",pwShort:"Mot de passe trop court (4 caractères minimum).",pwMismatch:"Les deux mots de passe ne correspondent pas.",pwDone:"Mot de passe modifié.",early:"Désolé, le site ouvre à {o}.",note:"Période d’inscription : de {o} à {c}",notYet:"Les inscriptions ne sont pas encore ouvertes. Ouverture à {o}.",closed:"Les inscriptions sont closes pour aujourd’hui ({c}).",winEdit:"Horaires d’inscription",winOpen:"Ouverture",winClose:"Fermeture",winSave:"Enregistrer",winSaved:"Horaires enregistrés.",winBad:"L’heure de fermeture doit suivre l’heure d’ouverture.",menuPh:"Riz\nPoulet\nSalade\nJus\nYaourt"}};
var theme=load("wajba_theme","dark");if(theme!=="light")theme="dark";
var lang=load("wajba_lang","ar");if(!T[lang])lang="ar";
function t(k){return T[lang][k]}
var students=load("wajba_students",[{id:"1001",name:"أمل بن علي",spec:"مطور ويب وموبايل",mode:"تمهين"},{id:"1002",name:"يوسف مرزوق",spec:"مطور ويب وموبايل",mode:"حضوري"},{id:"1003",name:"سارة قداري",spec:"مطور ويب وموبايل",mode:"تمهين"}]);
var meals=load("wajba_meals",{});
var menu=load("wajba_menu",{date:"",items:[]});
var win=load("wajba_win",{open:"08:00",close:"10:00"});
function fmt(s){var p=s.split(":"),h=+p[0],hh=lang==="ar"?(h%12||12):h;return String(hh).padStart(2,"0")+":"+p[1]+(lang==="ar"?(h<12?" ص":" م"):"")}
function toMin(s){var p=s.split(":");return +p[0]*60+ +p[1]}
function winState(){var d=new Date(),m=d.getHours()*60+d.getMinutes();return m<toMin(win.open)?"before":(m>=toMin(win.close)?"after":"open")}
function winText(s){return t(s==="before"?"notYet":s==="after"?"closed":"note").replace("{o}",fmt(win.open)).replace("{c}",fmt(win.close))}
function today(){var d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function $(i){return document.getElementById(i)}
var view="login",current=null;
function show(id){if(id==="login"&&winState()==="before")id="early";view=id;["early","login","student","admin","alogin"].forEach(function(s){$(s).hidden=s!==id});$("tadmin").hidden=!(id==="login"||id==="early");$("archbtn").hidden=$("gear").hidden=id!=="admin";if(id!=="admin")closeDrawer();$("menucard").hidden=$("wincard").hidden=!(id==="login"||id==="student")}
function find(id){for(var i=0;i<students.length;i++)if(students[i].id===id)return students[i];return null}
function todayItems(){return menu.date===today()?menu.items:[]}

function renderMenu(){
var it=todayItems(),box=$("menushow");box.textContent="";
it.forEach(function(x){var s=document.createElement("span");s.className="chip";s.textContent=x;box.appendChild(s)});
$("menuempty").hidden=it.length>0;renderNote()}
function renderNote(){$("winnote").textContent=winText("open");$("earlytxt").textContent=t("early").replace("{o}",fmt(win.open))}

function applyLang(){
document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";
[].forEach.call(document.querySelectorAll("[data-i]"),function(e){e.textContent=t(e.getAttribute("data-i"))});
$("langbtn").textContent=t("other");$("menuin").placeholder=t("menuPh");
$("lmsg").textContent="";$("pmsg").textContent="";$("amsg").textContent="";$("mmsg").textContent="";
applyTheme();renderMenu();
if(view==="student")renderStudent();
if(view==="admin")renderAdmin()}
function applyTheme(){document.documentElement.setAttribute("data-theme",theme);document.documentElement.style.colorScheme=theme;$("themebtn").textContent=theme==="dark"?"\u2600\ufe0e":"\u263e\ufe0e";$("themebtn").setAttribute("aria-label",t("theme"))}
$("themebtn").onclick=function(){theme=theme==="dark"?"light":"dark";save("wajba_theme",theme);applyTheme()};
$("langbtn").onclick=function(){lang=lang==="ar"?"fr":"ar";save("wajba_lang",lang);applyLang()};

$("enter").onclick=function(){
var id=$("sid").value.trim();var st=find(id);
if(!st){$("lmsg").textContent=t("notFound");return}
$("lmsg").textContent="";current=st;renderStudent();show("student")};
$("sid").onkeydown=function(e){if(e.key==="Enter")$("enter").onclick()};

function renderStudent(){
$("sname").textContent=t("hello")+" "+current.name;
var ok=!!(meals[today()]||{})[current.id];
var s=winState();$("confirm").hidden=ok||s!=="open";$("sdone").hidden=!ok;
$("sstate").textContent=ok?"":(s==="open"?t("hint"):winText(s))}
$("confirm").onclick=function(){
if(winState()!=="open"){renderStudent();return}
var k=today();meals[k]=meals[k]||{};
meals[k][current.id]={received:false};save("wajba_meals",meals);renderStudent()};
$("sout").onclick=function(){current=null;$("sid").value="";show("login")};

$("tadmin").onclick=function(){$("pw").value="";$("pmsg").textContent="";show("alogin")};
$("aback").onclick=function(){show("login")};
$("aenter").onclick=function(){
if($("pw").value!==pass){$("pmsg").textContent=t("pwWrong");return}
$("menuin").value=todayItems().join("\n");$("mmsg").textContent="";
$("topen").value=win.open;$("tclose").value=win.close;$("tmsg").textContent="";clearPend();$("bmsg").textContent="";$("archcard").hidden=true;closeDrawer();$("sheet").hidden=true;show("admin");renderAdmin()};
$("pw").onkeydown=function(e){if(e.key==="Enter")$("aenter").onclick()};
$("aout").onclick=function(){show("login");renderMenu()};

$("menusave").onclick=function(){
var items=$("menuin").value.split(/[\n,،]+/).map(function(s){return s.trim()}).filter(Boolean);
menu={date:today(),items:items};save("wajba_menu",menu);renderMenu();$("mmsg").textContent=t("menuSaved")};

$("tsave").onclick=function(){var o=$("topen").value,c=$("tclose").value;
if(!o||!c||toMin(o)>=toMin(c)){$("tmsg").className="msg err";$("tmsg").textContent=t("winBad");return}
win={open:o,close:c};save("wajba_win",win);$("tmsg").className="msg";$("tmsg").textContent=t("winSaved");renderNote()};

function openDrawer(){$("drawer").hidden=false;$("drawerbg").hidden=false}
function closeDrawer(){$("drawer").hidden=true;$("drawerbg").hidden=true}
$("gear").onclick=function(){if($("drawer").hidden)openDrawer();else closeDrawer();$("psmsg").textContent=""};
[].forEach.call(document.querySelectorAll("details.acc"),function(d){d.addEventListener("toggle",function(){if(d.open)[].forEach.call(document.querySelectorAll("details.acc"),function(o){if(o!==d)o.open=false})})});
$("dclose").onclick=closeDrawer;$("drawerbg").onclick=closeDrawer;
$("psave").onclick=function(){var o=$("pold").value,n=$("pnew").value,n2=$("pnew2").value,m=$("psmsg");m.className="msg err";
if(o!==pass){m.textContent=t("pwOldBad");return}
if(n.length<4){m.textContent=t("pwShort");return}
if(n!==n2){m.textContent=t("pwMismatch");return}
pass=n;save("wajba_pass",pass);$("pold").value="";$("pnew").value="";$("pnew2").value="";m.className="msg";m.textContent=t("pwDone")};


function pd(n){return String(n).padStart(2,"0")}
function renderSheet(){
var dt=new Date();$("sdate").textContent="ليوم: "+pd(dt.getDate())+"/"+pd(dt.getMonth()+1)+"/"+dt.getFullYear();
var ids=Object.keys(meals[today()]||{}),b=$("stbody");b.textContent="";
ids.forEach(function(id){var st=find(id)||{};var tr=document.createElement("tr");
[st.name||"؟",id,st.spec||"—",st.mode||"—"].forEach(function(v){var td=document.createElement("td");td.textContent=v;tr.appendChild(td)});b.appendChild(tr)});
if(!ids.length){var tr=document.createElement("tr"),td=document.createElement("td");td.colSpan=4;td.textContent="لا يوجد طلبة مسجّلون.";tr.appendChild(td);b.appendChild(tr)}}
$("printbtn").onclick=function(){renderSheet();$("sheet").hidden=false;setTimeout(function(){try{window.print()}catch(e){}},150)};

var pendDel=null,pendBatch=null,pendT=null;
function clearPend(){pendDel=null;pendBatch=null}
function armClear(){clearTimeout(pendT);pendT=setTimeout(function(){clearPend();$("bmsg").textContent="";if(view==="admin")renderStuList()},5000)}
function removeStudents(ids){students=students.filter(function(x){return ids.indexOf(x.id)<0});save("wajba_students",students);var d=meals[today()];if(d){ids.forEach(function(i){delete d[i]});save("wajba_meals",meals)}}
function renderStuList(){
var ul=$("slist");ul.textContent="";
if(!students.length){var e=document.createElement("li");e.textContent=t("emptyStu");ul.appendChild(e)}
students.forEach(function(st){var li=document.createElement("li");
var n=document.createElement("span");n.textContent=st.name+" ";var num=document.createElement("span");num.className="num";num.textContent=st.id+(st.batch?" · "+st.batch:"");n.appendChild(num);
var b=document.createElement("button");b.className="small ghost";b.textContent=pendDel===st.id?t("delConfirm"):t("del");
b.onclick=function(){if(pendDel===st.id){removeStudents([st.id]);clearPend();renderAdmin();$("bmsg").textContent=t("delDone")}else{pendBatch=null;pendDel=st.id;$("bmsg").textContent="";armClear();renderStuList()}};
li.appendChild(n);li.appendChild(b);ul.appendChild(li)});
var sel=$("batchsel"),cur=sel.value;sel.textContent="";
var bs=[];students.forEach(function(x){if(x.batch&&bs.indexOf(x.batch)<0)bs.push(x.batch)});
bs.sort();bs.forEach(function(v){var o=document.createElement("option");o.value=v;o.textContent=v;sel.appendChild(o)});
if(bs.indexOf(cur)>=0)sel.value=cur;
$("bdel").hidden=!bs.length;sel.hidden=!bs.length;$("bnone").hidden=bs.length>0}
$("bdel").onclick=function(){var v=$("batchsel").value;if(!v)return;
var ids=students.filter(function(x){return x.batch===v}).map(function(x){return x.id});var m=$("bmsg");
if(pendBatch===v){removeStudents(ids);clearPend();renderAdmin();m.textContent=t("batchDone").replace("{n}",ids.length).replace("{b}",v)}
else{pendDel=null;pendBatch=v;armClear();m.textContent=t("batchAsk").replace("{n}",ids.length).replace("{b}",v);renderStuList()}};
$("batchsel").onchange=function(){clearPend();$("bmsg").textContent="";renderStuList()};

function dmy(x){var p=x.split("-");return p[2]+"/"+p[1]+"/"+p[0]}
function renderArchive(){
var days=Object.keys(meals).filter(function(x){return x!==today()}).sort().reverse();
var ul=$("archlist");ul.textContent="";$("archnone").hidden=days.length>0;
days.forEach(function(x){var li=document.createElement("li");
var a=document.createElement("span");a.className="num";a.textContent=dmy(x);
var ids=Object.keys(meals[x]);var c=document.createElement("span");c.textContent=ids.length+" "+t("unit");
var nm=document.createElement("div");nm.className="arch-names";nm.hidden=true;
nm.textContent=ids.map(function(i){var st=find(i);return st?st.name:i}).join(" \u00b7 ");
li.onclick=function(){nm.hidden=!nm.hidden};
li.appendChild(a);li.appendChild(c);li.appendChild(nm);ul.appendChild(li)})}
$("archbtn").onclick=function(){var c=$("archcard");c.hidden=!c.hidden;if(!c.hidden)renderArchive()};

function renderAdmin(){renderStuList();
var d=meals[today()]||{};var ids=Object.keys(d);
$("cnt").textContent=ids.length;
$("cntlbl").textContent=ids.length?t("meals"):t("none");
var ul=$("list");ul.textContent="";
ids.forEach(function(id){
var st=find(id);var li=document.createElement("li");if(d[id].received)li.className="got";
var n=document.createElement("span");n.textContent=(st?st.name:"؟")+" ";
var num=document.createElement("span");num.className="num";num.textContent=id;n.appendChild(num);
var b=document.createElement("button");b.className="small ghost";b.textContent=d[id].received?t("got"):t("recv");
b.onclick=function(){d[id].received=!d[id].received;save("wajba_meals",meals);renderAdmin()};
li.appendChild(n);li.appendChild(b);ul.appendChild(li)});
$("total").textContent=t("total")+" "+students.length;
}

$("add").onclick=function(){
var id=$("nid").value.trim(),nm=$("nname").value.trim();
if(!id||!nm){$("amsg").textContent=t("needBoth");$("amsg").className="msg err";return}
if(find(id)){$("amsg").textContent=t("exists");$("amsg").className="msg err";return}
students.push({id:id,name:nm,spec:$("nspec").value.trim(),mode:$("nmode").value.trim(),batch:$("nbatch").value.trim()});save("wajba_students",students);
$("nid").value="";$("nname").value="";$("nspec").value="";$("nmode").value="";$("nbatch").value="";$("amsg").className="msg";$("amsg").textContent=t("added")+" "+nm;renderAdmin()};

show("login");applyLang();
setInterval(function(){renderNote();if(view==="student")renderStudent();if(view==="early"&&winState()!=="before")show("login")},30000);
})();

