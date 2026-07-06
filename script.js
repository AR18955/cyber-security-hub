// Client-side SPA navigation and simulated auth + verification
(function(){
  // Utilities
  const qs = s => document.querySelector(s);
  const qsa = s => Array.from(document.querySelectorAll(s));

  // Storage keys
  const USERS_KEY = 'csh_users';
  const CURRENT_KEY = 'csh_current';

  function loadUsers(){
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') }
    catch(e){ return [] }
  }
  function saveUsers(u){ localStorage.setItem(USERS_KEY, JSON.stringify(u)) }

  function setCurrent(email){ localStorage.setItem(CURRENT_KEY, email || '') }
  function getCurrent(){ return localStorage.getItem(CURRENT_KEY) || '' }

  // Simple code generator
  function genCode(){ return Math.floor(100000 + Math.random()*900000).toString() }

  // Render navigation pages
  function showPage(name){
    qsa('.page').forEach(el => el.classList.add('hidden'));
    const target = qs('#' + name);
    if(target) target.classList.remove('hidden');
    // update active links
    qsa('.nav-link').forEach(a => a.classList.toggle('font-semibold', a.dataset.route===name));
  }

  // Update account status display
  function updateAccountStatus(){
    const cur = getCurrent();
    const statusEl = qs('#accountStatus');
    if(!cur){ statusEl.textContent = 'Not signed in'; return }
    const users = loadUsers();
    const u = users.find(x=>x.email===cur);
    if(!u) { statusEl.textContent = 'Not signed in'; return }
    statusEl.innerHTML = `${u.email} <span class="text-sm text-slate-500">(${u.verified? 'verified' : 'unverified'})</span>`;
    const vb = qs('#verifiedBanner');
    if(u.verified) vb.classList.remove('hidden'); else vb.classList.add('hidden');
  }

  // Render auth forms
  function renderAuth(){
    const container = qs('#authForms');
    container.innerHTML = '';
    const cur = getCurrent();
    if(cur){
      const users = loadUsers();
      const u = users.find(x=>x.email===cur);
      const el = document.createElement('div');
      el.innerHTML = `\n        <h3 class="text-lg font-semibold">Signed in as ${u.email}</h3>\n        <p class="text-sm text-slate-600">Status: ${u.verified? 'Verified' : 'Unverified'}</p>\n        <div class="auth-actions">\n          <button id=signOut class="btn-outline">Sign out</button>\n        </div>`;
      container.appendChild(el);
      qs('#signOut').addEventListener('click', ()=>{ setCurrent(''); renderAuth(); updateAccountStatus(); showPage('home') });
      return;
    }

    // Tabs: Login / Signup
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <div class="flex gap-2 mb-4">
        <button id="tabLogin" class="px-3 py-1 rounded bg-slate-100">Login</button>
        <button id="tabSignup" class="px-3 py-1 rounded">Signup</button>
      </div>
      <div id="formsArea"></div>
    `;
    container.appendChild(wrap);
    const formsArea = qs('#formsArea');

    function showLogin(){
      formsArea.innerHTML = `
        <label class="block text-left">Email<input id="loginEmail" class="auth-input" type="email"/></label>
        <label class="block text-left">Password<input id="loginPass" class="auth-input" type="password"/></label>
        <div class="auth-actions"> <button id="doLogin" class="btn-primary">Login</button> </div>
        <div id="loginMsg" class="mt-3"></div>
      `;
      qs('#doLogin').addEventListener('click', ()=>{
        const email = qs('#loginEmail').value.trim();
        const pass = qs('#loginPass').value;
        const users = loadUsers();
        const u = users.find(x=>x.email===email);
        const msg = qs('#loginMsg');
        if(!u || u.password!==pass){ msg.innerHTML = '<div class="msg msg-error">Invalid credentials</div>'; return }
        // if verified, sign in
        if(u.verified){ setCurrent(email); renderAuth(); updateAccountStatus(); showPage('home'); msg.innerHTML = '<div class="msg msg-success">Signed in</div>'; return }
        // else start verification
        u.code = genCode(); saveUsers(users);
        msg.innerHTML = `<div class="msg msg-info">Verification code sent to ${mask(email)} — code: <strong>${u.code}</strong></div>`;
        showVerification(email);
      });
    }

    function showSignup(){
      formsArea.innerHTML = `
        <label class="block text-left">Email<input id="signupEmail" class="auth-input" type="email"/></label>
        <label class="block text-left">Password<input id="signupPass" class="auth-input" type="password"/></label>
        <label class="block text-left">Confirm Password<input id="signupPass2" class="auth-input" type="password"/></label>
        <div class="auth-actions"> <button id="doSignup" class="btn-primary">Create account</button> </div>
        <div id="signupMsg" class="mt-3"></div>
      `;
      qs('#doSignup').addEventListener('click', ()=>{
        const email = qs('#signupEmail').value.trim();
        const p1 = qs('#signupPass').value; const p2 = qs('#signupPass2').value;
        const msg = qs('#signupMsg');
        if(!email || !p1){ msg.innerHTML = '<div class="msg msg-error">Provide email and password</div>'; return }
        if(p1!==p2){ msg.innerHTML = '<div class="msg msg-error">Passwords do not match</div>'; return }
        const users = loadUsers();
        if(users.find(x=>x.email===email)){ msg.innerHTML = '<div class="msg msg-error">Account exists — try login</div>'; return }
        const code = genCode();
        users.push({email,password:p1,verified:false,code});
        saveUsers(users);
        msg.innerHTML = `<div class="msg msg-info">Verification code sent to ${mask(email)} — code: <strong>${code}</strong></div>`;
        showVerification(email);
      });
    }

    qs('#tabLogin').addEventListener('click', ()=>{ showLogin(); qs('#tabLogin').classList.add('bg-slate-100'); qs('#tabSignup').classList.remove('bg-slate-100') });
    qs('#tabSignup').addEventListener('click', ()=>{ showSignup(); qs('#tabSignup').classList.add('bg-slate-100'); qs('#tabLogin').classList.remove('bg-slate-100') });
    // default
    showLogin();
  }

  function mask(email){
    const parts = email.split('@');
    const name = parts[0];
    return name[0] + '***@' + (parts[1]||'');
  }

  function showVerification(email){
    const container = qs('#authForms');
    container.innerHTML = `
      <h3 class="text-lg font-semibold">Verify ${mask(email)}</h3>
      <p class="text-sm text-slate-600">Enter the 6-digit code sent to your email (simulation).</p>
      <input id="verifyCode" class="auth-input" placeholder="123456" />
      <div class="auth-actions"> <button id="doVerify" class="btn-primary">Verify</button> <button id="doResend" class="btn-outline">Resend</button> </div>
      <div id="verifyMsg" class="mt-3"></div>
    `;
    qs('#doVerify').addEventListener('click', ()=>{
      const code = qs('#verifyCode').value.trim();
      const users = loadUsers();
      const u = users.find(x=>x.email===email);
      const msg = qs('#verifyMsg');
      if(!u){ msg.innerHTML = '<div class="msg msg-error">Account not found</div>'; return }
      if(u.code===code){ u.verified = true; u.code = null; saveUsers(users); setCurrent(email); renderAuth(); updateAccountStatus(); showPage('home'); msg.innerHTML = '<div class="msg msg-success">Verified — welcome!</div>'; return }
      msg.innerHTML = '<div class="msg msg-error">Invalid code</div>';
    });
    qs('#doResend').addEventListener('click', ()=>{
      const users = loadUsers();
      const u = users.find(x=>x.email===email);
      if(u){ u.code = genCode(); saveUsers(users); qs('#verifyMsg').innerHTML = `<div class="msg msg-info">Code resent — code: <strong>${u.code}</strong></div>` }
    });
  }

  // Roadmap loader (protected)
  function loadRoadmap(){
    const cur = getCurrent();
    const content = qs('#roadmapContent');
    if(!cur){ content.innerHTML = '<p class="text-slate-600">Please sign in and verify to view the roadmap.</p>'; return }
    const users = loadUsers(); const u = users.find(x=>x.email===cur);
    if(!u || !u.verified){ content.innerHTML = '<p class="text-slate-600">Your account is not verified. Go to Account to verify.</p>'; return }
    content.innerHTML = `
      <ol class="list-decimal pl-6 space-y-3 text-slate-700">
        <li><strong>Q3:</strong> Redesign + Authentication flow (completed)</li>
        <li><strong>Q4:</strong> Add user-specific resources and notes</li>
        <li><strong>Next:</strong> Integrate backend for persistent auth</li>
      </ol>
    `;
  }

  // Navigation wiring
  function wireNav(){
    qsa('[data-route]').forEach(a => a.addEventListener('click', (e)=>{
      e.preventDefault(); const r = a.dataset.route;
      if(r==='roadmap'){
        const cur = getCurrent(); const users = loadUsers(); const u = users.find(x=>x.email===cur);
        if(!u || !u.verified){ showPage('account'); renderAuth(); qs('#authForms').insertAdjacentHTML('beforeend', '<div class="mt-3 msg msg-info">You must verify your account to view Roadmap.</div>'); return }
      }
      showPage(r);
      if(r==='roadmap') loadRoadmap();
    }))
    // mobile toggle
    qs('#mobileToggle').addEventListener('click', ()=> qs('#mobileMenu').classList.toggle('hidden'))
    // quick buttons
    qs('#goRoadmap').addEventListener('click', ()=> document.querySelector('[data-route="roadmap"]').click());
    qs('#goLinks').addEventListener('click', ()=> showPage('links'));
  }

  // Init
  function init(){
    renderAuth(); wireNav(); updateAccountStatus(); showPage('home');
    // mark nav links
    qsa('.nav-link').forEach(a=>a.addEventListener('click', ()=> qsa('.nav-link').forEach(x=>x.classList.remove('font-semibold'))));
  }

  // Expose a small API for dev
  window.__csh = {loadUsers, saveUsers, setCurrent, getCurrent};

  document.addEventListener('DOMContentLoaded', init);
})();
