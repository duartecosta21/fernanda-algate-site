(function(){
var d=document,W=window,reduce=W.matchMedia('(prefers-reduced-motion: reduce)').matches;
var WA='5519993891841';
function $(s,r){return (r||d).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))}
function wa(t){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(t)}
// entrada
requestAnimationFrame(function(){requestAnimationFrame(function(){d.body.classList.add('loaded')})});
// links de whatsapp com mensagem
$$('[data-wa]').forEach(function(a){a.href=wa(a.getAttribute('data-wa'));a.target='_blank';a.rel='noopener'});
// header + barra fixa mobile
var hd=$('header'),fx=$('.fixwa'),hero=$('.hero,.vhero');
function onScroll(){
 var y=W.scrollY||0;
 hd.classList.toggle('on',y>30);
 if(fx&&hero){fx.classList.toggle('on',y>hero.offsetHeight*.7)}
}
onScroll();W.addEventListener('scroll',onScroll,{passive:true});
// menu mobile
var mb=$('.menu'),ul=$('nav ul');
if(mb){mb.addEventListener('click',function(){var o=ul.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
 $$('nav a').forEach(function(a){a.addEventListener('click',function(){ul.classList.remove('open');mb.setAttribute('aria-expanded','false')})})}
// reveal
var rv=$$('.rv');
if(reduce||!('IntersectionObserver' in W)){rv.forEach(function(e){e.classList.add('in')})}
else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});rv.forEach(function(e){io.observe(e)})}
// count-up
$$('[data-count]').forEach(function(el){
 var to=+el.getAttribute('data-count'),done=false;
 function run(){if(done)return;done=true;if(reduce){el.textContent=to;return}
  var t0=performance.now(),dur=1800;(function f(t){var p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);el.textContent=Math.round(to*e);if(p<1)requestAnimationFrame(f)})(t0)}
 if(!('IntersectionObserver' in W)||reduce){el.textContent=to;return}
 var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){run();o.disconnect()}},{threshold:.5});o.observe(el)});
// trilho dos passos
var steps=$('.steps');
if(steps&&!reduce){
 var tick=false;
 function rail(){tick=false;var r=steps.getBoundingClientRect(),h=W.innerHeight,p=(h*.6-r.top)/r.height;steps.style.setProperty('--p',Math.max(0,Math.min(1,p)).toFixed(3))}
 W.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(rail)}},{passive:true});rail();
}else if(steps){steps.style.setProperty('--p',1)}
// parallax suave na foto da abertura (so desktop)
var pimg=$('.arch img');
if(pimg&&!reduce&&W.matchMedia('(min-width:901px)').matches){
 var pt=false;
 W.addEventListener('scroll',function(){if(pt)return;pt=true;requestAnimationFrame(function(){pt=false;var y=Math.min(W.scrollY,700);pimg.style.transform='translate3d(0,'+(y*.06).toFixed(1)+'px,0) scale(1.06)'})},{passive:true});
}
// comparadores
$$('.cmp').forEach(function(c){
 var r=$('input',c);
 function set(v){c.style.setProperty('--x',v+'%');r.setAttribute('aria-valuetext',Math.round(v)+'% depois')}
 r.addEventListener('input',function(){set(+r.value)});
 set(+r.value);
 if(!reduce&&'IntersectionObserver' in W){
  var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){o.disconnect();var t0=performance.now(),touched=false;
   r.addEventListener('pointerdown',function(){touched=true},{once:true});
   (function f(t){if(touched)return;var p=(t-t0)/2200;if(p>=1){set(50);r.value=50;return}
    var v=50+Math.sin(p*Math.PI*2)*22*(1-p);set(v);r.value=v;requestAnimationFrame(f)})(t0)}},{threshold:.6});o.observe(c)}
});
// lightbox
var dlg=$('dialog');
if(dlg){
 var im=$('img',dlg);
 $$('.reg button').forEach(function(b){b.addEventListener('click',function(){im.src=b.getAttribute('data-full');im.alt=b.getAttribute('data-alt');dlg.showModal()})});
 $('.x',dlg).addEventListener('click',function(){dlg.close()});
 dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
 dlg.addEventListener('close',function(){im.removeAttribute('src')});
}
// formulario: monta a mensagem e abre o WhatsApp
var f=$('#form');
if(f){f.addEventListener('submit',function(e){e.preventDefault();
 var n=(f.nome.value||'').trim(),rota=(f.querySelector('input[name=rota]:checked')||{}).value||'',msg=(f.msg.value||'').trim();
 var t='Olá, Fernanda! Vim pelo site.';
 if(n)t+=' Meu nome é '+n+'.';
 if(rota)t+=' Quero saber mais sobre: '+rota+'.';
 if(msg)t+=' '+msg;
 W.open(wa(t),'_blank','noopener')})}
})();
