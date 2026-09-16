'use client';

import { useState } from 'react';
import { Activity, Bot, BriefcaseBusiness, CheckCircle2, ChevronRight, CircleDot, Command, Crosshair, LayoutDashboard, Plus, ShieldCheck, Sparkles, Target, Users } from 'lucide-react';

const agents = [
  ['COMMANDER', 'Orquestra missões e decisões', 'online'],
  ['STRATEGY', 'Mercado, oferta e posicionamento', 'ready'],
  ['CREATIVE', 'Design, UX, copy e conteúdo', 'ready'],
  ['TECH', 'Web, e-commerce e integrações', 'ready'],
  ['GROWTH', 'Aquisição, funil e performance', 'ready'],
  ['AUDIT', 'Questiona, testa e protege a entrega', 'ready'],
];
const projects = [{ id:'CASE 001', name:'SolMusic Digital', type:'E-commerce · Strategy · Growth', progress:72, status:'Em andamento' }];

type CommanderResult = { title?:string; diagnosis?:string; agents?:string[]; plan?:string[]; questions?:string[]; audit?:string; directorDecision?:string; status?:string; error?:string; message?:string };

export default function Home(){
 const [mission,setMission]=useState('');
 const [lastMission,setLastMission]=useState('Preparar operação digital e proposta comercial da SolMusic');
 const [loading,setLoading]=useState(false);
 const [result,setResult]=useState<CommanderResult|null>(null);
 async function dispatchMission(){
  const value=mission.trim(); if(!value||loading)return;
  setLastMission(value); setLoading(true); setResult(null);
  try{const res=await fetch('/api/commander',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mission:value})}); const data=await res.json(); setResult(data); if(res.ok)setMission('');}
  catch{setResult({error:'NETWORK_ERROR',message:'Não foi possível contactar o Commander.'});}
  finally{setLoading(false);}
 }
 return <main className="shell">
  <aside className="sidebar"><div className="brand"><div className="mark">V</div><div><strong>VENOM CODE</strong><span>OPERATING SYSTEM</span></div></div><nav><a className="active"><LayoutDashboard size={18}/>Command Center</a><a><Users size={18}/>Clientes</a><a><BriefcaseBusiness size={18}/>Projetos</a><a><Crosshair size={18}/>Missões</a><a><Bot size={18}/>Agentes</a><a><ShieldCheck size={18}/>Aprovações <b>2</b></a></nav><div className="director"><span>DIRECTOR</span><strong>Dimas</strong><small>Human authority · Level 03</small></div></aside>
  <section className="content"><header><div><span className="eyebrow">VENOM CODE / COMMAND CENTER</span><h1>Boa tarde, Diretor.</h1><p>O sistema está operacional. Qual é a missão?</p></div><button className="outline"><Activity size={17}/> SYSTEM ONLINE</button></header>
   <section className="missionBox"><div className="missionIcon"><Command size={24}/></div><div className="missionInput"><label>NOVA MISSÃO</label><textarea value={mission} onChange={e=>setMission(e.target.value)} placeholder="Ex.: Entrou uma clínica odontológica. Precisa aumentar leads para implantes e ainda não tem site..." /></div><button onClick={dispatchMission} disabled={loading}>{loading?'COMMANDER ANALISANDO...':'DESPACHAR'} {!loading&&<ChevronRight size={18}/>}</button></section>
   {result&&<section className="panel commanderResult"><div className="panelHead"><div><span>COMMANDER / RESULTADO</span><h2>{result.title||result.error||'Análise da missão'}</h2></div><Bot size={20}/></div>{result.message&&<p>{result.message}</p>}{result.diagnosis&&<><label>DIAGNÓSTICO</label><p>{result.diagnosis}</p></>}{result.agents&&<div className="agentTags">{result.agents.map(a=><b key={a}>{a}</b>)}</div>}{result.plan&&result.plan.length>0&&<><label>PLANO OPERACIONAL</label><ol>{result.plan.map((x,i)=><li key={i}>{x}</li>)}</ol></>}{result.questions&&result.questions.length>0&&<><label>INFORMAÇÕES FALTANTES</label><ul>{result.questions.map((x,i)=><li key={i}>{x}</li>)}</ul></>}{result.audit&&<div className="auditBox"><strong>AUDIT</strong><p>{result.audit}</p></div>}{result.directorDecision&&<div className="decisionBox"><strong>DECISÃO DO DIRETOR</strong><p>{result.directorDecision}</p></div>}</section>}
   <div className="metrics"><article><span>CLIENTES ATIVOS</span><strong>01</strong><small><CircleDot size={12}/> Case 001 em produção</small></article><article><span>MISSÕES</span><strong>04</strong><small>3 concluídas · 1 ativa</small></article><article><span>APROVAÇÕES</span><strong>02</strong><small>aguardando o Diretor</small></article><article><span>AGENTES</span><strong>06</strong><small><CircleDot size={12}/> núcleo disponível</small></article></div>
   <div className="grid"><section className="panel projects"><div className="panelHead"><div><span>PROJETOS ATIVOS</span><h2>Operações</h2></div><button><Plus size={16}/> NOVO CLIENTE</button></div>{projects.map(p=><div className="project" key={p.id}><div className="projectTop"><div><span>{p.id}</span><h3>{p.name}</h3><p>{p.type}</p></div><em>{p.status}</em></div><div className="progress"><i style={{width:`${p.progress}%`}}/></div><div className="projectBottom"><small>PROGRESSO</small><strong>{p.progress}%</strong></div></div>)}</section><section className="panel agents"><div className="panelHead"><div><span>AGENT SWARM</span><h2>Núcleo operacional</h2></div><Sparkles size={20}/></div><div className="agentList">{agents.map(([name,desc,status])=><div className="agent" key={name}><div className={`agentDot ${status}`}><Bot size={16}/></div><div><strong>{name}</strong><small>{desc}</small></div><span>{loading&&name==='COMMANDER'?'ANALISANDO':'ONLINE'}</span></div>)}</div></section></div>
   <section className="panel current"><div className="currentTitle"><Target size={20}/><div><span>MISSÃO ATUAL</span><h2>{lastMission}</h2></div><b>PRIORIDADE ALTA</b></div><div className="pipeline"><div className="done"><CheckCircle2/>Briefing<span>RECEBIDO</span></div><div className={loading?'live':''}><Activity/>Strategy<span>{loading?'ANALISANDO':'READY'}</span></div><div><Bot/>Especialistas<span>SELEÇÃO DINÂMICA</span></div><div><ShieldCheck/>Audit<span>REVISÃO</span></div><div><ShieldCheck/>Diretor<span>APROVAÇÃO</span></div></div></section>
  </section>
 </main>
}