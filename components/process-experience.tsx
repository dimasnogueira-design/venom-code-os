const stages = [
  {number:"01",title:"Entender antes de construir.",label:"Estratégia",text:"Conversamos sobre o negócio, os usuários, o problema e o que já existe. Organizamos prioridades, riscos e o primeiro objetivo verificável.",output:"Um problema definido e um plano de ação alinhado."},
  {number:"02",title:"Transformar contexto em experiência.",label:"UX/UI",text:"Desenhamos a jornada, a hierarquia e a linguagem visual. Os fluxos são validados antes de receberem toda a complexidade técnica.",output:"Fluxos e interfaces prontos para execução."},
  {number:"03",title:"Dar forma ao produto.",label:"Desenvolvimento",text:"Construímos em entregas que você pode ver e experimentar, cuidando da experiência no celular, desempenho e acessibilidade.",output:"Uma versão funcional e testável."},
  {number:"04",title:"Conectar a operação.",label:"Integrações",text:"Ligamos formulários, bancos de dados, pagamentos, CRM, automações ou IA quando as APIs e permissões permitem.",output:"Fluxos conectados com tratamento de erros e limites claros."},
  {number:"05",title:"Colocar no ar com segurança.",label:"Deploy",text:"Preparamos ambiente, domínio, variáveis, monitoramento básico e verificações finais antes da publicação.",output:"Produto publicado e acessível no ambiente definido."},
  {number:"06",title:"Publicar é só o começo.",label:"Evolução",text:"Acompanhamos o uso, reunimos feedback e priorizamos melhorias a partir do que o produto e o negócio realmente precisam.",output:"Aprendizados e prioridades para o próximo ciclo."},
];

export function ProcessExperience() {
  return <section className="process-experience section-pad" id="processo"><div className="shell process-experience-grid"><div><p className="section-kicker">05 / DO CONTEXTO À ENTREGA</p><h2>Clareza no caminho.<br /><em>Força na execução.</em></h2><p>Você acompanha as decisões, entende as prioridades e vê o projeto ganhar forma.</p></div><div className="process-stages">{stages.map((s,i)=><details name="venom-process" key={s.number} open={i===0}><summary><span>{s.number}</span><strong>{s.label}</strong><b aria-hidden="true">+</b></summary><div className="process-stage-content"><h3>{s.title}</h3><p>{s.text}</p><span>O QUE SAI DESTA ETAPA</span><p>{s.output}</p></div></details>)}</div></div></section>;
}
