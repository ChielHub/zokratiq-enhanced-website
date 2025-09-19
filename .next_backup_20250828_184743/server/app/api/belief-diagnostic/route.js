"use strict";(()=>{var e={};e.id=356,e.ids=[356],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},1017:e=>{e.exports=require("path")},8636:(e,t,i)=>{i.r(t),i.d(t,{headerHooks:()=>x,originalPathname:()=>w,patchFetch:()=>k,requestAsyncStorage:()=>h,routeModule:()=>f,serverHooks:()=>b,staticGenerationAsyncStorage:()=>v,staticGenerationBailout:()=>y});var o={};i.r(o),i.d(o,{OPTIONS:()=>g,POST:()=>m});var a=i(5419),r=i(9108),s=i(9678),n=i(8070),l=i(2644);let c=require("fs");var p=i.n(c),d=i(1017),u=i.n(d);async function m(e){try{let{email:t,answers:i,score:o}=await e.json();if(!t||!i||"number"!=typeof o)return n.Z.json({error:"Missing required fields"},{status:400});let a={email:t,score:o,answers:i,timestamp:new Date().toISOString()},r=u().join(process.cwd(),"temp");p().existsSync(r)||p().mkdirSync(r,{recursive:!0});let s=`belief-capital-report-${Date.now()}.pdf`,c=u().join(r,s);return await (0,l.F)(a,c),console.log("Diagnostic submission:",{email:t,score:o,timestamp:a.timestamp}),n.Z.json({success:!0,score:o,message:"Report generated successfully"})}catch(e){return console.error("Error processing diagnostic:",e),n.Z.json({error:"Internal server error"},{status:500})}}async function g(e){return new n.Z(null,{status:200,headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type"}})}let f=new a.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/api/belief-diagnostic/route",pathname:"/api/belief-diagnostic",filename:"route",bundlePath:"app/api/belief-diagnostic/route"},resolvedPagePath:"/var/www/html/zokratiq/app/api/belief-diagnostic/route.ts",nextConfigOutput:"export",userland:o}),{requestAsyncStorage:h,staticGenerationAsyncStorage:v,serverHooks:b,headerHooks:x,staticGenerationBailout:y}=f,w="/api/belief-diagnostic/route";function k(){return(0,s.patchFetch)({serverHooks:b,staticGenerationAsyncStorage:v})}},2644:(e,t,i)=>{i.d(t,{F:()=>r});let o=require("playwright");e=i.hmd(e);let a=e=>{var t;let i=(t=e.score)>=80?{title:"Gold Standard",message:"Your belief capital is strong. You're winning on values.",color:"#10B981"}:t>=60?{title:"Building Momentum",message:"Good foundation. 2-3 moves will amplify your belief capital.",color:"#3B82F6"}:t>=40?{title:"Untapped Potential",message:"Your beliefs exist but aren't clear to buyers. Time to clarify.",color:"#F59E0B"}:{title:"Latent Capital",message:"Huge opportunity. Your beliefs are your hidden competitive advantage.",color:"#EF4444"},o=e.score>=80?["Maintain your strong belief positioning","Share success stories publicly","Help others in your industry"]:e.score>=60?["Lead with values in all marketing","Train team on belief communication","Create customer belief stories"]:e.score>=40?["Audit current messaging for belief clarity","Interview customers about values alignment","Develop belief-first positioning"]:["Define your core business beliefs","Map competitor belief positions","Create internal belief alignment workshop"];return`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Belief Capital Diagnostic Report</title>
      <style>
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 40px; background: #f8fafc; }
        .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; }
        .score-circle { width: 120px; height: 120px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .score-number { font-size: 48px; font-weight: bold; }
        .content { padding: 40px; }
        .section { margin-bottom: 40px; }
        .section h2 { color: #1f2937; font-size: 24px; margin-bottom: 16px; }
        .section h3 { color: #374151; font-size: 18px; margin-bottom: 12px; }
        .recommendations { background: #f3f4f6; padding: 24px; border-radius: 12px; }
        .recommendation-item { background: white; padding: 16px; margin: 8px 0; border-radius: 8px; border-left: 4px solid ${i.color}; }
        .gap-analysis { display: flex; flex-wrap: wrap; gap: 16px; }
        .gap-item { flex: 1; min-width: 200px; background: #f9fafb; padding: 20px; border-radius: 12px; text-align: center; }
        .footer { background: #f3f4f6; padding: 24px; text-align: center; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="score-circle">
            <div class="score-number">${e.score}</div>
          </div>
          <h1>${i.title}</h1>
          <p style="font-size: 18px; opacity: 0.9;">${i.message}</p>
          <p style="opacity: 0.7;">Report generated on ${new Date(e.timestamp).toLocaleDateString()}</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h2>Your Belief Capital Score Breakdown</h2>
            <div class="gap-analysis">
              <div class="gap-item">
                <h3>Brand Clarity</h3>
                <div style="font-size: 24px; color: ${i.color};">${Math.round(.3*e.score)}/30</div>
                <p>How clear your beliefs are to prospects</p>
              </div>
              <div class="gap-item">
                <h3>Team Alignment</h3>
                <div style="font-size: 24px; color: ${i.color};">${Math.round(.25*e.score)}/25</div>
                <p>Internal belief consistency</p>
              </div>
              <div class="gap-item">
                <h3>Market Position</h3>
                <div style="font-size: 24px; color: ${i.color};">${Math.round(.25*e.score)}/25</div>
                <p>Values-first positioning</p>
              </div>
              <div class="gap-item">
                <h3>Decision Framework</h3>
                <div style="font-size: 24px; color: ${i.color};">${Math.round(.2*e.score)}/20</div>
                <p>Principle-guided operations</p>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>Recommended Moves</h2>
            <div class="recommendations">
              ${o.map(e=>`<div class="recommendation-item">${e}</div>`).join("")}
            </div>
          </div>

          <div class="section">
            <h2>Next Steps</h2>
            <p><strong>Week 1:</strong> Complete the Belief Capital Canvas (included in this package)</p>
            <p><strong>Week 2:</strong> Audit your current marketing for belief vs. feature emphasis</p>
            <p><strong>Week 3:</strong> Interview 3 customers about why they chose you over competitors</p>
            <p><strong>Week 4:</strong> Implement the highest-impact move from your recommendations</p>
          </div>

          <div class="section">
            <h2>Resources Included</h2>
            <ul>
              <li>Belief Capital Canvas (blank template)</li>
              <li>Belief Capital Canvas (example - EcoFlow case study)</li>
              <li>Gap analysis visualization</li>
              <li>30-day action plan</li>
            </ul>
          </div>
        </div>

        <div class="footer">
          <p><strong>Belief Capital Diagnostic</strong> by Zokratiq</p>
          <p>Ready to amplify your belief capital? <a href="https://zokratiq.com">Let's talk.</a></p>
        </div>
      </div>
    </body>
    </html>
  `};async function r(e,t){let i=await o.chromium.launch(),r=await i.newPage(),s=a(e);return await r.setContent(s),await r.pdf({path:t,format:"A4",printBackground:!0,margin:{top:"20px",bottom:"20px",left:"20px",right:"20px"}}),await i.close(),t}i.c[i.s]===e&&r({email:"test@example.com",score:67,answers:{1:4,2:3,3:4,4:4,5:3,6:3},timestamp:new Date().toISOString()},"./sample-belief-report.pdf").then(()=>console.log("PDF exported successfully")).catch(console.error)}};var t=require("../../../webpack-runtime.js");t.C(e);var i=e=>t(t.s=e),o=t.X(0,[638,206],()=>i(8636));module.exports=o})();