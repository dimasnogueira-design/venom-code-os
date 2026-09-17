const stages = [
  {number:"01",title:"Entender antes de construir.",label:"Diagnóstico",text:"Conversamos sobre o negócio, os usuários, o problema e o que já existe. Se algo não estiver claro, investigamos antes de transformar hipótese em requisito.",output:"Um problema definido e as perguntas que ainda precisam de resposta."},
  {number:"02",title:"Escolher o próximo movimento.",label:"Estratégia",text:"Organizamos a jornada, as prioridades e a primeira versão. Escopo, dependências e critérios de sucesso ficam visíveis para todos.",output:"Direção visual, escopo e plano de execução alinhados."},
  {number:"03",title:"Dar forma. Colocar à prova.",label:"Execução",text:"Design e desenvolvimento avançam em entregas que você pode ver e experimentar. Testamos os fluxos, o celular e os detalhes que fazem a experiência funcionar.",output:"Uma versão validada e preparada para publicação."},
  {number:"04",title:"Publicar é só o começo.",label:"Evolução",text:"Acompanhamos o uso, reunimos feedback e priorizamos melhorias. O próximo passo nasce do que o produto e o negócio realmente precisam.",output:"Aprendizados e prioridades para o próximo ciclo."},
];

export function ProcessExperience() {
  return <section className="process-experience section-pad" id="processo"><div className="shell process-experience-grid"><div><p className="section-kicker">05 / DO CONTEXTO À ENTREGA</p><h2>Clareza no caminho.<br /><em>Força na execução.</em></h2><p>Você acompanha as decisões, entende as prioridades e vê o projeto ganhar forma.</p></div><div className="process-stages">{stages.map((s,i)=><details name="venom-process" key={s.number} open={i===0}><summary><span>{s.number}</span><strong>{s.label}</strong><b aria-hidden="true">+</b></summary><div className="process-stage-content"><h3>{s.title}</h3><p>{s.text}</p><span>O QUE SAI DESTA ETAPA</span><p>{s.output}</p></div></details>)}</div></div></section>;
}
