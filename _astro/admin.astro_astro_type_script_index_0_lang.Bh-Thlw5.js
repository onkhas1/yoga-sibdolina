const C=JSON.parse(document.getElementById("boot").textContent),j=C.api,D=C.titles;let r=structuredClone(C.data),L=JSON.stringify(r),m="schedule",O="",u="";try{u=sessionStorage.getItem("admt")||"",sessionStorage.removeItem("adm")}catch{}top!==self&&(document.body.innerHTML="");const n=a=>document.querySelector(a),l=a=>String(a??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),I=["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"];function P(){const a=new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Barnaul"})),t=[0,1,2,3,4,5,6].map(s=>{const c=new Date(a.getFullYear(),a.getMonth()+s,1),o=I[c.getMonth()],d=String(c.getFullYear());return{month:o,year:d,label:`${o[0].toUpperCase()+o.slice(1)} ${d}`}}),e=r.schedule;return e.month&&!t.some(s=>s.month===e.month&&s.year===e.year)&&t.unshift({month:e.month,year:e.year||"",label:`${e.month[0].toUpperCase()+e.month.slice(1)} ${e.year||""} (сейчас на сайте)`.trim()}),t}const M={Пн:"Понедельник",Вт:"Вторник",Ср:"Среда",Чт:"Четверг",Пт:"Пятница",Сб:"Суббота",Вс:"Воскресенье"},N=a=>a.split(".").reduce((t,e)=>t?.[e],r),R=(a,t)=>{const e=a.split("."),s=e.pop(),c=e.reduce((o,d)=>o[d],r);c[s]=t},i=(a,t,e={})=>`<label class="f ${e.wide?"wide":""}"><span>${a}</span><input type="${e.type||"text"}" data-path="${t}" value="${l(N(t))}" placeholder="${l(e.ph||"")}">${e.hint?`<small>${e.hint}</small>`:""}</label>`;function T(){const a=r.schedule;return`
        <section class="card blk general">
          <h2>Месяц</h2>
          <div>
            <div class="f wide"><span>Расписание на</span>
              <details class="mpick">
                <summary><span>${l((P().find(t=>t.month===a.month&&t.year===a.year)||{label:a.month}).label)}</span><i aria-hidden="true">▾</i></summary>
                <div class="mlist" role="listbox" aria-label="Месяц расписания">
                  ${P().map(t=>`<button type="button" role="option" aria-selected="${t.month===a.month&&t.year===a.year}" data-month="${l(t.month)}" data-year="${l(t.year)}">${l(t.label)}</button>`).join("")}
                </div>
              </details>
            </div>
          </div>
        </section>
        ${a.days.map((t,e)=>`
          <section class="card blk day">
            <h2>${l(M[t.day]||t.day)}</h2>
            ${t.classes.length?"":'<p class="soft">Занятий нет</p>'}
            ${t.classes.map((s,c)=>{const o=`schedule.days.${e}.classes.${c}`;return`<details class="cls" ${O===o?"open":""} data-key="${o}">
                <summary><b class="num">${l(s.time)}</b><span>${l(s.title)||"<i>без названия</i>"}</span><em>${l(s.teacher||"—")}</em></summary>
                <div class="cls-row">
                  ${i("Время",`${o}.time`,{type:"time"})}
                  ${i("Минут",`${o}.dur`,{type:"number"})}
                  <label class="f"><span>Ведёт</span><select data-path="${o}.teacher">
                    ${["Мария","Евгений",""].map(h=>`<option value="${h}" ${s.teacher===h?"selected":""}>${h||"без ведущего"}</option>`).join("")}
                  </select></label>
                </div>
                ${i("Название",`${o}.title`,{wide:!0})}
                ${i("Примечание (по желанию)",`${o}.note`,{wide:!0,ph:"например: оплата — любая сумма"})}
                <button class="del" type="button" data-del="schedule.days.${e}.classes" data-i="${c}">Удалить занятие</button>
              </details>`}).join("")}
            <button class="add" type="button" data-add-class="${e}">+ Добавить занятие</button>
          </section>`).join("")}`}function k(a,t,e){const s=r.hallPrices[t];return`<section class="card blk">
        <h2>${a}</h2>
        ${s.map((c,o)=>`<div class="cls">
          ${i("Что",`hallPrices.${t}.${o}.what`,{wide:!0})}
          <div class="cls-row">
            ${i("Цена",`hallPrices.${t}.${o}.price`,{ph:"500 ₽"})}
            ${e?i("Срок / примечание",`hallPrices.${t}.${o}.note`,{ph:"действует 4 недели"}):""}
          </div>
          <button class="del" type="button" data-del="hallPrices.${t}" data-i="${o}">Удалить строку</button>
        </div>`).join("")}
        <button class="add" type="button" data-add-row="${t}">+ Добавить строку</button>
      </section>`}function J(){const a=r.hallPrices.discounts;return k("Разовые занятия","single",!1)+k("Абонементы","passes",!0)+k("Индивидуальные","personal",!0)+`
        <section class="card blk">
          <h2>Скидки</h2>
          <p class="soft">Скидки с одинаковым процентом на сайте идут одной строкой, например «Скидка 20%: членам одной семьи, в месяц дня рождения».</p>
          ${a.map((t,e)=>`<div class="cls">
            <div class="cls-row disc">
              ${i("Процент",`hallPrices.discounts.${e}.pct`,{type:"number",ph:"20"})}
              ${i("Кому или на что",`hallPrices.discounts.${e}.what`,{ph:"членам одной семьи на абонементы"})}
            </div>
            <button class="del" type="button" data-del="hallPrices.discounts" data-i="${e}">Удалить скидку</button>
          </div>`).join("")}
          <button class="add" type="button" data-add-disc>+ Добавить скидку</button>
        </section>`}function U(){return Object.entries(r.retreats).map(([a,t])=>{const e=`retreats.${l(a)}`;return`<section class="card blk">
          <div class="rhead"><h2>${l(D[a]||a)}</h2>
            <label class="sw"><input type="checkbox" data-path="${e}.show" ${t.show?"checked":""}><span>Показывать на сайте</span></label></div>
          <div class="grid2">
            ${i("Даты",`${e}.dates`,{ph:"5–6 декабря"})}
            ${i("Год",`${e}.year`,{ph:"2026"})}
            ${i("Цена",`${e}.price`,{ph:"2 500 ₽ за день"})}
            ${i("Скидка / примечание к цене",`${e}.priceNote`)}
          </div>
          ${i("Свободные места (если пусто, на сайте не показывается)",`${e}.seats`,{wide:!0,ph:"5 декабря все места заняты, на 6 декабря запись открыта"})}
          ${t.runs?`<h3>Заезды</h3>
            ${t.runs.map((s,c)=>`<div class="cls">${i(`Заезд ${c+1}`,`${e}.runs.${c}`,{wide:!0,ph:"13–20 июня"})}<button class="del" type="button" data-del="${e}.runs" data-i="${c}">Удалить заезд</button></div>`).join("")}
            <button class="add" type="button" data-add-run="${l(a)}">+ Добавить заезд</button>`:`<div class="grid2">
            ${i("Текст кнопки оплаты",`${e}.payLabel`)}
            ${i("Ссылка на оплату (Продамус)",`${e}.payLink`,{type:"url",hint:"Вида https://link.payform.ru/?paymentLinkId=…"})}
          </div>`}
        </section>`}).join("")}function $(){document.querySelectorAll("[data-tab]").forEach(a=>a.setAttribute("aria-selected",String(a.dataset.tab===m))),n("#body").innerHTML=m==="schedule"?T():m==="prices"?J():m==="leads"?H():U(),n(".savebar").hidden=m==="leads",y()}const A=["новая","связалась","записалась","отказ"];let p=null,v="",S=!1;const F=a=>new Date(a).toLocaleString("ru-RU",{timeZone:"Asia/Barnaul",day:"numeric",month:"long",hour:"2-digit",minute:"2-digit"});async function B(){if(!S){S=!0,v="";try{p=(await f("/leads",{token:u})).leads}catch(a){const t=a;if(t.status===401)return x();v=t.message,p=[]}finally{S=!1,m==="leads"&&$()}}}function H(){if(p===null)return B(),'<section class="card blk"><p class="soft">Загружаю заявки…</p></section>';const a=p.filter(e=>e.status==="новая").length,t=`<section class="card blk"><h2>Заявки с сайта</h2>
        <p class="soft">${p.length?`Всего ${p.length}${a?`, новых ${a}`:""}. `:""}Заявки хранятся год, потом удаляются сами.</p>
        ${v?`<p class="err">${l(v)}</p>`:""}
        <button class="add" type="button" data-leads-reload>Обновить список</button></section>`;return p.length?t+p.map(e=>`<section class="card blk leadc" data-lead="${l(e.id)}">
        <div class="rhead"><h2>${l(e.name)}</h2><span class="badge st-${A.indexOf(e.status)}">${l(e.status)}</span></div>
        <p class="soft">${l(F(e.createdAt))}</p>
        <p><a href="tel:${l(e.phone.replace(/[^\d+]/g,""))}">${l(e.phone)}</a> · связь: ${l(e.contact)}${e.contactValue?` — ${l(e.contactValue)}`:""}</p>
        <ul class="picks">${e.picks.map(s=>`<li>${l(s)}</li>`).join("")}</ul>
        <div class="cls-row lst">
          <label class="f"><span>Статус</span><select data-lead-status>${A.map(s=>`<option ${s===e.status?"selected":""}>${s}</option>`).join("")}</select></label>
          <label class="f"><span>Заметка</span><input data-lead-note value="${l(e.note)}" maxlength="500" placeholder="например: перезвонить в пятницу"></label>
        </div>
        <div class="lead-actions"><button class="btn" type="button" data-lead-save>Сохранить статус</button><button class="del" type="button" data-lead-del>Удалить заявку</button><span class="lead-msg" role="status"></span></div>
      </section>`).join(""):t+(v?"":'<section class="card blk"><p class="soft">Заявок пока нет.</p></section>')}function x(){u="";try{sessionStorage.removeItem("admt")}catch{}n("#app").hidden=!0,n("#login").hidden=!1,n("#loginErr").textContent="Войдите ещё раз"}n("#body").addEventListener("click",async a=>{const t=a.target.closest("button");if(!t)return;if("leadsReload"in t.dataset){p=null,$();return}const e=t.closest("[data-lead]");if(!e)return;const s=e.dataset.lead,c=e.querySelector(".lead-msg");if("leadSave"in t.dataset){const o=e.querySelector("[data-lead-status]").value,d=e.querySelector("[data-lead-note]").value;t.disabled=!0,c.textContent="Сохраняю…";try{await f("/lead-status",{token:u,id:s,status:o,note:d});const h=p.find(w=>w.id===s);h.status=o,h.note=d,$()}catch(h){const w=h;if(w.status===401)return x();c.textContent=w.message,t.disabled=!1}}else if("leadDel"in t.dataset){if(!confirm("Удалить заявку насовсем?"))return;try{await f("/lead-delete",{token:u,id:s}),p=p.filter(o=>o.id!==s),$()}catch(o){const d=o;if(d.status===401)return x();c.textContent=d.message}}});const E=()=>JSON.stringify(r)!==L;function y(a,t=""){const e=n("#status");n("#save").disabled=!E(),e.className=`status ${t}`,e.textContent=a??(E()?"Есть несохранённые изменения":"Изменений нет")}n("#body").addEventListener("input",a=>{const t=a.target,e=t.dataset.path;if(!e)return;R(e,t.type==="checkbox"?t.checked:t.type==="number"?Number(t.value):t.value),y();const s=t.closest("details.cls");if(s){const c=N(s.dataset.key);s.querySelector("summary").innerHTML=`<b class="num">${l(c.time)}</b><span>${l(c.title)||"<i>без названия</i>"}</span><em>${l(c.teacher||"—")}</em>`}});n("#body").addEventListener("click",a=>{const t=a.target.closest("button");if(t){if(t.dataset.month)r.schedule.month=t.dataset.month,r.schedule.year=t.dataset.year;else if(t.dataset.del){if(!confirm("Удалить? Изменение попадёт на сайт после «Сохранить»."))return;N(t.dataset.del).splice(Number(t.dataset.i),1)}else if(t.dataset.addClass){const e=r.schedule.days[Number(t.dataset.addClass)].classes;e.push({time:"19:00",dur:55,title:"",teacher:"Мария"}),O=`schedule.days.${t.dataset.addClass}.classes.${e.length-1}`}else if(t.dataset.addRow){const e=t.dataset.addRow;r.hallPrices[e].push(e==="single"?{what:"",price:""}:{what:"",price:"",note:""})}else if("addDisc"in t.dataset)r.hallPrices.discounts.push({pct:20,what:""});else if(t.dataset.addRun)r.retreats[t.dataset.addRun].runs.push("");else return;$()}});document.querySelectorAll("[data-tab]").forEach(a=>a.addEventListener("click",()=>{m=a.dataset.tab,$(),scrollTo(0,0)}));document.addEventListener("click",a=>{const t=document.querySelector("details.mpick[open]");t&&!t.contains(a.target)&&(t.open=!1)});document.addEventListener("keydown",a=>{a.key==="Escape"&&document.querySelector("details.mpick[open]")?.removeAttribute("open")});addEventListener("beforeunload",a=>{E()&&a.preventDefault()});async function f(a,t){const e=await fetch(`${j}?action=${a.slice(1)}`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)}),s=await e.json().catch(()=>({}));if(!e.ok)throw Object.assign(new Error(s.error||"Не получилось связаться с сервером"),{status:e.status});return s}async function q(){n("#login").hidden=!0,n("#app").hidden=!1;try{const a=await fetch(`${j}?action=data`,{cache:"no-store"});a.ok&&(r=await a.json(),L=JSON.stringify(r))}catch{}$()}n("#loginForm").addEventListener("submit",async a=>{a.preventDefault();const t=n("#pw").value,e=n("#loginErr");if(e.textContent="",!j){e.textContent="Сервер пока не подключён, войти нельзя. Напишите Саше.";return}try{u=(await f("/login",{password:t})).token;try{sessionStorage.setItem("admt",u)}catch{}n("#pw").value="",q()}catch(s){e.textContent=s.message}});n("#save").addEventListener("click",async()=>{const a=n("#save");a.disabled=!0,y("Сохраняю…");try{await f("/save",{token:u,data:r}),L=JSON.stringify(r),y("Сохранено. На сайте изменения появятся через 1–2 минуты.","ok")}catch(t){const e=t;if(e.status===401){u="";try{sessionStorage.removeItem("admt")}catch{}n("#app").hidden=!0,n("#login").hidden=!1,n("#loginErr").textContent="Войдите ещё раз";return}y(e.message,"bad"),a.disabled=!1}});const g=n("#pwd"),b=["#pwCur","#pwNew","#pwNew2"].map(a=>n(a));function V(){const a="abcdefghijkmnpqrstuvwxyz23456789",t=new Uint32Array(16);return crypto.getRandomValues(t),Array.from(t,e=>a[e%a.length]).join("").match(/.{4}/g).join("-")}n("#pwdOpen").addEventListener("click",()=>{b.forEach(a=>{a.value="",a.type="password"}),n("#pwErr").textContent="",n("#pwShow").hidden=!0,g.showModal(),b[0].focus()});n("#pwCancel").addEventListener("click",()=>g.close());n("#pwGen").addEventListener("click",()=>{const a=V();b[1].value=a,b[2].value=a;const t=n("#pwShow"),e=document.createElement("b");e.textContent=a,t.replaceChildren("Новый пароль: ",e,". Запишите его и нажмите «Сменить»."),t.hidden=!1});n("#pwdForm").addEventListener("submit",async a=>{a.preventDefault();const[t,e,s]=b.map(d=>d.value),c=n("#pwErr");if(c.textContent="",e.length<12){c.textContent="Новый пароль — от 12 символов";return}if(e!==s){c.textContent="Новые пароли не совпадают";return}const o=n("#pwSave");o.disabled=!0;try{u=(await f("/password",{token:u,current:t,next:e})).token;try{sessionStorage.setItem("admt",u)}catch{}g.close(),y("Пароль изменён. В следующий раз входите с новым.","ok")}catch(d){const h=d;if(h.status===401){g.close(),u="";try{sessionStorage.removeItem("admt")}catch{}n("#app").hidden=!0,n("#login").hidden=!1,n("#loginErr").textContent="Войдите ещё раз";return}c.textContent=h.message}finally{o.disabled=!1,b.forEach(d=>d.value=d===b[0]?"":d.value)}});u&&q();
