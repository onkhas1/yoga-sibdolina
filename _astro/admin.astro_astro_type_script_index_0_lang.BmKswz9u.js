const y=JSON.parse(document.getElementById("boot").textContent),k=y.api,j=y.titles;let d=structuredClone(y.data),m=JSON.stringify(d),p="schedule",S="",u="";try{u=sessionStorage.getItem("adm")||""}catch{}const c=s=>document.querySelector(s),o=s=>String(s??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),P={Пн:"Понедельник",Вт:"Вторник",Ср:"Среда",Чт:"Четверг",Пт:"Пятница",Сб:"Суббота",Вс:"Воскресенье"},f=s=>s.split(".").reduce((t,e)=>t?.[e],d),N=(s,t)=>{const e=s.split("."),a=e.pop(),r=e.reduce((l,w)=>l[w],d);r[a]=t},n=(s,t,e={})=>`<label class="f ${e.wide?"wide":""}"><span>${s}</span><input type="${e.type||"text"}" data-path="${t}" value="${o(f(t))}" placeholder="${o(e.ph||"")}">${e.hint?`<small>${e.hint}</small>`:""}</label>`;function x(){const s=d.schedule;return`
        <section class="card blk general">
          <h2>Общее</h2>
          <div class="grid2">
            ${n("Расписание на (месяц)","schedule.month",{ph:"декабрь"})}
          </div>
        </section>
        ${s.days.map((t,e)=>`
          <section class="card blk day">
            <h2>${P[t.day]||t.day}</h2>
            ${t.classes.length?"":'<p class="soft">Занятий нет</p>'}
            ${t.classes.map((a,r)=>{const l=`schedule.days.${e}.classes.${r}`;return`<details class="cls" ${S===l?"open":""} data-key="${l}">
                <summary><b class="num">${o(a.time)}</b><span>${o(a.title)||"<i>без названия</i>"}</span><em>${o(a.teacher||"—")}</em></summary>
                <div class="cls-row">
                  ${n("Время",`${l}.time`,{type:"time"})}
                  ${n("Минут",`${l}.dur`,{type:"number"})}
                  <label class="f"><span>Ведёт</span><select data-path="${l}.teacher">
                    ${["Мария","Евгений",""].map(h=>`<option value="${h}" ${a.teacher===h?"selected":""}>${h||"без ведущего"}</option>`).join("")}
                  </select></label>
                </div>
                ${n("Название",`${l}.title`,{wide:!0})}
                ${n("Примечание (по желанию)",`${l}.note`,{wide:!0,ph:"например: оплата — любая сумма"})}
                <button class="del" type="button" data-del="schedule.days.${e}.classes" data-i="${r}">Удалить занятие</button>
              </details>`}).join("")}
            <button class="add" type="button" data-add-class="${e}">+ Добавить занятие</button>
          </section>`).join("")}`}function $(s,t,e){const a=d.hallPrices[t];return`<section class="card blk">
        <h2>${s}</h2>
        ${a.map((r,l)=>`<div class="cls">
          ${n("Что",`hallPrices.${t}.${l}.what`,{wide:!0})}
          <div class="cls-row">
            ${n("Цена",`hallPrices.${t}.${l}.price`,{ph:"500 ₽"})}
            ${e?n("Срок / примечание",`hallPrices.${t}.${l}.note`,{ph:"действует 4 недели"}):""}
          </div>
          <button class="del" type="button" data-del="hallPrices.${t}" data-i="${l}">Удалить строку</button>
        </div>`).join("")}
        <button class="add" type="button" data-add-row="${t}">+ Добавить строку</button>
      </section>`}function L(){const s=d.hallPrices.discounts;return $("Разовые занятия","single",!1)+$("Абонементы","passes",!0)+$("Индивидуальные","personal",!0)+`
        <section class="card blk">
          <h2>Скидка 20%</h2>
          <p class="soft">Каждая строка продолжает фразу «Скидка 20%: …».</p>
          ${s.map((t,e)=>`<div class="cls">${n(`Кому ${e+1}`,`hallPrices.discounts.${e}`,{wide:!0})}<button class="del" type="button" data-del="hallPrices.discounts" data-i="${e}">Удалить</button></div>`).join("")}
          <button class="add" type="button" data-add-disc>+ Добавить скидку</button>
        </section>`}function C(){return Object.entries(d.retreats).map(([s,t])=>{const e=`retreats.${s}`;return`<section class="card blk">
          <div class="rhead"><h2>${o(j[s]||s)}</h2>
            <label class="sw"><input type="checkbox" data-path="${e}.show" ${t.show?"checked":""}><span>Показывать на сайте</span></label></div>
          <div class="grid2">
            ${n("Даты",`${e}.dates`,{ph:"5–6 декабря"})}
            ${n("Год",`${e}.year`,{ph:"2026"})}
            ${n("Цена",`${e}.price`,{ph:"2 500 ₽ за день"})}
            ${n("Скидка / примечание к цене",`${e}.priceNote`)}
          </div>
          ${n("Про места (если пусто — не показывается)",`${e}.seats`,{wide:!0,ph:"5 декабря все места заняты, на 6 декабря запись открыта"})}
          ${t.runs?`<h3>Заезды</h3>
            ${t.runs.map((a,r)=>`<div class="cls">${n(`Заезд ${r+1}`,`${e}.runs.${r}`,{wide:!0,ph:"13–20 июня"})}<button class="del" type="button" data-del="${e}.runs" data-i="${r}">Удалить заезд</button></div>`).join("")}
            <button class="add" type="button" data-add-run="${s}">+ Добавить заезд</button>`:`<div class="grid2">
            ${n("Текст кнопки оплаты",`${e}.payLabel`)}
            ${n("Ссылка на оплату (Продамус)",`${e}.payLink`,{type:"url",hint:"Вида https://link.payform.ru/?paymentLinkId=…"})}
          </div>`}
        </section>`}).join("")}function v(){document.querySelectorAll("[data-tab]").forEach(s=>s.setAttribute("aria-selected",String(s.dataset.tab===p))),c("#body").innerHTML=p==="schedule"?x():p==="prices"?L():C(),i()}const b=()=>JSON.stringify(d)!==m;function i(s,t=""){const e=c("#status");c("#save").disabled=!b(),e.className=`status ${t}`,e.textContent=s??(b()?"Есть несохранённые изменения":"Изменений нет")}c("#body").addEventListener("input",s=>{const t=s.target,e=t.dataset.path;if(!e)return;N(e,t.type==="checkbox"?t.checked:t.type==="number"?Number(t.value):t.value),i();const a=t.closest("details.cls");if(a){const r=f(a.dataset.key);a.querySelector("summary").innerHTML=`<b class="num">${o(r.time)}</b><span>${o(r.title)||"<i>без названия</i>"}</span><em>${o(r.teacher||"—")}</em>`}});c("#body").addEventListener("click",s=>{const t=s.target.closest("button");if(t){if(t.dataset.del){if(!confirm("Удалить?"))return;f(t.dataset.del).splice(Number(t.dataset.i),1)}else if(t.dataset.addClass){const e=d.schedule.days[Number(t.dataset.addClass)].classes;e.push({time:"19:00",dur:55,title:"",teacher:"Мария"}),S=`schedule.days.${t.dataset.addClass}.classes.${e.length-1}`}else if(t.dataset.addRow){const e=t.dataset.addRow;d.hallPrices[e].push(e==="single"?{what:"",price:""}:{what:"",price:"",note:""})}else if("addDisc"in t.dataset)d.hallPrices.discounts.push("");else if(t.dataset.addRun)d.retreats[t.dataset.addRun].runs.push("");else return;v()}});document.querySelectorAll("[data-tab]").forEach(s=>s.addEventListener("click",()=>{p=s.dataset.tab,v(),scrollTo(0,0)}));addEventListener("beforeunload",s=>{b()&&s.preventDefault()});async function g(s,t){const e=await fetch(`${k}?action=${s.slice(1)}`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)}),a=await e.json().catch(()=>({}));if(!e.ok)throw Object.assign(new Error(a.error||"Не получилось связаться с сервером"),{status:e.status});return a}async function E(){c("#login").hidden=!0,c("#app").hidden=!1;try{const s=await fetch(`${k}?action=data`,{cache:"no-store"});s.ok&&(d=await s.json(),m=JSON.stringify(d))}catch{}v()}c("#loginForm").addEventListener("submit",async s=>{s.preventDefault();const t=c("#pw").value,e=c("#loginErr");e.textContent="";try{await g("/login",{password:t}),u=t;try{sessionStorage.setItem("adm",t)}catch{}E()}catch(a){e.textContent=a.message}});c("#save").addEventListener("click",async()=>{const s=c("#save");s.disabled=!0,i("Сохраняю…");try{await g("/save",{password:u,data:d}),m=JSON.stringify(d),i("Сохранено. Сайт обновится в течение пары минут.","ok")}catch(t){const e=t;if(e.status===401){try{sessionStorage.removeItem("adm")}catch{}c("#app").hidden=!0,c("#login").hidden=!1,c("#loginErr").textContent="Войдите ещё раз";return}i(e.message,"bad"),s.disabled=!1}});u&&g("/login",{password:u}).then(E).catch(s=>{if(s.status===401)try{sessionStorage.removeItem("adm")}catch{}else c("#loginErr").textContent="Нет связи с сервером. Проверьте интернет и войдите ещё раз."});
