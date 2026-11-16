const y=JSON.parse(document.getElementById("boot").textContent),k=y.api,L=y.titles;let n=structuredClone(y.data),f=JSON.stringify(n),h="schedule",S="",i="";try{i=sessionStorage.getItem("admt")||"",sessionStorage.removeItem("adm")}catch{}top!==self&&(document.body.innerHTML="");const r=a=>document.querySelector(a),l=a=>String(a??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),N=["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"];function g(){const a=new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Barnaul"})),t=[0,1,2,3,4,5,6].map(s=>{const c=new Date(a.getFullYear(),a.getMonth()+s,1),o=N[c.getMonth()],u=String(c.getFullYear());return{month:o,year:u,label:`${o[0].toUpperCase()+o.slice(1)} ${u}`}}),e=n.schedule;return e.month&&!t.some(s=>s.month===e.month&&s.year===e.year)&&t.unshift({month:e.month,year:e.year||"",label:`${e.month[0].toUpperCase()+e.month.slice(1)} ${e.year||""} (сейчас на сайте)`.trim()}),t}const P={Пн:"Понедельник",Вт:"Вторник",Ср:"Среда",Чт:"Четверг",Пт:"Пятница",Сб:"Суббота",Вс:"Воскресенье"},v=a=>a.split(".").reduce((t,e)=>t?.[e],n),x=(a,t)=>{const e=a.split("."),s=e.pop(),c=e.reduce((o,u)=>o[u],n);c[s]=t},d=(a,t,e={})=>`<label class="f ${e.wide?"wide":""}"><span>${a}</span><input type="${e.type||"text"}" data-path="${t}" value="${l(v(t))}" placeholder="${l(e.ph||"")}">${e.hint?`<small>${e.hint}</small>`:""}</label>`;function C(){const a=n.schedule;return`
        <section class="card blk general">
          <h2>Месяц</h2>
          <div>
            <div class="f wide"><span>Расписание на</span>
              <details class="mpick">
                <summary><span>${l((g().find(t=>t.month===a.month&&t.year===a.year)||{label:a.month}).label)}</span><i aria-hidden="true">▾</i></summary>
                <div class="mlist" role="listbox" aria-label="Месяц расписания">
                  ${g().map(t=>`<button type="button" role="option" aria-selected="${t.month===a.month&&t.year===a.year}" data-month="${l(t.month)}" data-year="${l(t.year)}">${l(t.label)}</button>`).join("")}
                </div>
              </details>
            </div>
          </div>
        </section>
        ${a.days.map((t,e)=>`
          <section class="card blk day">
            <h2>${l(P[t.day]||t.day)}</h2>
            ${t.classes.length?"":'<p class="soft">Занятий нет</p>'}
            ${t.classes.map((s,c)=>{const o=`schedule.days.${e}.classes.${c}`;return`<details class="cls" ${S===o?"open":""} data-key="${o}">
                <summary><b class="num">${l(s.time)}</b><span>${l(s.title)||"<i>без названия</i>"}</span><em>${l(s.teacher||"—")}</em></summary>
                <div class="cls-row">
                  ${d("Время",`${o}.time`,{type:"time"})}
                  ${d("Минут",`${o}.dur`,{type:"number"})}
                  <label class="f"><span>Ведёт</span><select data-path="${o}.teacher">
                    ${["Мария","Евгений",""].map($=>`<option value="${$}" ${s.teacher===$?"selected":""}>${$||"без ведущего"}</option>`).join("")}
                  </select></label>
                </div>
                ${d("Название",`${o}.title`,{wide:!0})}
                ${d("Примечание (по желанию)",`${o}.note`,{wide:!0,ph:"например: оплата — любая сумма"})}
                <button class="del" type="button" data-del="schedule.days.${e}.classes" data-i="${c}">Удалить занятие</button>
              </details>`}).join("")}
            <button class="add" type="button" data-add-class="${e}">+ Добавить занятие</button>
          </section>`).join("")}`}function m(a,t,e){const s=n.hallPrices[t];return`<section class="card blk">
        <h2>${a}</h2>
        ${s.map((c,o)=>`<div class="cls">
          ${d("Что",`hallPrices.${t}.${o}.what`,{wide:!0})}
          <div class="cls-row">
            ${d("Цена",`hallPrices.${t}.${o}.price`,{ph:"500 ₽"})}
            ${e?d("Срок / примечание",`hallPrices.${t}.${o}.note`,{ph:"действует 4 недели"}):""}
          </div>
          <button class="del" type="button" data-del="hallPrices.${t}" data-i="${o}">Удалить строку</button>
        </div>`).join("")}
        <button class="add" type="button" data-add-row="${t}">+ Добавить строку</button>
      </section>`}function O(){const a=n.hallPrices.discounts;return m("Разовые занятия","single",!1)+m("Абонементы","passes",!0)+m("Индивидуальные","personal",!0)+`
        <section class="card blk">
          <h2>Скидка 20%</h2>
          <p class="soft">Каждая строка продолжает фразу «Скидка 20%: …».</p>
          ${a.map((t,e)=>`<div class="cls">${d(`Кому ${e+1}`,`hallPrices.discounts.${e}`,{wide:!0})}<button class="del" type="button" data-del="hallPrices.discounts" data-i="${e}">Удалить</button></div>`).join("")}
          <button class="add" type="button" data-add-disc>+ Добавить скидку</button>
        </section>`}function A(){return Object.entries(n.retreats).map(([a,t])=>{const e=`retreats.${l(a)}`;return`<section class="card blk">
          <div class="rhead"><h2>${l(L[a]||a)}</h2>
            <label class="sw"><input type="checkbox" data-path="${e}.show" ${t.show?"checked":""}><span>Показывать на сайте</span></label></div>
          <div class="grid2">
            ${d("Даты",`${e}.dates`,{ph:"5–6 декабря"})}
            ${d("Год",`${e}.year`,{ph:"2026"})}
            ${d("Цена",`${e}.price`,{ph:"2 500 ₽ за день"})}
            ${d("Скидка / примечание к цене",`${e}.priceNote`)}
          </div>
          ${d("Про места (если пусто — не показывается)",`${e}.seats`,{wide:!0,ph:"5 декабря все места заняты, на 6 декабря запись открыта"})}
          ${t.runs?`<h3>Заезды</h3>
            ${t.runs.map((s,c)=>`<div class="cls">${d(`Заезд ${c+1}`,`${e}.runs.${c}`,{wide:!0,ph:"13–20 июня"})}<button class="del" type="button" data-del="${e}.runs" data-i="${c}">Удалить заезд</button></div>`).join("")}
            <button class="add" type="button" data-add-run="${l(a)}">+ Добавить заезд</button>`:`<div class="grid2">
            ${d("Текст кнопки оплаты",`${e}.payLabel`)}
            ${d("Ссылка на оплату (Продамус)",`${e}.payLink`,{type:"url",hint:"Вида https://link.payform.ru/?paymentLinkId=…"})}
          </div>`}
        </section>`}).join("")}function w(){document.querySelectorAll("[data-tab]").forEach(a=>a.setAttribute("aria-selected",String(a.dataset.tab===h))),r("#body").innerHTML=h==="schedule"?C():h==="prices"?O():A(),p()}const b=()=>JSON.stringify(n)!==f;function p(a,t=""){const e=r("#status");r("#save").disabled=!b(),e.className=`status ${t}`,e.textContent=a??(b()?"Есть несохранённые изменения":"Изменений нет")}r("#body").addEventListener("input",a=>{const t=a.target,e=t.dataset.path;if(!e)return;x(e,t.type==="checkbox"?t.checked:t.type==="number"?Number(t.value):t.value),p();const s=t.closest("details.cls");if(s){const c=v(s.dataset.key);s.querySelector("summary").innerHTML=`<b class="num">${l(c.time)}</b><span>${l(c.title)||"<i>без названия</i>"}</span><em>${l(c.teacher||"—")}</em>`}});r("#body").addEventListener("click",a=>{const t=a.target.closest("button");if(t){if(t.dataset.month)n.schedule.month=t.dataset.month,n.schedule.year=t.dataset.year;else if(t.dataset.del){if(!confirm("Удалить?"))return;v(t.dataset.del).splice(Number(t.dataset.i),1)}else if(t.dataset.addClass){const e=n.schedule.days[Number(t.dataset.addClass)].classes;e.push({time:"19:00",dur:55,title:"",teacher:"Мария"}),S=`schedule.days.${t.dataset.addClass}.classes.${e.length-1}`}else if(t.dataset.addRow){const e=t.dataset.addRow;n.hallPrices[e].push(e==="single"?{what:"",price:""}:{what:"",price:"",note:""})}else if("addDisc"in t.dataset)n.hallPrices.discounts.push("");else if(t.dataset.addRun)n.retreats[t.dataset.addRun].runs.push("");else return;w()}});document.querySelectorAll("[data-tab]").forEach(a=>a.addEventListener("click",()=>{h=a.dataset.tab,w(),scrollTo(0,0)}));document.addEventListener("click",a=>{const t=document.querySelector("details.mpick[open]");t&&!t.contains(a.target)&&(t.open=!1)});document.addEventListener("keydown",a=>{a.key==="Escape"&&document.querySelector("details.mpick[open]")?.removeAttribute("open")});addEventListener("beforeunload",a=>{b()&&a.preventDefault()});async function j(a,t){const e=await fetch(`${k}?action=${a.slice(1)}`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)}),s=await e.json().catch(()=>({}));if(!e.ok)throw Object.assign(new Error(s.error||"Не получилось связаться с сервером"),{status:e.status});return s}async function E(){r("#login").hidden=!0,r("#app").hidden=!1;try{const a=await fetch(`${k}?action=data`,{cache:"no-store"});a.ok&&(n=await a.json(),f=JSON.stringify(n))}catch{}w()}r("#loginForm").addEventListener("submit",async a=>{a.preventDefault();const t=r("#pw").value,e=r("#loginErr");e.textContent="";try{i=(await j("/login",{password:t})).token;try{sessionStorage.setItem("admt",i)}catch{}r("#pw").value="",E()}catch(s){e.textContent=s.message}});r("#save").addEventListener("click",async()=>{const a=r("#save");a.disabled=!0,p("Сохраняю…");try{await j("/save",{token:i,data:n}),f=JSON.stringify(n),p("Сохранено. Сайт обновится в течение пары минут.","ok")}catch(t){const e=t;if(e.status===401){i="";try{sessionStorage.removeItem("admt")}catch{}r("#app").hidden=!0,r("#login").hidden=!1,r("#loginErr").textContent="Войдите ещё раз";return}p(e.message,"bad"),a.disabled=!1}});i&&E();
