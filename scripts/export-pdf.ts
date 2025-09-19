import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

interface DiagnosticResult {
  email: string;
  score: number;
  answers: Record<number, number>;
  timestamp: string;
}

const generateReportHTML = (data: DiagnosticResult) => {
  const getScoreMessage = (score: number) => {
    if (score >= 80) return { title: "Gold Standard", message: "Your belief capital is strong. You're winning on values.", color: "#10B981" }
    if (score >= 60) return { title: "Building Momentum", message: "Good foundation. 2-3 moves will amplify your belief capital.", color: "#3B82F6" }
    if (score >= 40) return { title: "Untapped Potential", message: "Your beliefs exist but aren't clear to buyers. Time to clarify.", color: "#F59E0B" }
    return { title: "Latent Capital", message: "Huge opportunity. Your beliefs are your hidden competitive advantage.", color: "#EF4444" }
  }

  const scoreMsg = getScoreMessage(data.score);
  
  const recommendations = data.score >= 80 
    ? ["Maintain your strong belief positioning", "Share success stories publicly", "Help others in your industry"]
    : data.score >= 60
    ? ["Lead with values in all marketing", "Train team on belief communication", "Create customer belief stories"]
    : data.score >= 40
    ? ["Audit current messaging for belief clarity", "Interview customers about values alignment", "Develop belief-first positioning"]
    : ["Define your core business beliefs", "Map competitor belief positions", "Create internal belief alignment workshop"];

  return `
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
        .recommendation-item { background: white; padding: 16px; margin: 8px 0; border-radius: 8px; border-left: 4px solid ${scoreMsg.color}; }
        .gap-analysis { display: flex; flex-wrap: wrap; gap: 16px; }
        .gap-item { flex: 1; min-width: 200px; background: #f9fafb; padding: 20px; border-radius: 12px; text-align: center; }
        .footer { background: #f3f4f6; padding: 24px; text-align: center; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="score-circle">
            <div class="score-number">${data.score}</div>
          </div>
          <h1>${scoreMsg.title}</h1>
          <p style="font-size: 18px; opacity: 0.9;">${scoreMsg.message}</p>
          <p style="opacity: 0.7;">Report generated on ${new Date(data.timestamp).toLocaleDateString()}</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h2>Your Belief Capital Score Breakdown</h2>
            <div class="gap-analysis">
              <div class="gap-item">
                <h3>Brand Clarity</h3>
                <div style="font-size: 24px; color: ${scoreMsg.color};">${Math.round(data.score * 0.3)}/30</div>
                <p>How clear your beliefs are to prospects</p>
              </div>
              <div class="gap-item">
                <h3>Team Alignment</h3>
                <div style="font-size: 24px; color: ${scoreMsg.color};">${Math.round(data.score * 0.25)}/25</div>
                <p>Internal belief consistency</p>
              </div>
              <div class="gap-item">
                <h3>Market Position</h3>
                <div style="font-size: 24px; color: ${scoreMsg.color};">${Math.round(data.score * 0.25)}/25</div>
                <p>Values-first positioning</p>
              </div>
              <div class="gap-item">
                <h3>Decision Framework</h3>
                <div style="font-size: 24px; color: ${scoreMsg.color};">${Math.round(data.score * 0.2)}/20</div>
                <p>Principle-guided operations</p>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>Recommended Moves</h2>
            <div class="recommendations">
              ${recommendations.map(rec => `<div class="recommendation-item">${rec}</div>`).join('')}
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
  `;
};

export async function exportToPDF(data: DiagnosticResult, outputPath: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const htmlContent = generateReportHTML(data);
  await page.setContent(htmlContent);
  
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      bottom: '20px',
      left: '20px',
      right: '20px'
    }
  });
  
  await browser.close();
  return outputPath;
}

// CLI usage
if (require.main === module) {
  const sampleData: DiagnosticResult = {
    email: "test@example.com",
    score: 67,
    answers: { 1: 4, 2: 3, 3: 4, 4: 4, 5: 3, 6: 3 },
    timestamp: new Date().toISOString()
  };
  
  exportToPDF(sampleData, './sample-belief-report.pdf')
    .then(() => console.log('PDF exported successfully'))
    .catch(console.error);
}